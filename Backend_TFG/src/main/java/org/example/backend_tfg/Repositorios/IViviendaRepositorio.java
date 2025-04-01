package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Vivienda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IViviendaRepositorio extends JpaRepository<Vivienda, Integer> {

}
