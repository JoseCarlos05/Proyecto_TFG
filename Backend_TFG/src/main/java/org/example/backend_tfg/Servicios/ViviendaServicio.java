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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ForkJoinPool;

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

    public Set<VecinoDTO> listarResidentes(Integer idVivienda){
        Vivienda vivienda = iViviendaRepositorio.findById(idVivienda)
                .orElseThrow(() -> new RuntimeException("No existe una vivienda con este ID."));

        Set<Vecino> residentes = vivienda.getVecinos();
        Set<VecinoDTO> vecinoDTOS = new HashSet<>();


        for (Vecino vecino: residentes){
            vecinoDTOS.add(getVecinoDTO(vecino));
        }

        return vecinoDTOS;

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

    public static VecinoDTO getVecinoDTO(Vecino vecino){
        VecinoDTO dtoNuevo  = new VecinoDTO();

        dtoNuevo.setId(vecino.getId());
        dtoNuevo.setNombre(vecino.getNombre());
        dtoNuevo.setApellidos(vecino.getApellidos());
        dtoNuevo.setDni(vecino.getDni());
        dtoNuevo.setTelefono(vecino.getTelefono());
        dtoNuevo.setFechaNacimiento(vecino.getFechaNacimiento());
        dtoNuevo.setNumeroCuenta(vecino.getNumCuenta());

        return dtoNuevo;
    }
}
