package org.example.backend_tfg.Servicios;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.EditarVecinoDTO;
import org.example.backend_tfg.DTOs.InsertarCodigoDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VecinoServicio {

    private IVecinoRepositorio iVecinoRepositorio;

    private IUsuarioRepositorio iUsuarioRepositorio;

    private IViviendaRepositorio iViviendaRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    private ISolicitudRepositorio iSolicitudRepositorio;

    private final PasswordEncoder passwordEncoder;

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

        iVecinoRepositorio.save(vecino);
        iUsuarioRepositorio.save(usuario);

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

        return dtoNuevo;
    }
}
