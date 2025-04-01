package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.VotoDTO;
import org.example.backend_tfg.Servicios.VotacionServicio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vecino")
@AllArgsConstructor
public class VotacionControlador {

    private VotacionServicio votacionServicio;

    @PostMapping("/votar")
    public void votar(@RequestBody VotoDTO votoDTO){
        votacionServicio.votar(votoDTO);
    }
}
