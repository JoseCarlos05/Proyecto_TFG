package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "gasto")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Gasto {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "concepto", nullable = false)
    private String concepto;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "cantidad_pagada", nullable = false)
    private Double cantidadPagada;

    @Column(name = "fechaHora", nullable = false)
    private LocalDateTime fechaHora;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "pagados")
    private Set<Vecino> pagados = new HashSet<>(0);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comunidad")
    private Comunidad comunidad;
}
