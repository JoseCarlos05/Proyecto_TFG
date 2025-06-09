package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.DTOs.GastoDTO;
import org.example.backend_tfg.DTOs.ReservaDTO;
import org.example.backend_tfg.Servicios.ReservaServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ReservaControlador {

    private ReservaServicio reservaServicio;

    @PostMapping("/vecino/reservar/club")
    public void reservar(@RequestBody ReservaDTO dto){
        reservaServicio.reservar(dto);
    }

    @GetMapping("/vecino/listar/reserva/club/{idVecino}")
    public List<ReservaDTO> listarReserva(@PathVariable Integer idVecino){
        return reservaServicio.misReservas(idVecino);
    }

    @GetMapping("/comunidad/listar/reserva/club/{idComunidad}")
    public List<ReservaDTO> listarReservaComunidad(@PathVariable Integer idComunidad){
        return reservaServicio.reservasComunidad(idComunidad);
    }

}
