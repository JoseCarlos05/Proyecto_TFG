package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunicadoDTO;
import org.example.backend_tfg.DTOs.CrearComunicadoComunidadDTO;
import org.example.backend_tfg.Modelos.Comunicado;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Repositorios.IComunicadoRepositorio;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.springframework.stereotype.Service;

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

    public void crearComunicado(ComunicadoDTO comunicadoDTO) {
        Comunicado comunicado = new Comunicado();
        comunicado.setDescripcion(comunicadoDTO.getDescripcion());

        Vecino vecino = iVecinoRepositorio.findById(comunicadoDTO.getIdVecino())
                .orElseThrow(() -> new RuntimeException("No existe un vecino con ese ID."));

        Comunidad comunidad = iComunidadRepositorio.findById(comunicadoDTO.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con ese ID."));

        comunicado.setVecino(vecino);
        comunicado.setComunidad(comunidad);

        iComunicadoRepositorio.save(comunicado);
    }

    public void crearComunicadoComunidad(CrearComunicadoComunidadDTO comunicadoDTO) {
        Comunicado comunicado = new Comunicado();
        comunicado.setDescripcion(comunicadoDTO.getDescripcion());

        Comunidad comunidad = iComunidadRepositorio.findById(comunicadoDTO.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con ese ID."));

        comunicado.setComunidad(comunidad);

        iComunicadoRepositorio.save(comunicado);
    }

    public static ComunicadoDTO getComunicadoDTO(Comunicado c) {
        ComunicadoDTO dto = new ComunicadoDTO();
        dto.setDescripcion(c.getDescripcion());
        dto.setIdVecino(c.getVecino().getId());
        dto.setIdComunidad(c.getComunidad().getId());
        return dto;
    }
}
