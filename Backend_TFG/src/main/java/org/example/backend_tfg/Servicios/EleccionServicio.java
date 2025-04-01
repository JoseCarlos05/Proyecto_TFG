package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.DTOs.CrearEleccionDTO;
import org.example.backend_tfg.DTOs.EleccionDTO;
import org.example.backend_tfg.DTOs.EleccionDetDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Eleccion;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IEleccionRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<EleccionDTO> listarElecciones(Integer idComunidad) {
        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));

        List<EleccionDTO> listaElecciones = new ArrayList<>();

        for (Eleccion eleccion : iEleccionRepositorio.findAll()) {
            if (eleccion.getComunidad().equals(comunidad)) {
                listaElecciones.add(getEleccionDTO(eleccion));
            }
        }

        return listaElecciones;
    }

    public EleccionDetDTO getEleccion(Integer idEleccion) {
        Eleccion eleccion = iEleccionRepositorio.findById(idEleccion)
                .orElseThrow(()-> new RuntimeException("No existe una elección con este ID."));

        return getEleccionDetDTO(eleccion);
    }

    public static EleccionDTO getEleccionDTO(Eleccion e) {
        EleccionDTO dto = new EleccionDTO();
        dto.setId(e.getId());
        dto.setMotivo(e.getMotivo());
        dto.setFecha(e.getFechaHora());
        dto.setAbierta(e.isAbierta());
        return dto;
    }

    public static EleccionDetDTO getEleccionDetDTO(Eleccion e) {
        EleccionDetDTO dto = new EleccionDetDTO();
        dto.setMotivo(e.getMotivo());
        dto.setFecha(e.getFechaHora());
        dto.setAbierta(e.isAbierta());
        dto.setTotalAFavor(e.getTotalAFavor());
        dto.setTotalEnContra(e.getTotalEnContra());
        dto.setTotalAbstencion(e.getTotalAbstencion());
        return dto;
    }
}
