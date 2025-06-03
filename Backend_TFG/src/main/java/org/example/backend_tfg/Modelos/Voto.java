package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend_tfg.Enumerados.TipoVoto;

@Entity
@Table(name = "voto")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Voto {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "voto", nullable = false)
    private TipoVoto voto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion")
    private Eleccion eleccion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vecino")
    private Vecino vecino;

}
