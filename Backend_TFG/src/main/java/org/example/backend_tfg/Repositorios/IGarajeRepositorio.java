package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Garaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IGarajeRepositorio extends JpaRepository<Garaje, Integer> {
    List<Garaje> findByComunidad_Id(Integer idComunidad);
    Integer countByComunidad_Id(Integer idComunidad);

}
