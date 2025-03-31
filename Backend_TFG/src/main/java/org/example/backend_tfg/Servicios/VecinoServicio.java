package org.example.backend_tfg.Servicios;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.UsuarioDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Repositorios.IUsuarioRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VecinoServicio {

    private IVecinoRepositorio iVecinoRepositorio;

    private IUsuarioRepositorio iUsuarioRepositorio;

    private final PasswordEncoder passwordEncoder;

    public VecinoDTO buscarVecinoID(Integer id){
        Vecino vecino = iVecinoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        return getVecinoDTO(vecino);
    }

    public VecinoDTO busccarVecinoUsuarioID(Integer idUsuario) {
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

    public void actualizarVecino(RegistrarVecinoDTO dto, Integer idVecino) {
        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        Usuario usuario = vecino.getUsuario();
        if (usuario == null) {
            throw new IllegalStateException("El vecino no tiene un usuario asociado.");
        }

        if (dto.getCorreo() != null && !dto.getCorreo().isEmpty()) {
            usuario.setCorreo(dto.getCorreo());
        }
        if (dto.getContrasena() != null && !dto.getContrasena().isEmpty()) {
            usuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
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


    public void unirseComunidad() {

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
