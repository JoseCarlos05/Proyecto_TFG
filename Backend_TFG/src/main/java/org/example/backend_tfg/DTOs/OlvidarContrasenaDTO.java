package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OlvidarContrasenaDTO {
    private String correo;
    private String token;
    private String nuevaContrasena;
}
