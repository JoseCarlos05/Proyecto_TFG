package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Eleccion;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Modelos.Voto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVotacionRepositorio extends JpaRepository<Voto, Integer> {
    boolean existsByVecinoAndEleccion(Vecino vecino, Eleccion eleccion);

}
