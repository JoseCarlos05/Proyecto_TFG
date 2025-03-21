package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmpleadoRepositorio extends JpaRepository<Empleado, Integer> {

}
