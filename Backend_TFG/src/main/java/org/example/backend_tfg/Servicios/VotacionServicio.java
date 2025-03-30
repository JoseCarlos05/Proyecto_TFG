package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.VotoDTO;
import org.example.backend_tfg.Enumerados.TipoVoto;
import org.example.backend_tfg.Modelos.Eleccion;
import org.example.backend_tfg.Modelos.Voto;
import org.example.backend_tfg.Repositorios.IEleccionRepositorio;
import org.example.backend_tfg.Repositorios.IVotacionRepositorio;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VotacionServicio {

    private IVotacionRepositorio iVotacionRepositorio;

    private IEleccionRepositorio iEleccionRepositorio;

    public void votar(VotoDTO votoDTO){

        Voto voto = new Voto();
        voto.setVoto(votoDTO.getVoto());

        Eleccion eleccion = iEleccionRepositorio.findById(votoDTO.getIdEleccion())
                .orElseThrow(()-> new RuntimeException("No existe una eleccion con este ID."));
        voto.setEleccion(eleccion);

        iVotacionRepositorio.save(voto);

        if (votoDTO.getVoto() == TipoVoto.A_FAVOR) {
            eleccion.setTotalAFavor(eleccion.getTotalAFavor() + 1);
        } else if (votoDTO.getVoto() == TipoVoto.EN_CONTRA) {
            eleccion.setTotalEnContra(eleccion.getTotalEnContra() + 1);
        } else if (votoDTO.getVoto() == TipoVoto.ABTENCION) {
            eleccion.setTotalAbstencion(eleccion.getTotalAbstencion() + 1);
        }

        iEleccionRepositorio.save(eleccion);
    }
}
