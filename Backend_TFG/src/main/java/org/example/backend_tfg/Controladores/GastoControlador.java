package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.DTOs.GastoDTO;
import org.example.backend_tfg.Servicios.GastoServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class GastoControlador {

    private GastoServicio gastoServicio;

    @PostMapping("/comunidad/crear/gasto")
    public void crearGasto(@RequestBody CrearGastoDTO crearGastoDTO){
        gastoServicio.crearGasto(crearGastoDTO);
    }

    @GetMapping("/vecino/listar/gastos/{idComunidad}")
    public List<GastoDTO> listarGastos(@PathVariable Integer idComunidad){
        return gastoServicio.listarGastos(idComunidad);
    }
}
