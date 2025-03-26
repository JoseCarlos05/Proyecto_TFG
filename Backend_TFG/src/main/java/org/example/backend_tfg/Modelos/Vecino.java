package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "vecino")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Vecino {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "propietario", nullable = false)
    private boolean propietario;

    @Column(name = "direccion_personal", nullable = false)
    private String direccionPersonal;

    @Column(name = "numero_cuenta", nullable = false)
    private String numCuenta;

    @Column(name = "dni", nullable = false)
    private String DNI;

    @Column(name = "numero_residentes", nullable = false)
    private String numResidentes;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Usuario usuario;
}
