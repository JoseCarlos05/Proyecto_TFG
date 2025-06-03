package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend_tfg.Enumerados.TipoNotificacion;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificacionDTO {
    private Integer id;
    private LocalDateTime fecha;
    private TipoNotificacion tipo;
    private List<Integer> idsVecinos;
    private Integer idComunidad;
}
