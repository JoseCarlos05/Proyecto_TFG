package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGastoRepositorio extends JpaRepository<Gasto, Integer> {
    List<Gasto> findByComunidad_Id(Integer idComunidad);
}
