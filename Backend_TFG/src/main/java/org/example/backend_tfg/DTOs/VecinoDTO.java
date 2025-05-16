package org.example.backend_tfg.DTOs;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VecinoDTO {
    private Integer id;
    private String nombre;
    private String apellidos;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String numeroCuenta;
    private String dni;
    private String fotoPerfil;
}
