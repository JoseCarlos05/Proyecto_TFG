package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Comunidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IComunidadRepositorio extends JpaRepository<Comunidad, Integer> {
    Comunidad findByUsuario_Id(Integer idUsuario);
}
