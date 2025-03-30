package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class TokenDataDTO {
    private String correo;
    private String rol;
    private Long fecha_creacion;
    private Long fecha_expiracion;
}
