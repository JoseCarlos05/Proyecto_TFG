package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.AnadirViviendaGarajeDTO;
import org.example.backend_tfg.DTOs.EleccionDTO;
import org.example.backend_tfg.DTOs.GarajeDTO;
import org.example.backend_tfg.Servicios.GarajeServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class GarajeControlador {

    private GarajeServicio garajeServicio;

    @GetMapping("/comunidad/listar/garaje/{idComunidad}")
    public List<GarajeDTO> listarGaraje(@PathVariable Integer idComunidad){
        return garajeServicio.listarGarajes(idComunidad);
    }

    @GetMapping("/vecino/listar/garaje/{idComunidad}")
    public List<GarajeDTO> listarGarajeVecino(@PathVariable Integer idComunidad){
        return garajeServicio.listarGarajes(idComunidad);
    }

    @PutMapping("/vecino/anadir/vivienda/garaje")
    public void anadirVvienda(@RequestBody AnadirViviendaGarajeDTO dto){
        garajeServicio.anadirVviendaAGaraje(dto);
    }

}
