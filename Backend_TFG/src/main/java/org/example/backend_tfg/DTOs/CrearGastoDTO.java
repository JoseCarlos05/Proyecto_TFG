package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearGastoDTO {
    private String concepto;
    private Double total;
    private Integer idComunidad;
}
