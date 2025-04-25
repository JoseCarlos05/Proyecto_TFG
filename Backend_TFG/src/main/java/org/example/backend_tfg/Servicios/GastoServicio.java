package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.DTOs.EleccionDTO;
import org.example.backend_tfg.DTOs.GastoDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Eleccion;
import org.example.backend_tfg.Modelos.Gasto;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IGastoRepositorio;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class GastoServicio {

    private IGastoRepositorio iGastoRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void crearGasto(CrearGastoDTO crearGastoDTO){

        Gasto nuevoGasto = new Gasto();

        nuevoGasto.setConcepto(crearGastoDTO.getConcepto());
        nuevoGasto.setTotal(crearGastoDTO.getTotal());
        nuevoGasto.setCantidadPagada(0.0);
        nuevoGasto.setPagados(new HashSet<>(0));
        nuevoGasto.setFechaHora(LocalDateTime.now());

        Comunidad comunidad = iComunidadRepositorio.findById(crearGastoDTO.getIdComunidad())
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));
        nuevoGasto.setComunidad(comunidad);

        iGastoRepositorio.save(nuevoGasto);
    }

    public List<GastoDTO> listarGastos(Integer idComunidad) {
        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));

        List<GastoDTO> listaGastos = new ArrayList<>();

        for (Gasto gasto : iGastoRepositorio.findAll()) {
            if (gasto.getComunidad().equals(comunidad)) {
                listaGastos.add(getGastoDTO(gasto));
            }
        }

        return listaGastos;
    }

    public static GastoDTO getGastoDTO(Gasto g) {
        GastoDTO dto = new GastoDTO();
        dto.setId(g.getId());
        dto.setConcepto(g.getConcepto());
        dto.setTotal(g.getTotal());
        dto.setCantidadPagada(g.getCantidadPagada());

        Set<Integer> vecinosID = new HashSet<>();
        for (Vecino vecino : g.getPagados()) {
            vecinosID.add(vecino.getId());
        }
        dto.setPagados(vecinosID);

        dto.setIdComunidad(g.getComunidad().getId());

        return dto;
    }


}
