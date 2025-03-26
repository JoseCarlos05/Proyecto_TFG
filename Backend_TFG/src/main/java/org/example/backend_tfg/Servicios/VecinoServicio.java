package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VecinoServicio {

    private IVecinoRepositorio iVecinoRepositorio;

}
