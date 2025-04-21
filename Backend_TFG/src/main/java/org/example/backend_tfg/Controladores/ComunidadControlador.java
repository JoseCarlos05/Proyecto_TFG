package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.Modelos.Solicitud;
import org.example.backend_tfg.Servicios.ComunidadServicio;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/vecino/listar/comunidades/{idVecino}")
    public List<ComunidadDTO> listarComunidades(@PathVariable Integer idVecino){
        return comunidadService.listarComunidades(idVecino);
    }

    @PostMapping("/comunidad/generar/codigo/{idVivienda}/{idComunidad}")
    public void generarCodigo(@PathVariable Integer idVivienda, @PathVariable Integer idComunidad){
        comunidadService.generarCodigo(idVivienda, idComunidad);
    }

    @PostMapping("/comunidad/aceptar/solicitud")
    public void aceptarSolicitud(@RequestBody Solicitud solicitud){
        comunidadService.aceptarSolicitudEntrada(solicitud);
    }

}
