package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IVerificationTokenRepositorio extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    VerificationToken findByUsuario_Id(Integer idUsuario);

}

