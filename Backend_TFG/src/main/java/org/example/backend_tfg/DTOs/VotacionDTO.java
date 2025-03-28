package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend_tfg.Enumerados.Voto;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VotacionDTO {
    private Voto voto;
    private Integer idEleccion;
}
