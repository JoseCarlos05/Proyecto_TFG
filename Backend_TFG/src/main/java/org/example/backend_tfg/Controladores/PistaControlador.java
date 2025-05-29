package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Enumerados.TipoPropiedad;
import org.example.backend_tfg.Servicios.PistaServicio;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class PistaControlador {

    private PistaServicio pistaServicio;

    @PostMapping("/comunidad/crear/pista")
    public void crearPista(@RequestBody CrearPistaDTO crearPistaDTO){
        pistaServicio.crearPista(crearPistaDTO);
    }

    @GetMapping("/comunidad/listar/pistas/{idComunidad}")
    public List<PistaDTO> listarPistas(@PathVariable Integer idComunidad){
        return pistaServicio.listarPistas(idComunidad);
    }

    @GetMapping("/comunidad/pista/reservado")
    public List<HorarioCompletoDTO> obtenerHorariosPorDia(@RequestParam Integer idPista,
                                                          @RequestParam LocalDate fecha) {
        return pistaServicio.obtenerHorariosPorDia(idPista, fecha);
    }

    @GetMapping("/comunidad/ver/pista/{idPista}")
    public PistaDTO verPistaId(@PathVariable Integer idPista){
        return pistaServicio.verPistaId(idPista);
    }

    @GetMapping("/vecino/listar/pistas/{idComunidad}")
    public List<PistaDTO> listarPistasVecino(@PathVariable Integer idComunidad){
        return pistaServicio.listarPistas(idComunidad);
    }

    @GetMapping("/vecino/pista/reservado")
    public List<HorarioCompletoDTO> obtenerHorariosPorDiaVecino(@RequestParam Integer idPista,
                                                          @RequestParam LocalDate fecha) {
        return pistaServicio.obtenerHorariosPorDia(idPista, fecha);
    }

    @GetMapping("/vecino/ver/pista/{idPista}")
    public PistaDTO verPistaIdVecino(@PathVariable Integer idPista){
        return pistaServicio.verPistaId(idPista);
    }

    @PostMapping("/vecino/reserva/pista/{idHorario}/{idVecino}")
    public void reservarPista(@PathVariable Integer idHorario, @PathVariable Integer idVecino){
        pistaServicio.reservarPista(idHorario, idVecino);
    }
}
