package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IGastoRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.example.backend_tfg.Repositorios.IViviendaRepositorio;
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

    private IVecinoRepositorio iVecinoRepositorio;

    private ViviendaServicio viviendaServicio;

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

    public void marcarPagado(MarcarPagadoDTO dto){
        Gasto gasto = iGastoRepositorio.findById(dto.getIdGasto())
                .orElseThrow(() -> new RuntimeException("No existe un gasto con este ID."));

        Vecino vecino = iVecinoRepositorio.findById(dto.getIdVecino())
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        if (gasto.getPagados() == null) {
            gasto.setPagados(new HashSet<>());
        }

        Integer numeroPropietarios = viviendaServicio.numeroPropietarios(gasto.getComunidad().getId());
        double totalPorVecino;

        if (numeroPropietarios > 0){
            totalPorVecino = gasto.getTotal()/numeroPropietarios;

            gasto.getPagados().add(vecino);
            vecino.getGastos().add(gasto);
            gasto.setCantidadPagada(gasto.getCantidadPagada() + totalPorVecino);

            iGastoRepositorio.save(gasto);
            iVecinoRepositorio.save(vecino);
        }
    }

    public List<VecinoDTO> listarDeudores(Integer idGasto) {
        Gasto gasto = iGastoRepositorio.findById(idGasto)
                .orElseThrow(() -> new RuntimeException("No existe un gasto con este ID."));

        Comunidad comunidad = gasto.getComunidad();
        List<Vivienda> viviendas = iViviendaRepositorio.findByComunidad_Id(comunidad.getId());

        Set<Vecino> propietarios = new HashSet<>();
        for (Vivienda vivienda : viviendas) {
            if (vivienda.getPropietario() != null) {
                propietarios.add(vivienda.getPropietario());
            }
        }

        Set<Vecino> pagadores = gasto.getPagados();
        propietarios.removeAll(pagadores);

        List<VecinoDTO> deudoresDTO = new ArrayList<>();
        for (Vecino vecino : propietarios) {
            deudoresDTO.add(getVecinoDTO(vecino));
        }

        return deudoresDTO;
    }

    public List<VecinoDeudaDTO> listarDeudoresIdComunidad(Integer idComunidad) {
        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con este ID."));

        List<Vivienda> viviendas = iViviendaRepositorio.findByComunidad_Id(idComunidad);
        List<Vecino> propietarios = new ArrayList<>();
        for (Vivienda vivienda : viviendas) {
            Vecino propietario = vivienda.getPropietario();
            if (propietario != null && !propietarios.contains(propietario)) {
                propietarios.add(propietario);
            }
        }

        List<Gasto> gastos = iGastoRepositorio.findByComunidad_Id(idComunidad);

        List<VecinoDeudaDTO> resultado = new ArrayList<>();

        for (Vecino propietario : propietarios) {
            List<GastoDTO> gastosPendientes = new ArrayList<>();

            for (Gasto gasto : gastos) {
                Set<Vecino> pagadores = gasto.getPagados() != null ? gasto.getPagados() : new HashSet<>();

                if (!pagadores.contains(propietario)) {
                    gastosPendientes.add(getGastoDTO(gasto));
                }
            }

            if (!gastosPendientes.isEmpty()) {
                VecinoDeudaDTO dto = new VecinoDeudaDTO();
                dto.setVecino(getVecinoDTO(propietario));
                dto.setGastos(gastosPendientes);
                resultado.add(dto);
            }
        }

        return resultado;
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

    public static VecinoDTO getVecinoDTO(Vecino vecino){
        VecinoDTO dtoNuevo  = new VecinoDTO();

        dtoNuevo.setId(vecino.getId());
        dtoNuevo.setNombre(vecino.getNombre());
        dtoNuevo.setApellidos(vecino.getApellidos());
        dtoNuevo.setDni(vecino.getDni());
        dtoNuevo.setTelefono(vecino.getTelefono());
        dtoNuevo.setFechaNacimiento(vecino.getFechaNacimiento());
        dtoNuevo.setNumeroCuenta(vecino.getNumCuenta());
        if (vecino.getFotoPerfil() != null){
            dtoNuevo.setFotoPerfil(vecino.getFotoPerfil());
        }
        return dtoNuevo;
    }
}
