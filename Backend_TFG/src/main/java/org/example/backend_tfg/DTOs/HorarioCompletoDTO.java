package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HorarioCompletoDTO {
    private Integer id;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private LocalDate dia;
    private boolean reservado;
    private Integer idPista;
    private Integer idVecino;
}
