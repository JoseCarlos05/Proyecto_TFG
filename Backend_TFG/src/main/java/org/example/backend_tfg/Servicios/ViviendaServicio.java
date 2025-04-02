package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.RegistrarViviendaDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.DTOs.ViviendaDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Modelos.Vivienda;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IViviendaRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ViviendaServicio {

    private IViviendaRepositorio iViviendaRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void crearVivienda(RegistrarViviendaDTO dto) {
        Vivienda vivienda = new Vivienda();
        vivienda.setDireccionPersonal(dto.getDireccionPersonal());

        Comunidad comunidad = iComunidadRepositorio.findById(dto.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con este ID."));
        vivienda.setComunidad(comunidad);

        iViviendaRepositorio.save(vivienda);

    }

    public List<ViviendaDTO> listarViviendas(Integer idComunidad){

        List<Vivienda> viviendas = iViviendaRepositorio.findByComunidad_Id(idComunidad);
        List<ViviendaDTO> viviendasDTO = new ArrayList<>();

        for (Vivienda v : viviendas) {
            viviendasDTO.add(getViviendaDTO(v));
        }

        return viviendasDTO;

    }

    public static ViviendaDTO getViviendaDTO(Vivienda v) {
        ViviendaDTO vivienda = new ViviendaDTO();
        vivienda.setNumResidentes(v.getNumResidentes());
        vivienda.setDireccionPersonal(v.getDireccionPersonal());

        if (v.getPropietario() != null) {
            vivienda.setIdPropietario(v.getPropietario().getId());
        }

        if (v.getComunidad() != null) {
            vivienda.setIdComunidad(v.getComunidad().getId());
        }

        List<Integer> idVecinos = new ArrayList<>();
        for (Vecino vecino : v.getVecinos()) {
            idVecinos.add(vecino.getId());
        }

        if (!idVecinos.isEmpty()) {
            vivienda.setIdVecinos(idVecinos);
        }
        return vivienda;
    }
}
