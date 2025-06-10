package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend_tfg.DTOs.AnadirElementoDTO;
import org.example.backend_tfg.DTOs.ComunicadoDTO;
import org.example.backend_tfg.DTOs.CrearComunicadoComunidadDTO;
import org.example.backend_tfg.DTOs.ElementoCartaDTO;
import org.example.backend_tfg.Modelos.Carta;
import org.example.backend_tfg.Servicios.ElementoCartaServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ElementoCartaControlador {

    private ElementoCartaServicio elementoCartaServicio;

    @PostMapping("/comunidad/anadir/elemento")
    public void anadirElemento(@RequestBody AnadirElementoDTO dto) {
        elementoCartaServicio.anadirElemento(dto);
    }

    @GetMapping("/comunidad/listar/carta/{idCarta}")
    public List<ElementoCartaDTO> listarElemetosCarta(@PathVariable Integer idCarta){
        return elementoCartaServicio.verCarta(idCarta);
    }

    @GetMapping("/comunidad/ver/carta/{idComunidad}")
    public Carta verCartaComunidad(@PathVariable Integer idComunidad){
        return elementoCartaServicio.verCartaComunidad(idComunidad);
    }

    @GetMapping("/vecino/listar/carta/{idCarta}")
    public List<ElementoCartaDTO> listarElemetosCartaVecino(@PathVariable Integer idCarta){
        return elementoCartaServicio.verCarta(idCarta);
    }

    @GetMapping("/vecino/ver/carta/{idComunidad}")
    public Carta verCartaComunidadVecino(@PathVariable Integer idComunidad){
        return elementoCartaServicio.verCartaComunidad(idComunidad);
    }

}
