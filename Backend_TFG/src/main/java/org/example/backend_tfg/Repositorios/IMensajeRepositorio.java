package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMensajeRepositorio extends JpaRepository<Mensaje, Integer> {
}
