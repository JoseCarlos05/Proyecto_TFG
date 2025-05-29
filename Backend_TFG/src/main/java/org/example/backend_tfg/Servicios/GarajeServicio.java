package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.AnadirViviendaGarajeDTO;
import org.example.backend_tfg.DTOs.GarajeDTO;
import org.example.backend_tfg.DTOs.GastoDTO;
import org.example.backend_tfg.Modelos.Garaje;
import org.example.backend_tfg.Modelos.Gasto;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Modelos.Vivienda;
import org.example.backend_tfg.Repositorios.IGarajeRepositorio;
import org.example.backend_tfg.Repositorios.IViviendaRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class GarajeServicio {

    private IGarajeRepositorio iGarajeRepositorio;

    private IViviendaRepositorio iViviendaRepositorio;
    public List<GarajeDTO> listarGarajes(Integer idComunidad){
        List<Garaje> garajes = iGarajeRepositorio.findByComunidad_Id(idComunidad);
        List<GarajeDTO> garajeDTO = new ArrayList<>();

        for (Garaje garaje: garajes){
            garajeDTO.add(getGarajeDTO(garaje));
        }

        return garajeDTO;
    }

    public void anadirVviendaAGaraje(AnadirViviendaGarajeDTO dto){
        Garaje garaje = iGarajeRepositorio.findById(dto.getIdGaraje())
                .orElseThrow(() -> new RuntimeException("No existe un garaje con este ID."));

        Vivienda vivienda = iViviendaRepositorio.findById(dto.getIdVivienda())
                .orElseThrow(() -> new RuntimeException("No existe una vivienda con este ID."));
        garaje.setVivienda(vivienda);

        iGarajeRepositorio.save(garaje);
    }

    public static GarajeDTO getGarajeDTO(Garaje g) {
        GarajeDTO dto = new GarajeDTO();
        dto.setId(g.getId());
        dto.setNumeroPlaza(g.getNumeroPlaza());

        if (g.getComunidad() != null) {
            dto.setIdComunidad(g.getComunidad().getId());
        }

        if (g.getVivienda() != null && g.getVivienda().getId() != null) {
            dto.setIdVivienda(g.getVivienda().getId());
        }

        return dto;
    }


}
