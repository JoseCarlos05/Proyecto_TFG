package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Servicios.ComunicadoServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ComunicadoControlador {

    private ComunicadoServicio comunicadoServicio;

    @GetMapping("/vecino/listar/comunicados/{idComunidad}")
    public List<ComunicadoDTO> listarComunicados(@PathVariable Integer idComunidad){
        return comunicadoServicio.listarComunicados(idComunidad);
    }

    @GetMapping("/comunidad/listar/comunicados/{idComunidad}")
    public List<ComunicadoDTO> listarComunicadosComunidad(@PathVariable Integer idComunidad){
        return comunicadoServicio.listarComunicados(idComunidad);
    }

    @PostMapping("/vecino/crear/comunicado")
    public void crearComunicado(@RequestBody CrearComunicadoDTO comunicadoDTO) {
        comunicadoServicio.crearComunicado(comunicadoDTO);
    }

    @PostMapping("/comunidad/crear/comunicado")
    public void crearComunicadoComunidad(@RequestBody CrearComunicadoComunidadDTO comunicadoDTO) {
        comunicadoServicio.crearComunicadoComunidad(comunicadoDTO);
    }
}
