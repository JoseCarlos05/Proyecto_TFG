package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ReservaDTO;
import org.example.backend_tfg.DTOs.SancionDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Reserva;
import org.example.backend_tfg.Modelos.Sancion;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IReservaRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservaServicio {

    private IReservaRepositorio iReservaRepositorio;

    private IVecinoRepositorio iVecinoRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void reservar(ReservaDTO dto){

        Reserva reserva = new Reserva();
        reserva.setNumeroPersonas(dto.getNumeroPersonas());
        reserva.setFechaHora(dto.getFechaHora());

        Vecino vecino = iVecinoRepositorio.findById(dto.getIdVecino())
                .orElseThrow(()-> new RuntimeException("No existe un vecino con este ID."));
        reserva.setVecino(vecino);

        Comunidad comunidad = iComunidadRepositorio.findById(dto.getIdComunidad())
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));
        reserva.setComunidad(comunidad);

        iReservaRepositorio.save(reserva);
    }

    public List<ReservaDTO> misReservas(Integer idVecino){
        List<Reserva> reservas = iReservaRepositorio.findByVecino_Id(idVecino);
        List<ReservaDTO> reservaDTOS = new ArrayList<>();
        for (Reserva reserva: reservas){
            reservaDTOS.add(getReservaDTO(reserva));
        }

        return reservaDTOS;
    }

    public List<ReservaDTO> reservasComunidad(Integer idComunidad){
        List<Reserva> reservas = iReservaRepositorio.findReservaByComunidad_Id(idComunidad);
        List<ReservaDTO> reservaDTOS = new ArrayList<>();
        for (Reserva reserva: reservas){
            reservaDTOS.add(getReservaDTO(reserva));
        }

        return reservaDTOS;
    }

    public static ReservaDTO getReservaDTO(Reserva r) {
        ReservaDTO dto = new ReservaDTO();
        dto.setId(r.getId());
        dto.setNumeroPersonas(r.getNumeroPersonas());
        dto.setFechaHora(r.getFechaHora());
        dto.setIdVecino(r.getVecino().getId());
        dto.setIdComunidad(r.getComunidad().getId());
        return dto;
    }

}
