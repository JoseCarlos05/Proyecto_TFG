package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.AnadirElementoDTO;
import org.example.backend_tfg.DTOs.ElementoCartaDTO;
import org.example.backend_tfg.DTOs.PropiedadDTO;
import org.example.backend_tfg.Modelos.Carta;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.ElementoCarta;
import org.example.backend_tfg.Modelos.Propiedad;
import org.example.backend_tfg.Repositorios.ICartaRepositorio;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IEleccionRepositorio;
import org.example.backend_tfg.Repositorios.IElementoCartaRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ElementoCartaServicio {

    private IElementoCartaRepositorio iElementoCartaRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    private ICartaRepositorio iCartaRepositorio;

    public void anadirElemento(AnadirElementoDTO dto){
        ElementoCarta elementoCarta = new ElementoCarta();
        elementoCarta.setDescripcion(dto.getDescripcion());
        elementoCarta.setNombre(dto.getNombre());
        elementoCarta.setPrecio(dto.getPrecio());

        if (dto.getIdCarta() == null){
            Carta carta = new Carta();

            Comunidad comunidad = iComunidadRepositorio.findById(dto.getIdComunidad())
                    .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));
            carta.setComunidad(comunidad);
            iCartaRepositorio.save(carta);
            elementoCarta.setCarta(carta);
        }else {
            Carta carta = iCartaRepositorio.findById(dto.getIdCarta())
                    .orElseThrow(()-> new RuntimeException("No existe una carta con este ID."));
            elementoCarta.setCarta(carta);
        }

        iElementoCartaRepositorio.save(elementoCarta);

    }

    public Carta verCartaComunidad(Integer idComunidad){
        return iCartaRepositorio.findByComunidad_Id(idComunidad);
    }

    public List<ElementoCartaDTO> verCarta(Integer idCarta){
        List<ElementoCarta> elementoCartas = iElementoCartaRepositorio.findByCarta_Id(idCarta);
        List<ElementoCartaDTO> dtos = new ArrayList<>();

        for (ElementoCarta elementoCarta: elementoCartas){
            dtos.add(getElementoCartaDTO(elementoCarta));
        }

        return dtos;
    }

    public static ElementoCartaDTO getElementoCartaDTO(ElementoCarta e) {
        ElementoCartaDTO dto = new ElementoCartaDTO();
        dto.setId(e.getId());
        dto.setNombre(e.getNombre());
        dto.setDescripcion(e.getDescripcion());
        dto.setPrecio(e.getPrecio());
        dto.setIdCarta(e.getCarta().getId());
        return dto;
    }
}
