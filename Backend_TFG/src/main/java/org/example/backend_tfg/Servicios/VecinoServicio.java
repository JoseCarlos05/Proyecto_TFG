package org.example.backend_tfg.Servicios;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.EditarVecinoDTO;
import org.example.backend_tfg.DTOs.InsertarCodigoDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
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

    @Value("${upload.dir}")
    private String uploadDir;

    public VecinoServicio(IVecinoRepositorio iVecinoRepositorio, IUsuarioRepositorio iUsuarioRepositorio,
                          IViviendaRepositorio iViviendaRepositorio, IComunidadRepositorio iComunidadRepositorio,
                          ISolicitudRepositorio iSolicitudRepositorio) {
        this.iVecinoRepositorio = iVecinoRepositorio;
        this.iUsuarioRepositorio = iUsuarioRepositorio;
        this.iViviendaRepositorio = iViviendaRepositorio;
        this.iComunidadRepositorio = iComunidadRepositorio;
        this.iSolicitudRepositorio = iSolicitudRepositorio;
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
            if (comunidad.getCodigoComunidad().equals(insertarCodigoDTO.getCodigoComunidad())) {
                String dirViviendaHex = insertarCodigoDTO.getCodigoComunidad().substring(6);
                StringBuilder dirViviendaSB = new StringBuilder();
                for (int i = 0; i < dirViviendaHex.length(); i += 2) {
                    String strByte = dirViviendaHex.substring(i, i + 2);
                    int decimal = Integer.parseInt(strByte, 16);
                    dirViviendaSB.append((char) decimal);
                }
                String dirVivienda = dirViviendaSB.toString();
                for (Vivienda vivienda : iViviendaRepositorio.findAll()) {
                    if (vivienda.getDireccionPersonal().equals(dirVivienda)) {
                        vivienda.getVecinos().add(vecino);
                        iViviendaRepositorio.save(vivienda);
                        vecino.getViviendas().add(vivienda);
                        iVecinoRepositorio.save(vecino);
                        break;
                    }
                }
                comunidad.setCodigoComunidad(null);
                iComunidadRepositorio.save(comunidad);
                break;
            } else {
                throw new RuntimeException("Código incorrecto.");
            }

        }

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
}
