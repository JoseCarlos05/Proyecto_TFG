package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearEleccionDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Eleccion;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IEleccionRepositorio;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EleccionServicio {

    private IEleccionRepositorio iEleccionRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void crearEleccion(CrearEleccionDTO crearEleccionDTO){

        Eleccion nuevaEleccion = new Eleccion();
        nuevaEleccion.setMotivo(crearEleccionDTO.getMotivo());
        nuevaEleccion.setFechaHora(crearEleccionDTO.getFechaHora());
        nuevaEleccion.setTotalAFavor(0);
        nuevaEleccion.setTotalAbstencion(0);
        nuevaEleccion.setTotalEnContra(0);

        Comunidad comunidad = iComunidadRepositorio.findById(crearEleccionDTO.getIdComunidad())
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));
        nuevaEleccion.setComunidad(comunidad);

        iEleccionRepositorio.save(nuevaEleccion);

    }
}
