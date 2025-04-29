package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComunicadoDTO {
    private String descripcion;
    private LocalDateTime fecha;
    private Integer idComunidad;
    private Integer idVecino;
}
