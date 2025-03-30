package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrarComunidadDTO {
    private String nombre;
    private String direccion;
    private String num_cuenta;
    private String banco;
    private String cif;
    private Integer id_presidente;

    private String correo;
    private String contrasena;
}
