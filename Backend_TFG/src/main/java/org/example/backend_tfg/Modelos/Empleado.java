package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "empleado")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Empleado {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "dni", nullable = false)
    private String dni;

    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Column(name = "horasTotales", nullable = false)
    private Integer horasTotales;

    @Column(name = "horaEntrada", nullable = false)
    private LocalTime horaEntrada;

    @Column(name = "horaSalida", nullable = false)
    private LocalTime horaSalida;

    @Column(name = "oficio", nullable = false)
    private String oficio;

    @Column(name = "sueldo", nullable = false)
    private Double sueldo;

    @Column(name = "correoElectronico", nullable = false)
    private String correoElectronico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comunidad")
    private Comunidad comunidad;
}
