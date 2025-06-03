package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Servicios.UsuarioServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/autorizacion")
@AllArgsConstructor
public class AutorizacionControlador {

    private UsuarioServicio usuarioServicio;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<RespuestaDTO> login(@RequestBody LoginDTO dto){
        return usuarioServicio.login(dto);
    }

    @PostMapping("/registro/vecino")
    public Usuario registroVecino(@RequestBody RegistrarVecinoDTO registroDTO){
        return usuarioServicio.registrarVecino(registroDTO);
    }

    @PostMapping("/registro/comunidad")
    public Usuario registroComunidad(@RequestBody RegistrarComunidadDTO registroDTO){
        return usuarioServicio.registrarComunidad(registroDTO);
    }

    @PostMapping("/solicitar-cambio-contrasena")
    public ResponseEntity<Void> solicitarCambioContrasena(@RequestParam String correo) {
        try {
            usuarioServicio.solicitarCambioContrasena(correo);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/cambiar-contrasena")
    public ResponseEntity<Void> cambiarContrasena(@RequestBody OlvidarContrasenaDTO cambiarContrasenaDTO) {
        if (cambiarContrasenaDTO.getToken() == null ||
                cambiarContrasenaDTO.getCorreo() == null ||
                cambiarContrasenaDTO.getNuevaContrasena() == null) {
            return ResponseEntity.badRequest().build();
        }

        usuarioServicio.cambiarContrasena(
                cambiarContrasenaDTO.getCorreo(),
                cambiarContrasenaDTO.getToken().trim(),
                cambiarContrasenaDTO.getNuevaContrasena()
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/verificar-codigo")
    public ResponseEntity<Boolean> verificarCodigo(@RequestBody OlvidarContrasenaDTO dto) {
        if (dto.getCorreo() == null || dto.getToken() == null) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean esValido = usuarioServicio.verificarCodigo(dto.getCorreo(), dto.getToken().trim());
        return ResponseEntity.ok(esValido);
    }
}