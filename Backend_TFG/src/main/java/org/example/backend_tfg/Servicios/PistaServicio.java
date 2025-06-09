package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IHorarioRepositorio;
import org.example.backend_tfg.Repositorios.IPistaRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class PistaServicio {

    private IPistaRepositorio iPistaRepositorio;

    private IVecinoRepositorio iVecinoRepositorio;

    private IHorarioRepositorio iHorarioRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public PistaDTO verPistaId(Integer idPista){
        Pista pista = iPistaRepositorio.findById(idPista)
                .orElseThrow(() -> new RuntimeException("No existe una pista con ese id"));

        return getPistaDTO(pista);
    }
    public void crearPista(CrearPistaDTO dto) {
        Comunidad comunidad = iComunidadRepositorio.findById(dto.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con ese id"));

        Pista pista = new Pista();
        pista.setDeporte(dto.getDeporte());
        pista.setComunidad(comunidad);

        Set<Horario> horarios = new HashSet<>();

        List<LocalDate> diasSeleccionados = dto.getDiasSeleccionados();
        if (diasSeleccionados == null || diasSeleccionados.isEmpty()) {
            throw new RuntimeException("Debes proporcionar al menos una fecha");
        }

        for (LocalDate dia : diasSeleccionados) {
            for (HorarioDTO hDto : dto.getHorarios()) {
                Horario horario = new Horario();
                horario.setHoraInicio(hDto.getHoraInicio());
                horario.setHoraFin(hDto.getHoraFin());
                horario.setDia(dia);
                horario.setReservado(false);
                horario.setNotificado(false);
                horario.setPista(pista);
                horarios.add(horario);
            }
        }

        pista.setHorarios(horarios);
        iPistaRepositorio.save(pista);
    }


    public List<PistaDTO> listarPistas(Integer idComunidad){
        List<Pista> pistas = iPistaRepositorio.findByComunidad_Id(idComunidad);
        List<PistaDTO> pistaDTOS = new ArrayList<>();

        for (Pista pista: pistas){
            pistaDTOS.add(getPistaDTO(pista));
        }

        return pistaDTOS;
    }

    public List<PistaHorarioDTO> listarPistasIdVecino(Integer idVecino, Integer idComunidad) {
        List<Horario> horarios = iHorarioRepositorio.findByVecino_Id(idVecino);
        List<Pista> pistas = new ArrayList<>();
        List<PistaHorarioDTO> pistaDTOS = new ArrayList<>();

        for (Horario horario : horarios) {
            Pista pista = horario.getPista();
            if (!pistas.contains(pista)) {
                pistas.add(pista);
            }
        }
        for (Pista pista : pistas) {
            if (pista.getComunidad().getId().equals(idComunidad)) {
                List<HorarioCompletoDTO> horarioDTOS = new ArrayList<>();

                PistaHorarioDTO pistaDTO = getPistaHorarioDTO(pista);

                for (Horario horario : horarios) {
                    if (horario.getPista().equals(pista)) {
                        horarioDTOS.add(getHorarioDTO(horario));
                    }
                }

                pistaDTO.setHorarios(horarioDTOS);
                pistaDTOS.add(pistaDTO);
            }
        }

        return pistaDTOS;
    }

    public void reservarPista(Integer idHorario, Integer idVecino){
        Horario horario = iHorarioRepositorio.findById(idHorario)
                .orElseThrow(() -> new RuntimeException("No existe un horario con ese id"));
        horario.setReservado(true);

        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con ese id"));

        horario.setVecino(vecino);

        iHorarioRepositorio.save(horario);
    }

    public List<HorarioCompletoDTO> obtenerHorariosPorDia(Integer idPista, LocalDate fecha) {
        List<Horario> horarios = iHorarioRepositorio.findByPista_IdAndDia(idPista, fecha);
        List<HorarioCompletoDTO> horarioCompletos = new ArrayList<>();

        for (Horario horario: horarios){
            horarioCompletos.add(getHorarioDTO(horario));
        }

        return horarioCompletos;
    }

    public boolean comprobarProximasReservas(Integer idVecino, Integer idComunidad) {
        for (PistaHorarioDTO pista : listarPistasIdVecino(idVecino, idComunidad)) {
            for (HorarioCompletoDTO horario : pista.getHorarios()) {
                if (horario.getDia().isEqual(LocalDate.now()) && !horario.isNotificado()) {
                    Horario h = iHorarioRepositorio.findById(horario.getId())
                            .orElseThrow(() -> new RuntimeException("No existe un horario con este ID"));
                    h.setNotificado(true);
                    iHorarioRepositorio.save(h);
                    return true;
                }
            }
        }
        return false;
    }

    public static PistaDTO getPistaDTO(Pista p) {
        PistaDTO dto = new PistaDTO();
        dto.setId(p.getId());
        dto.setDeporte(p.getDeporte());
        dto.setIdComunidad(p.getComunidad().getId());

        return dto;
    }

    public static PistaHorarioDTO getPistaHorarioDTO(Pista p) {
        PistaHorarioDTO dto = new PistaHorarioDTO();
        dto.setId(p.getId());
        dto.setDeporte(p.getDeporte());
        dto.setIdComunidad(p.getComunidad().getId());

        return dto;
    }

    public static HorarioCompletoDTO getHorarioDTO(Horario h) {
        HorarioCompletoDTO dto = new HorarioCompletoDTO();
        dto.setId(h.getId());
        dto.setHoraInicio(h.getHoraInicio());
        dto.setHoraFin(h.getHoraFin());
        dto.setReservado(h.isReservado());
        dto.setNotificado(h.isNotificado());
        dto.setDia(h.getDia());
        if (h.getPista() != null){
            dto.setIdPista(h.getPista().getId());
        }
        if (h.getVecino() != null){
            dto.setIdVecino(h.getVecino().getId());
        }

        return dto;
    }

}
