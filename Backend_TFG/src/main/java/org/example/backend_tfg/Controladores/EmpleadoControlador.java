package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.RegistrarEmpleadoDTO;
import org.example.backend_tfg.Servicios.EleccionServicio;
import org.example.backend_tfg.Servicios.EmpleadoSevicio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comunidad")
@AllArgsConstructor
public class EmpleadoControlador {

    private EmpleadoSevicio empleadoSevicio;

    @PostMapping("/crear/empleado")
    public void crearEmpleado(@RequestBody RegistrarEmpleadoDTO dto){
        empleadoSevicio.crearEmpleado(dto);
    }

}
