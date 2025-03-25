package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comunidad")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor

public class Comunidad {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "numeroCuenta", nullable = false)
    private String numeroCuenta;

    @Column(name = "banco", nullable = false)
    private String banco;

    @Column(name = "CIF", nullable = false)
    private String CIF;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Usuario usuario;
}
