package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.DTOs.SancionDTO;
import org.example.backend_tfg.Servicios.SancionServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class SancionControlador {

    private SancionServicio sancionServicio;

    @GetMapping("/comunidad/listar/sanciones/{idComunidad}")
    public List<SancionDTO> listarSancionComunidad (@PathVariable Integer idComunidad){
        return sancionServicio.listarSanciones(idComunidad);
    }

    @GetMapping("/vecino/listar/sanciones/{idComunidad}")
    public List<SancionDTO> listarSancionVecino (@PathVariable Integer idComunidad){
        return sancionServicio.listarSanciones(idComunidad);
    }

    @GetMapping("/vecino/listar/sanciones/vecino/{idComunidad}/{idVecino}")
    public List<SancionDTO> listarSancionVecino (@PathVariable Integer idComunidad, @PathVariable Integer idVecino){
        return sancionServicio.listarSancionesVecino(idComunidad, idVecino);
    }

    @PostMapping("comunidad/crear/sancion")
    public void crearSancion(@RequestBody SancionDTO sancionDTO){
        sancionServicio.crearSancion(sancionDTO);
    }

}
