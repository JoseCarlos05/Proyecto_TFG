package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearEleccionDTO;
import org.example.backend_tfg.Servicios.EleccionServicio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comunidad")
@AllArgsConstructor
public class EleccionControlador {

    private EleccionServicio eleccionServicio;

    @PostMapping("/crear/eleccion")
    public void crearEleccion(@RequestBody CrearEleccionDTO crearEleccionDTO){
        eleccionServicio.crearEleccion(crearEleccionDTO);
   }
}
