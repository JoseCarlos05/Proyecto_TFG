package org.example.backend_tfg.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearEleccionDTO {
    private String motivo;
    private LocalDateTime fechaHora;
    private Integer idComunidad;
}
