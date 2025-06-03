package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Enumerados.TipoPropiedad;
import org.example.backend_tfg.Modelos.Propiedad;
import org.example.backend_tfg.Modelos.Vivienda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPropiedadRepositorio extends JpaRepository<Propiedad, Integer> {
    List<Propiedad> findByComunidad_Id(Integer idComunidad);

    Propiedad findByComunidad_IdAndTipo(Integer idComunidad, TipoPropiedad tipoPropiedad);
}
