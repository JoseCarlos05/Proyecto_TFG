package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ComunidadDTO {
    private String nombre;
    private String direccion;
    private String num_cuenta;
    private String banco;
    private String cif;
    private String codigo_comunidad;
    private Integer id_presidente;
}
