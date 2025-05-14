package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditarVecinoDTO {
    private String nombre;
    private String apellidos;
    private String telefono;
    private String fechaNacimiento;
    private String numeroCuenta;
    private String dni;
}
