package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITokenRepositorio extends JpaRepository<Token, Integer> {
}
