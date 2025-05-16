package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.VotoDTO;
import org.example.backend_tfg.Servicios.VotacionServicio;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vecino")
@AllArgsConstructor
public class VotacionControlador {

    private VotacionServicio votacionServicio;

    @PostMapping("/votar")
    public void votar(@RequestBody VotoDTO votoDTO){
        votacionServicio.votar(votoDTO);
    }

    @GetMapping("/verificar/voto/{idVecino}/{idEleccion}")
    public boolean votar(@PathVariable Integer idVecino,@PathVariable Integer idEleccion){
       return votacionServicio.haVotado(idVecino, idEleccion);
    }
}
