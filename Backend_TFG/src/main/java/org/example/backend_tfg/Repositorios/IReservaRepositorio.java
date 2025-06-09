package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IReservaRepositorio extends JpaRepository<Reserva, Integer> {

    List<Reserva> findByVecino_Id(Integer idVecino);
    List<Reserva> findReservaByComunidad_Id(Integer idComunidad);

}
