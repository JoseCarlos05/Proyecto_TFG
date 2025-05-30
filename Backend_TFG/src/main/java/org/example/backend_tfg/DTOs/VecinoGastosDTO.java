package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VecinoGastosDTO {
    private Integer id;
    private String nombre;
    private String apellidos;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String numeroCuenta;
    private String dni;
    private String fotoPerfil;
    private Set<GastoDTO> gastosPagados;
    private Set<GastoDTO> gastosPendientes;
}
