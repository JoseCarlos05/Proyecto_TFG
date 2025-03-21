package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comunicado")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Comunicado {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "descripciop", nullable = false)
    private String descripciop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comunidad")
    private Comunidad comunidad;
}
