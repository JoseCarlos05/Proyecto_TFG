package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.Servicios.GastoServicio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comunidad")
@AllArgsConstructor
public class GastoControlador {

    private GastoServicio gastoServicio;

    @PostMapping("/crear/gasto")
    public void crearGasto(@RequestBody CrearGastoDTO crearGastoDTO){
        gastoServicio.crearGasto(crearGastoDTO);
    }




}
