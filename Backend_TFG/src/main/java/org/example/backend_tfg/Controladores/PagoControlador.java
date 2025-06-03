package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.PagoDTO;
import org.example.backend_tfg.Servicios.PagoServicio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;



@RestController
@RequestMapping("/api/pago")
@AllArgsConstructor
public class PagoControlador {

    private PagoServicio pagoServicio;

    @PostMapping("/crear-sesion")
    public Map<String, String> crearSesion(@RequestBody PagoDTO dto) {
        return pagoServicio.crearSesion(dto);
    }
}
