package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComunicadoDTO {
    private String descripcion;
    private Integer idComunidad;
    private Integer idVecino;
}
