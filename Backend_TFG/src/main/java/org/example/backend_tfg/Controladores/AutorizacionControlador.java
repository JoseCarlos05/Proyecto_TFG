package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.LoginDTO;
import org.example.backend_tfg.DTOs.RegistrarComunidadDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.RespuestaDTO;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Servicios.UsuarioServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> solicitarCambioContrasena(@RequestParam String correo) {
        usuarioServicio.solicitarCambioContrasena(correo);
        return ResponseEntity.ok("Correo enviado con el token para cambiar la contraseña.");
    }

    @PutMapping("/cambiar-contrasena")
    public ResponseEntity<String> cambiarContrasena(@RequestParam String correo,
                                                    @RequestParam String token,
                                                    @RequestParam String nuevaContrasena) {
        usuarioServicio.cambiarContrasena(correo, token.trim(), nuevaContrasena);
        return ResponseEntity.ok("Contraseña actualizada correctamente.");
    }
}