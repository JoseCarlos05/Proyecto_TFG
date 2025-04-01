package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.Servicios.ComunidadServicio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ComunidadControlador {

    private ComunidadServicio comunidadService;

    @GetMapping("/vecino/ver/comunidad/{idComunidad}")
    public ComunidadDTO verComunidadID(@PathVariable Integer idComunidad){
        return comunidadService.verComunidadID(idComunidad);
    }

    @GetMapping("/vecino/ver/comunidad/usuario/{idUsuario}")
    public ComunidadDTO verComunidadUsuarioID(@PathVariable Integer idUsuario){
        return comunidadService.verComunidadUsuarioID(idUsuario);
    }

    @GetMapping("/vecino/listar/comunidades")
    public List<ComunidadDTO> listarComunidades(){
        return comunidadService.listarComunidades();
    }



}
