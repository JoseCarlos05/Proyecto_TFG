package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Pista;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPistaRepositorio extends JpaRepository<Pista, Integer> {
    List<Pista> findByComunidad_Id(Integer idComunidad);
}
