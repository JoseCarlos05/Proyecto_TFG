package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Votacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVotacionRepositorio extends JpaRepository<Votacion, Integer> {

}
