package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "horario")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Horario {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    @Column(name = "dia")
    private LocalDate dia;

    @Column(name = "reservado", nullable = false)
    private boolean reservado;

    @Column(name = "notificado", nullable = false)
    private boolean notificado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pista", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Pista pista;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vecino")
    private Vecino vecino;
}
