package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Eleccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEleccionRepositorio extends JpaRepository<Eleccion, Integer> {

}
