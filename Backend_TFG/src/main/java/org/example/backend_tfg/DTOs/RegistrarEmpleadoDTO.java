package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrarEmpleadoDTO {
    private String nombre;
    private String apellidos;
    private String dni;
    private String telefono;
    private Integer horasTotales;
    private LocalTime horaEntrada;
    private LocalTime horaSalida;
    private String oficio;
    private Double sueldo;
    private String correoElectronico;
    private Integer idComunidad;
}
