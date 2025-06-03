package org.example.backend_tfg.Servicios;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class VecinoServicio {

    private final IVecinoRepositorio iVecinoRepositorio;

    private final IUsuarioRepositorio iUsuarioRepositorio;

    private final IViviendaRepositorio iViviendaRepositorio;

    private final IComunidadRepositorio iComunidadRepositorio;

    private final ISolicitudRepositorio iSolicitudRepositorio;

    private final INotificacionRepositorio iNotificacionRepositorio;

    private final ViviendaServicio viviendaServicio;

    @Value("${upload.dir}")
    private String uploadDir;

    public VecinoServicio(IVecinoRepositorio iVecinoRepositorio, IUsuarioRepositorio iUsuarioRepositorio,
                          IViviendaRepositorio iViviendaRepositorio, IComunidadRepositorio iComunidadRepositorio,
                          ISolicitudRepositorio iSolicitudRepositorio, INotificacionRepositorio iNotificacionRepositorio, ViviendaServicio viviendaServicio) {
        this.iVecinoRepositorio = iVecinoRepositorio;
        this.iUsuarioRepositorio = iUsuarioRepositorio;
        this.iViviendaRepositorio = iViviendaRepositorio;
        this.iComunidadRepositorio = iComunidadRepositorio;
        this.iSolicitudRepositorio = iSolicitudRepositorio;
        this.iNotificacionRepositorio = iNotificacionRepositorio;
        this.viviendaServicio = viviendaServicio;
    }

    public VecinoDTO buscarVecinoID(Integer id){
        Vecino vecino = iVecinoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        return getVecinoDTO(vecino);
    }

    public VecinoDTO buscarVecinoUsuarioID(Integer idUsuario) {
        Vecino vecino = iVecinoRepositorio.findByUsuario_Id(idUsuario);
        return getVecinoDTO(vecino);
    }

    public List<VecinoDTO> listarVecino(){
        List<Vecino> vecinos = iVecinoRepositorio.findAll();
        List<VecinoDTO> vecinoDTOS = new ArrayList<>();

        for (Vecino vecino: vecinos){
            vecinoDTOS.add(getVecinoDTO(vecino));
        }

        return vecinoDTOS;
    }

    public void actualizarVecino(EditarVecinoDTO dto, Integer idVecino) {
        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        Usuario usuario = vecino.getUsuario();
        if (usuario == null) {
            throw new IllegalStateException("El vecino no tiene un usuario asociado.");
        }

        if (dto.getNombre() != null) {
            vecino.setNombre(dto.getNombre());
        }
        if (dto.getApellidos() != null) {
            vecino.setApellidos(dto.getApellidos());
        }
        if (dto.getDni() != null) {
            vecino.setDni(dto.getDni());
        }
        if (dto.getTelefono() != null) {
            vecino.setTelefono(dto.getTelefono());
        }
        if (dto.getNumeroCuenta() != null) {
            vecino.setNumCuenta(dto.getNumeroCuenta());
        }

        if (dto.getFechaNacimiento() != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate fechaNacimiento = LocalDate.parse(dto.getFechaNacimiento(), formatter);
            vecino.setFechaNacimiento(fechaNacimiento);
        }
        if (dto.getFotoPerfil() != null){
            vecino.setFotoPerfil(dto.getFotoPerfil());
        }

        iVecinoRepositorio.save(vecino);
        iUsuarioRepositorio.save(usuario);

    }

    public String guardarFoto(MultipartFile foto) {
        if (foto.isEmpty()) {
            return null;
        }
        String extension = getFileExtension(foto.getOriginalFilename());
        String filename = UUID.randomUUID().toString() + "." + extension;
        Path path = Paths.get(uploadDir, filename);
        try {
            Files.createDirectories(path.getParent());
            Files.copy(foto.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar la imagen", e);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            return "";
        }
        int lastIndex = filename.lastIndexOf(".");
        return (lastIndex == -1) ? "" : filename.substring(lastIndex + 1);
    }


    public void solicitarIngresoComunidad(Integer idVivienda, Integer idComunidad, Integer idVecino) {

        Solicitud solicitud = new Solicitud();
        solicitud.setIdComunidad(idComunidad);
        solicitud.setIdVecino(idVecino);
        solicitud.setIdVivienda(idVivienda);
        iSolicitudRepositorio.save(solicitud);

    }

    public void insertarCodigoComunidad(InsertarCodigoDTO insertarCodigoDTO) {
        Vecino vecino = iVecinoRepositorio.findById(insertarCodigoDTO.getIdVecino())
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        for (Comunidad comunidad : iComunidadRepositorio.findAll()) {
            if (comunidad.getCodigoComunidad() != null &&
                    comunidad.getCodigoComunidad().equals(insertarCodigoDTO.getCodigoComunidad())) {

                String dirViviendaEncoded = insertarCodigoDTO.getCodigoComunidad().substring(6);
                byte[] decodedBytes = Base64.getDecoder().decode(dirViviendaEncoded);
                String dirVivienda = new String(decodedBytes, StandardCharsets.UTF_8);

                System.out.println(dirVivienda);

                for (Vivienda vivienda : iViviendaRepositorio.findAll()) {
                    if (vivienda.getDireccionPersonal().equals(dirVivienda)) {
                        System.out.println("encontrado");
                        vivienda.getVecinos().add(vecino);
                        iViviendaRepositorio.save(vivienda);
                        vecino.getViviendas().add(vivienda);
                        iVecinoRepositorio.save(vecino);
                        comunidad.setCodigoComunidad(null);
                        iComunidadRepositorio.save(comunidad);
                        break;
                    }
                }
                break;
            } else {
                throw new RuntimeException("Código incorrecto.");
            }
        }
    }

    public List<VecinoUsuarioDTO> listarVecinosIdComunidad(Integer idComunidad){
        List<Vivienda> viviendas = iViviendaRepositorio.findByComunidad_Id(idComunidad);
        List<VecinoUsuarioDTO> vecinoDTOS = new ArrayList<>();
        for (Vivienda vivienda: viviendas){
            Set<Vecino> residentes = vivienda.getVecinos();

            for (Vecino vecino: residentes){
                vecinoDTOS.add(getVecinoUsuarioDTO(vecino));
            }
        }

        return vecinoDTOS;
    }

    public List<NotificacionDTO> verNotificaciones(Integer idVecino, Integer idComunidad) {
        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        List<Notificacion> notificaciones = iNotificacionRepositorio.findByComunidad(iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID.")));

        List<NotificacionDTO> notis = new ArrayList<>(0);
        for (Notificacion n : notificaciones) {
            if (n.getVecinos().contains(vecino)) {
                notis.add(getNotificacionDTO(n));
            }
        }

        return notis;
    }

    public ComunidadDTO buscarComunidadPorCodigo(String codigo) {
        return ComunidadServicio.getComunidadDTO(iComunidadRepositorio.findByCodigoComunidad(codigo));
    }

    public void eliminarNotificacion(Integer idNotificacion, Integer idVecino) {
        Notificacion notificacion = iNotificacionRepositorio.findById(idNotificacion)
                .orElseThrow(() -> new RuntimeException("No existe una notificación con este id"));

        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        if (notificacion.getVecinos().size() == 1) {
            iNotificacionRepositorio.delete(notificacion);
        } else {
            notificacion.getVecinos().remove(vecino);
            iNotificacionRepositorio.save(notificacion);
        }
    }

    public List<VecinoUsuarioDTO> listarPropietarios(Integer idComunidad) {
        List<ViviendaDTO> viviendas = viviendaServicio.listarViviendas(idComunidad);

        List<VecinoUsuarioDTO> propietarios = new ArrayList<>();
        for (VecinoUsuarioDTO vecino : listarVecinosIdComunidad(idComunidad)) {
            for (ViviendaDTO vivienda : viviendas) {
                if (Objects.equals(vivienda.getIdPropietario(), vecino.getId())) {
                    propietarios.add(vecino);
                }
            }
        }

        return propietarios;
    }

    public VecinoUsuarioDTO getVecinoUsuarioDTO(Vecino vecino){
        VecinoUsuarioDTO dtoNuevo  = new VecinoUsuarioDTO();

        dtoNuevo.setId(vecino.getId());
        dtoNuevo.setNombre(vecino.getNombre());
        dtoNuevo.setApellidos(vecino.getApellidos());
        dtoNuevo.setDni(vecino.getDni());
        dtoNuevo.setTelefono(vecino.getTelefono());
        dtoNuevo.setFechaNacimiento(vecino.getFechaNacimiento());
        dtoNuevo.setNumeroCuenta(vecino.getNumCuenta());
        if (vecino.getFotoPerfil() != null){
            dtoNuevo.setFotoPerfil(vecino.getFotoPerfil());
        }
        dtoNuevo.setIdUsuario(vecino.getUsuario().getId());
        return dtoNuevo;
    }

    public static VecinoDTO getVecinoDTO(Vecino vecino){
        VecinoDTO dtoNuevo  = new VecinoDTO();

        dtoNuevo.setId(vecino.getId());
        dtoNuevo.setNombre(vecino.getNombre());
        dtoNuevo.setApellidos(vecino.getApellidos());
        dtoNuevo.setDni(vecino.getDni());
        dtoNuevo.setTelefono(vecino.getTelefono());
        dtoNuevo.setFechaNacimiento(vecino.getFechaNacimiento());
        dtoNuevo.setNumeroCuenta(vecino.getNumCuenta());
        if (vecino.getFotoPerfil() != null){
            dtoNuevo.setFotoPerfil(vecino.getFotoPerfil());
        }
        return dtoNuevo;
    }

    public static NotificacionDTO getNotificacionDTO(Notificacion n){
        NotificacionDTO dtoNuevo  = new NotificacionDTO();

        dtoNuevo.setId(n.getId());
        dtoNuevo.setFecha(n.getFecha());
        dtoNuevo.setTipo(n.getTipo());

        List<Integer> idsVecinos = new ArrayList<>(0);
        for (Vecino v : n.getVecinos()) {
            idsVecinos.add(v.getId());
        }
        dtoNuevo.setIdsVecinos(idsVecinos);
        dtoNuevo.setIdComunidad(n.getComunidad().getId());

        return dtoNuevo;
    }
}
