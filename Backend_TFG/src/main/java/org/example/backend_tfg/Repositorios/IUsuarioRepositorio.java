package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findUsuarioByCorreo(String correo);
    Optional<Usuario> findTopByCorreo(String correo);
}
