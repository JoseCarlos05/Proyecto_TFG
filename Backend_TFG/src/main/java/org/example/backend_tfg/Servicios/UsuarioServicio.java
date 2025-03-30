package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.LoginDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.RespuestaDTO;
import org.example.backend_tfg.Enumerados.Rol;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Repositorios.IUsuarioRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.example.backend_tfg.Seguridad.JWTService;
import org.example.backend_tfg.Seguridad.UsuarioAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UsuarioServicio implements UserDetailsService {

    private IUsuarioRepositorio usuarioRepositorio;

    private final PasswordEncoder passwordEncoder;

    private JWTService jwtService;

    private IVecinoRepositorio iVecinoRepositorio;


    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findTopByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return new UsuarioAdapter(usuario);
    }

    public ResponseEntity<RespuestaDTO> login(LoginDTO dto) {

        UserDetails userDetails = loadUserByUsername(dto.getCorreo());
        if (userDetails == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        if (!userDetails.isEnabled()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(RespuestaDTO.builder()
                            .estado(HttpStatus.UNAUTHORIZED.value())
                            .mensaje("Cuenta no verificada. Por favor, verifica tu correo electrónico.")
                            .build());
        }

        if (passwordEncoder.matches(dto.getContrasena(), userDetails.getPassword())) {
            Usuario usuario = ((UsuarioAdapter) userDetails).getUsuario();
            String token = jwtService.generateToken(usuario);
            return ResponseEntity.ok(RespuestaDTO.builder()
                    .estado(HttpStatus.OK.value())
                    .token(token)
                    .build());
        } else {
            throw new BadCredentialsException("Contraseña incorrecta");
        }
    }

    public Usuario registrarVecino(RegistrarVecinoDTO dto){

        Usuario nuevoUsuario = new Usuario();
        Vecino vecino = new Vecino();

        nuevoUsuario.setCorreo(dto.getCorreo());
        nuevoUsuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        nuevoUsuario.setRol(Rol.VECINO);

        vecino.setNombre(dto.getNombre());
        vecino.setApellidos(dto.getApellidos());
        vecino.setDNI(dto.getDNI());


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaNacimiento = LocalDate.parse(dto.getFechaNacimiento(), formatter);
        vecino.setFechaNacimiento(fechaNacimiento);

        vecino.setTelefono(dto.getTelefono());

        vecino.setDireccionPersonal(dto.getDireccionPersonal());

        Usuario usuarioGuardado = usuarioRepositorio.save(nuevoUsuario);
        vecino.setUsuario(usuarioGuardado);

        iVecinoRepositorio.save(vecino);
        return usuarioGuardado;

    }
}

