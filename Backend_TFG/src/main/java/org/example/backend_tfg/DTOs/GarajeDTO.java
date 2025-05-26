package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GarajeDTO {
    private Integer id;
    private String numeroPlaza;
    private Integer idVivienda;
    private Integer idComunidad;
}
