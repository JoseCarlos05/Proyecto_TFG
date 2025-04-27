package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearGastoDTO;
import org.example.backend_tfg.DTOs.EleccionDTO;
import org.example.backend_tfg.DTOs.GastoDTO;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IGastoRepositorio;
import org.example.backend_tfg.Repositorios.IViviendaRepositorio;
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

    private IViviendaRepositorio iViviendaRepositorio;

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

    public GastoDTO verGasto(Integer idGasto){
        Gasto gasto = iGastoRepositorio.findById(idGasto)
                .orElseThrow(()-> new RuntimeException("No existe un gasto con este ID."));

        return getGastoDTO(gasto);
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

    public double calcularPorcentajePagado(Integer idGasto) {
        Gasto gasto = iGastoRepositorio.findById(idGasto)
                .orElseThrow(() -> new RuntimeException("No existe un gasto con este ID."));

        List<Vivienda> viviendas = iViviendaRepositorio.findByComunidad_Id(gasto.getComunidad().getId());

        int totalVecinos = 0;
        for (Vivienda vivienda : viviendas) {
            if (vivienda.getPropietario() != null) {
                totalVecinos++;
            }
        }

        int vecinosPagados = gasto.getPagados().size();

        if (totalVecinos == 0) {
            return 0.0;
        }

        return (vecinosPagados * 100.0) / totalVecinos;
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
