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

        LocalDate hoy = LocalDate.now();
        int diasGenerar = 0;
        if (dto.getDiasRepetir() != null) {
            diasGenerar = dto.getDiasRepetir();
        }

        if (dto.getHorarios() != null && !dto.getHorarios().isEmpty()) {
            for (int i = 0; i < diasGenerar; i++) {
                LocalDate dia = hoy.plusDays(i);

                for (HorarioDTO hDto : dto.getHorarios()) {
                    Horario horario = new Horario();
                    horario.setHoraInicio(hDto.getHoraInicio());
                    horario.setHoraFin(hDto.getHoraFin());
                    horario.setDia(dia);
                    horario.setReservado(false);
                    horario.setPista(pista);

                    horarios.add(horario);
                }
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


    public List<HorarioCompletoDTO> obtenerHorariosPorDia(Integer idPista, LocalDate fecha) {
        List<Horario> horarios = iHorarioRepositorio.findByPista_IdAndDia(idPista, fecha);
        List<HorarioCompletoDTO> horarioCompletos = new ArrayList<>();

        for (Horario horario: horarios){
            horarioCompletos.add(getHorarioDTO(horario));
        }

        return horarioCompletos;
    }

    public static PistaDTO getPistaDTO(Pista p) {
        PistaDTO dto = new PistaDTO();
        dto.setId(p.getId());
        dto.setDeporte(p.getDeporte());
        dto.setIdComunidad(p.getComunidad().getId());

        if (p.getVecino() != null){
            dto.setIdVecino(p.getComunidad().getId());
        }

        return dto;
    }

    public static HorarioCompletoDTO getHorarioDTO(Horario h) {
        HorarioCompletoDTO dto = new HorarioCompletoDTO();
        dto.setId(h.getId());
        dto.setHoraInicio(h.getHoraInicio());
        dto.setHoraFin(h.getHoraFin());
        dto.setReservado(h.isReservado());
        dto.setDia(h.getDia());
        if (h.getPista() != null){
            dto.setIdPista(h.getPista().getId());
        }

        return dto;
    }

}
