package org.example.backend_tfg.Modelos;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend_tfg.Enumerados.TipoNotificacion;

import java.time.LocalDateTime;

@Entity
@Table(name = "notificacion")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class Notificacion {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "mensaje", nullable = false)
    private String mensaje;

    @Column(name = "tipo", nullable = false)
    private TipoNotificacion tipo;


}
