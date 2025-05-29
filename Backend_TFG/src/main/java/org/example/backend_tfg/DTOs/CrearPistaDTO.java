package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearPistaDTO {
    private String deporte;
    private Integer idComunidad;
    private List<HorarioDTO> horarios;
    private List<LocalDate> diasSeleccionados;
}
