package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElementoCartaDTO {
    private Integer id;
    private String nombre;
    private String descripcion;
    private String precio;
    private Integer idCarta;
}
