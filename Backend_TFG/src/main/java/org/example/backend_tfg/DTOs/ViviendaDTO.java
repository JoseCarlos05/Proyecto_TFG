package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ViviendaDTO {
    private Integer id;
    private Integer numResidentes;
    private String direccionPersonal;
    private Integer idPropietario;
    private Integer idComunidad;
    private List<Integer> idVecinos;
}
