package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend_tfg.Enumerados.TipoPropiedad;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropiedadDTO {
    private Integer id;
    private String nombre;
    private String direccion;
    private TipoPropiedad tipoPropiedad;
    private Integer idComunidad;
    private Integer idPista;
}
