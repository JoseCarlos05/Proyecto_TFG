package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.VotacionDTO;
import org.example.backend_tfg.Enumerados.Voto;
import org.example.backend_tfg.Modelos.Eleccion;
import org.example.backend_tfg.Modelos.Votacion;
import org.example.backend_tfg.Repositorios.IEleccionRepositorio;
import org.example.backend_tfg.Repositorios.IVotacionRepositorio;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VotacionServicio {

    private IVotacionRepositorio iVotacionRepositorio;

    private IEleccionRepositorio iEleccionRepositorio;

    public void votar(VotacionDTO votacionDTO){

        Votacion votacion = new Votacion();
        votacion.setVoto(votacionDTO.getVoto());

        Eleccion eleccion = iEleccionRepositorio.findById(votacionDTO.getIdEleccion())
                .orElseThrow(()-> new RuntimeException("No existe una eleccion con este ID."));
        votacion.setEleccion(eleccion);
        votacion.setDescripcion(eleccion.getMotivo());

        iVotacionRepositorio.save(votacion);

        if (votacionDTO.getVoto() == Voto.A_FAVOR) {
            eleccion.setTotalAFavor(eleccion.getTotalAFavor() + 1);
        } else if (votacionDTO.getVoto() == Voto.EN_CONTRA) {
            eleccion.setTotalEnContra(eleccion.getTotalEnContra() + 1);
        } else if (votacionDTO.getVoto() == Voto.ABTENCION) {
            eleccion.setTotalAbstencion(eleccion.getTotalAbstencion() + 1);
        }

        iEleccionRepositorio.save(eleccion);
    }
}
