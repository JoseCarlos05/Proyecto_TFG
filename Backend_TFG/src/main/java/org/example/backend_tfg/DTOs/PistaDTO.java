package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PistaDTO {
    private Integer id;
    private String deporte;

    private Integer idVecino;
    private Integer idComunidad;
}
