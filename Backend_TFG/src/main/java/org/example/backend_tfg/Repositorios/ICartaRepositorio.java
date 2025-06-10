package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Carta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICartaRepositorio extends JpaRepository<Carta, Integer> {
    Carta findByComunidad_Id(Integer idComunidad);
}
