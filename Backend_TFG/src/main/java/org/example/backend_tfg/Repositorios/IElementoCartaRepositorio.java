package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.ElementoCarta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IElementoCartaRepositorio extends JpaRepository<ElementoCarta, Integer> {
    List<ElementoCarta> findByCarta_Id(Integer idCarta);
}
