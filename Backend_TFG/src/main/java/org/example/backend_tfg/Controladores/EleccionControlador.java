package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearEleccionDTO;
import org.example.backend_tfg.DTOs.EleccionDTO;
import org.example.backend_tfg.DTOs.EleccionDetDTO;
import org.example.backend_tfg.Servicios.EleccionServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class EleccionControlador {

    private EleccionServicio eleccionServicio;

    @PostMapping("/comunidad/crear/eleccion")
    public void crearEleccion(@RequestBody CrearEleccionDTO crearEleccionDTO) {
        eleccionServicio.crearEleccion(crearEleccionDTO);
    }

    @GetMapping("/vecino/listar/elecciones/{idComunidad}")
    public List<EleccionDTO> listarElecciones(@PathVariable Integer idComunidad){
        return eleccionServicio.listarElecciones(idComunidad);
    }

    @GetMapping("/vecino/ver/eleccion/{idEleccion}")
    public EleccionDetDTO verEleccionID(@PathVariable Integer idEleccion){
        return eleccionServicio.getEleccion(idEleccion);
    }

    @GetMapping("/vecino/ver/total/voto/{idEleccion}")
    public Integer totalVoto(@PathVariable Integer idEleccion){
        return eleccionServicio.votosTotales(idEleccion);
    }

    @GetMapping("/comunidad/listar/elecciones/{idComunidad}")
    public List<EleccionDTO> listarEleccionesComunidad(@PathVariable Integer idComunidad){
        return eleccionServicio.listarElecciones(idComunidad);
    }
}
