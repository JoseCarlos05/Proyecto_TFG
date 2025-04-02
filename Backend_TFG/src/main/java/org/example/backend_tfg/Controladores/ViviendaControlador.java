package org.example.backend_tfg.Controladores;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.DTOs.RegistrarViviendaDTO;
import org.example.backend_tfg.DTOs.ViviendaDTO;
import org.example.backend_tfg.Servicios.ViviendaServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ViviendaControlador {

    private ViviendaServicio viviendaServicio;

    @PostMapping("/comunidad/crear/vivienda")
    public void crearGasto(@RequestBody RegistrarViviendaDTO registrarViviendaDTO){
        viviendaServicio.crearVivienda(registrarViviendaDTO);
    }

    @GetMapping("/vecino/listar/viviendas/{idComunidad}")
    public List<ViviendaDTO> listarViviendas(@PathVariable Integer idComunidad){
        return viviendaServicio.listarViviendas(idComunidad);
    }

    @GetMapping("/comunidad/listar/viviendas/{idComunidad}")
    public List<ViviendaDTO> listarViviendasComunidad(@PathVariable Integer idComunidad){
        return viviendaServicio.listarViviendas(idComunidad);
    }

}
