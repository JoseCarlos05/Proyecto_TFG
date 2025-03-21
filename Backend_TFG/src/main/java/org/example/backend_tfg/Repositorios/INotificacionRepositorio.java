package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INotificacionRepositorio extends JpaRepository<Notificacion, Integer> {
}
