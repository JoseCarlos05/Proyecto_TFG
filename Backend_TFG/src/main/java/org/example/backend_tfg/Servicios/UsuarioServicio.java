package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.LoginDTO;
import org.example.backend_tfg.DTOs.RespuestaDTO;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Repositorios.IUsuarioRepositorio;
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

@Service
@AllArgsConstructor
public class UsuarioServicio implements UserDetailsService {

    private IUsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;
    private JWTService jwtService;

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
}

