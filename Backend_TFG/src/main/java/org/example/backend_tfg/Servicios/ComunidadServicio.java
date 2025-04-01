package org.example.backend_tfg.Servicios;

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

@Service
public class ComunidadServicio {

    private IVecinoRepositorio iVecinoRepositorio;

    private IViviendaRepositorio iViviendaRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    private ISolicitudRepositorio iSolicitudRepositorio;

    public List<ComunidadDTO> listarComunidades() {
        List<Comunidad> listaComunidades = iComunidadRepositorio.findAll();
        List<ComunidadDTO> comunidades = new ArrayList<>();
        for (Comunidad comunidad : listaComunidades) {
            comunidades.add(getComunidadDTO(comunidad));
        }
        return comunidades;
    }

    public ComunidadDTO verComunidadID(Integer idComunidad){
        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));

        return getComunidadDTO(comunidad);
    }

    public ComunidadDTO verComunidadUsuarioID(Integer idUsuario){
        Comunidad comunidad = iComunidadRepositorio.findByUsuario_Id(idUsuario);

        return getComunidadDTO(comunidad);
    }

    public String generarCodigo(Integer idVivienda) {
        Random random = new Random();
        StringBuilder resultado = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int number = random.nextInt(10);
            resultado.append(number);
        }

        Vivienda vivienda = iViviendaRepositorio.findById(idVivienda)
                .orElseThrow(() -> new RuntimeException("No existe una vivienda con este ID."));

        for (byte b : vivienda.getDireccionPersonal().getBytes()) {
            resultado.append(String.format("%02X", b));
        }

        return resultado.toString();
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
        } else if (!comunidad.getViviendas().contains(vivienda)) {
            throw new RuntimeException("La vivienda seleccionada no pertenece o no existe en la comunidad.");
        } else if (vecino.getViviendas().contains(vivienda) || vivienda.getVecinos().contains(vecino)) {
            throw new RuntimeException("El vecino ya tiene esta vivienda correspondida.");
        }

    }

    public static ComunidadDTO getComunidadDTO(Comunidad c) {
        ComunidadDTO dto = new ComunidadDTO();
        dto.setNombre(c.getNombre());
        dto.setDireccion(c.getDireccion());
        dto.setNum_cuenta(c.getNumeroCuenta());
        dto.setBanco(c.getBanco());
        dto.setCif(c.getCIF());
        dto.setCodigo_comunidad(c.getCodigoComunidad());
        dto.setId_presidente(c.getPresidente().getId());
        return dto;
    }
}
