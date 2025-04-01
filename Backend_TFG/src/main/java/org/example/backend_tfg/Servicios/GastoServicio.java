package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Gasto;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IGastoRepositorio;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class GastoServicio {

    private IGastoRepositorio iGastoRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void crearGasto(CrearGastoDTO crearGastoDTO){

        Gasto nuevoGasto = new Gasto();

        nuevoGasto.setConcepto(crearGastoDTO.getConcepto());
        nuevoGasto.setTotal(crearGastoDTO.getTotal());
        nuevoGasto.setFechaHora(LocalDateTime.now());

        Comunidad comunidad = iComunidadRepositorio.findById(crearGastoDTO.getIdComunidad())
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));
        nuevoGasto.setComunidad(comunidad);

        iGastoRepositorio.save(nuevoGasto);
    }


}
