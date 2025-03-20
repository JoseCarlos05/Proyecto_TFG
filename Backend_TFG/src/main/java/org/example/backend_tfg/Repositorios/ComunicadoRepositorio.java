package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Comunicado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComunicadoRepositorio extends JpaRepository<Comunicado, Integer> {

}


