package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface INotificacionRepositorio extends JpaRepository<Notificacion, Integer> {

    List<Notificacion> findByComunidad(Comunidad comunidad);
}
