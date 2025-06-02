package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunicadoDTO;
import org.example.backend_tfg.DTOs.CrearComunicadoComunidadDTO;
import org.example.backend_tfg.DTOs.CrearComunicadoDTO;
import org.example.backend_tfg.Modelos.Comunicado;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Repositorios.IComunicadoRepositorio;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ComunicadoServicio {

    private IComunicadoRepositorio iComunicadoRepositorio;

    private IVecinoRepositorio iVecinoRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public List<ComunicadoDTO> listarComunicados(Integer idComunidad) {
        List<ComunicadoDTO> listaComunicados = new ArrayList<>();
        for (Comunicado comunicado : iComunicadoRepositorio.findAll()) {
            if (comunicado.getComunidad().getId().equals(idComunidad)) {
                listaComunicados.add(getComunicadoDTO(comunicado));
            }
        }
        return listaComunicados;
    }

    public void crearComunicado(CrearComunicadoDTO comunicadoDTO) {
        Comunicado comunicado = new Comunicado();
        comunicado.setDescripcion(comunicadoDTO.getDescripcion());

        Vecino vecino = iVecinoRepositorio.findById(comunicadoDTO.getIdVecino())
                .orElseThrow(() -> new RuntimeException("No existe un vecino con ese ID."));

        Comunidad comunidad = iComunidadRepositorio.findById(comunicadoDTO.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con ese ID."));

        comunicado.setFechaHora(LocalDateTime.now());
        comunicado.setVecino(vecino);
        comunicado.setComunidad(comunidad);

        iComunicadoRepositorio.save(comunicado);
    }

    public void crearComunicadoComunidad(CrearComunicadoComunidadDTO comunicadoDTO) {
        Comunicado comunicado = new Comunicado();
        comunicado.setDescripcion(comunicadoDTO.getDescripcion());

        Comunidad comunidad = iComunidadRepositorio.findById(comunicadoDTO.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con ese ID."));

        comunicado.setFechaHora(LocalDateTime.now());
        comunicado.setComunidad(comunidad);

        iComunicadoRepositorio.save(comunicado);
    }

    public static ComunicadoDTO getComunicadoDTO(Comunicado c) {
        ComunicadoDTO dto = new ComunicadoDTO();
        dto.setId(c.getId());
        dto.setDescripcion(c.getDescripcion());
        dto.setFecha(c.getFechaHora());
        if (c.getVecino() != null) {
            dto.setIdVecino(c.getVecino().getId());
        }
        dto.setIdComunidad(c.getComunidad().getId());
        return dto;
    }

    public void eliminarComunicado(Integer idComunicado) {
        Comunicado comunicado = iComunicadoRepositorio.findById(idComunicado)
                .orElseThrow(() -> new RuntimeException("Comunicado no encontrado"));
        iComunicadoRepositorio.delete(comunicado);
    }
}
