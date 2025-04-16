package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.LoginDTO;
import org.example.backend_tfg.DTOs.RegistrarComunidadDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.RespuestaDTO;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Servicios.UsuarioServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/autorizacion")
@AllArgsConstructor
public class AutorizacionControlador {

    private UsuarioServicio usuarioServicio;

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

}
