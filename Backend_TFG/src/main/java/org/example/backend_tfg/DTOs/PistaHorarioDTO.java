package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PistaHorarioDTO {
    private Integer id;
    private String deporte;
    private Integer idComunidad;
    private List<HorarioCompletoDTO> horarios;
}
