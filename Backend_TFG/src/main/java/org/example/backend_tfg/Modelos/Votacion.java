package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend_tfg.Enumerados.Voto;

@Entity
@Table(name = "votacion")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Votacion {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "voto", nullable = false)
    private Voto voto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion")
    private Eleccion eleccion;

}
