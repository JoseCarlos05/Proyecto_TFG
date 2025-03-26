package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGastoRepositorio extends JpaRepository<Gasto, Integer> {

}
