package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Horario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface IHorarioRepositorio extends JpaRepository<Horario, Integer> {
    List<Horario> findByPista_IdAndDia(Integer idPista, LocalDate dia);

    List<Horario> findByVecino_Id(Integer idVecino);

}
