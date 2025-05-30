package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Sancion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ISancionRepositorio extends JpaRepository<Sancion, Integer> {
    List<Sancion> findByComunidad_Id(Integer idComunidad);
}
