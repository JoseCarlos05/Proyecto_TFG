package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vivienda")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Vivienda {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero_residentes")
    private Integer numResidentes;

    @Column(name = "direccion_personal", nullable = false)
    private String direccionPersonal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propietario")
    private Vecino propietario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comunidad")
    private Comunidad comunidad;

}
