package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mensaje")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Mensaje {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emisor", nullable = false)
    private Vecino emisor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receptor", nullable = false)
    private Vecino receptor;

    @Column(name = "texto", nullable = false)
    private String texto;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;
}
