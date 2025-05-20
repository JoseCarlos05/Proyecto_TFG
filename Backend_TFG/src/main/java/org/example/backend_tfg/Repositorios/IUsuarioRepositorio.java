package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IUsuarioRepositorio extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findUsuarioByCorreo(String correo);
    Optional<Usuario> findTopByCorreo(String correo);
    @Query("SELECT u FROM Usuario u WHERE lower(u.correo) = lower(:correo) AND u.id <> :id")
    Optional<Usuario> findOtherByCorreoIgnoreCase(@Param("correo") String correo, @Param("id") Integer id);

    Optional<Usuario> findByCorreo(String correo);
}
