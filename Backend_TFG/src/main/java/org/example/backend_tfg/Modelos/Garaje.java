package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "garaje")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Garaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero_plaza", nullable = false)
    private String numeroPlaza;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vivienda", unique = true)
    private Vivienda vivienda;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comunidad", nullable = false)
    private Comunidad comunidad;
}
