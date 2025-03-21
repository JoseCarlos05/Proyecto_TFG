package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "DNI", nullable = false)
    private String DNI;

    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Column(name = "horario", nullable = false)
    private String horario;

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
