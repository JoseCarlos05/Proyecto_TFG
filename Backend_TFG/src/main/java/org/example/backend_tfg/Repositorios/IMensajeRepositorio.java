package org.example.backend_tfg.Repositorios;

import org.example.backend_tfg.Modelos.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IMensajeRepositorio extends JpaRepository<Mensaje, Integer> {

    List<Mensaje> findByEmisor_IdAndReceptor_IdOrEmisor_IdAndReceptor_IdOrderByFechaAscHoraAsc(
            Integer idEmisor1, Integer idReceptor1, Integer idEmisor2, Integer idReceptor2);

}
