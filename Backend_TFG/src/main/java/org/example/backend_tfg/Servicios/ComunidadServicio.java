package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Solicitud;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Modelos.Vivienda;
import org.example.backend_tfg.Repositorios.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
@AllArgsConstructor
public class ComunidadServicio {

    private IVecinoRepositorio iVecinoRepositorio;

    private IViviendaRepositorio iViviendaRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    private ISolicitudRepositorio iSolicitudRepositorio;

    public List<ComunidadDTO> listarComunidades(Integer idVecino) {
        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID"));

        List<Comunidad> listaComunidades = iComunidadRepositorio.findAll();
        List<ComunidadDTO> comunidades = new ArrayList<>();

        Set<Vivienda> viviendasVecino = vecino.getViviendas();

        for (Comunidad comunidad : listaComunidades) {
            boolean tieneViviendaEnComunidad = comunidad.getViviendas().stream()
                    .anyMatch(viviendasVecino::contains);

            boolean esPresidente = comunidad.getPresidente() != null &&
                    comunidad.getPresidente().getId().equals(idVecino);

            if (tieneViviendaEnComunidad || esPresidente) {
                comunidades.add(getComunidadDTO(comunidad));
            }
        }

        return comunidades;
    }

    public List<ComunidadDTO> listarTodasComunidades(){
        List<Comunidad> comunidadades = iComunidadRepositorio.findAll();
        List<ComunidadDTO> comunidadDTOS = new ArrayList<>();

        for (Comunidad comunidad: comunidadades){
            comunidadDTOS.add(getComunidadDTO(comunidad));
        }
        return comunidadDTOS;
    }

    public ComunidadDTO verComunidadID(Integer idComunidad) {
        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con este ID."));

        return getComunidadDTO(comunidad);
    }

    public ComunidadDTO verComunidadUsuarioID(Integer idUsuario) {
        Comunidad comunidad = iComunidadRepositorio.findByUsuario_Id(idUsuario);

        return getComunidadDTO(comunidad);
    }

    public void generarCodigo(Integer idVivienda, Integer idComunidad) {
        Random random = new Random();
        StringBuilder resultado = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int number = random.nextInt(10);
            resultado.append(number);
        }

        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con este ID."));

        Vivienda vivienda = iViviendaRepositorio.findById(idVivienda)
                .orElseThrow(() -> new RuntimeException("No existe una vivienda con este ID."));

        for (byte b : vivienda.getDireccionPersonal().getBytes()) {
            resultado.append(String.format("%02X", b));
        }

        comunidad.setCodigoComunidad(resultado.toString());

        iComunidadRepositorio.save(comunidad);
    }

    public List<Solicitud> listarSolicitudes(Integer idComunidad) {
        List<Solicitud> solicitudes = iSolicitudRepositorio.findAll();
        List<Solicitud> solicitudesComunidad = new ArrayList<>();
        for (Solicitud solicitud : solicitudes) {
            if (solicitud.getIdComunidad().equals(idComunidad)) {
                solicitudesComunidad.add(solicitud);
            }
        }
        return solicitudesComunidad;
    }

    public void aceptarSolicitudEntrada(Solicitud solicitud) {
        Vivienda vivienda = iViviendaRepositorio.findById(solicitud.getIdVivienda())
                .orElseThrow(() -> new RuntimeException("No existe una vivienda con este ID."));
        Comunidad comunidad = iComunidadRepositorio.findById(solicitud.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con este ID."));
        Vecino vecino = iVecinoRepositorio.findById(solicitud.getIdVecino())
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        if (comunidad.getViviendas().contains(vivienda)) {
            vivienda.getVecinos().add(vecino);
            iViviendaRepositorio.save(vivienda);
            vecino.getViviendas().add(vivienda);
            iVecinoRepositorio.save(vecino);
            iSolicitudRepositorio.delete(solicitud);
        } else if (!comunidad.getViviendas().contains(vivienda)) {
            throw new RuntimeException("La vivienda seleccionada no pertenece o no existe en la comunidad.");
        } else if (vecino.getViviendas().contains(vivienda) || vivienda.getVecinos().contains(vecino)) {
            throw new RuntimeException("El vecino ya tiene esta vivienda correspondida.");
        }
    }

    public void rechazarSolicitud(Solicitud solicitud) {
        iSolicitudRepositorio.delete(solicitud);
    }

    public static ComunidadDTO getComunidadDTO(Comunidad c) {
        ComunidadDTO dto = new ComunidadDTO();
        dto.setId(c.getId());
        dto.setNombre(c.getNombre());
        dto.setDireccion(c.getDireccion());
        dto.setNumCuenta(c.getNumeroCuenta());
        dto.setBanco(c.getBanco());
        dto.setCif(c.getCIF());
        dto.setCodigoComunidad(c.getCodigoComunidad());

        if (c.getPresidente() != null) {
            dto.setIdPresidente(c.getPresidente().getId());
        }
        return dto;
    }
}
