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
    private Integer id;
    private String nombre;
    private String direccion;
    private String numCuenta;
    private String banco;
    private String cif;
    private String codigoComunidad;
    private Integer idPresidente;
}
