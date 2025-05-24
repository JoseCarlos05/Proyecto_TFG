package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend_tfg.Enumerados.TipoPropiedad;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearPropiedadDTO {
    private String nombre;
    private TipoPropiedad tipo;
    private Integer idComunidad;
}
