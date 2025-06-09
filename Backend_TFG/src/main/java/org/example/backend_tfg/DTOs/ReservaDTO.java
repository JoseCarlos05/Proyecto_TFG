package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservaDTO {
    private Integer id;
    private String numeroPersonas;
    private LocalDateTime fechaHora;
    private Integer idVecino;
    private Integer idComunidad;
}
