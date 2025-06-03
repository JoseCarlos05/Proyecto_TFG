package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearPropiedadDTO;
import org.example.backend_tfg.DTOs.PropiedadDTO;
import org.example.backend_tfg.Enumerados.TipoPropiedad;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Propiedad;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IPropiedadRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PropiedadServicio {

    private IPropiedadRepositorio iPropiedadRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void crearPropiedad(CrearPropiedadDTO dto){
        Propiedad propiedad = new Propiedad();
        propiedad.setNombre(dto.getNombre());
        propiedad.setTipo(dto.getTipo());

        Comunidad comunidad = iComunidadRepositorio.findById(dto.getIdComunidad())
                .orElseThrow(() -> new RuntimeException("No existe una comunidad con este ID"));

        propiedad.setComunidad(comunidad);
        iPropiedadRepositorio.save(propiedad);

    }

    public List<PropiedadDTO> listarPropiedad(Integer idComunidad){
        List<Propiedad> propiedads = iPropiedadRepositorio.findByComunidad_Id(idComunidad);
        List<PropiedadDTO> dtos = new ArrayList<>();

        for (Propiedad propiedad: propiedads){
            dtos.add(getPropiedad(propiedad));
        }
        return dtos;
    }

    public List<TipoPropiedad> listarTipoPropiedad(Integer idComunidad){
        List<Propiedad> propiedads = iPropiedadRepositorio.findByComunidad_Id(idComunidad);
        List<TipoPropiedad> tipoPropiedads = new ArrayList<>();

        if (!propiedads.isEmpty()){
            for (Propiedad propiedad: propiedads){
                tipoPropiedads.add(propiedad.getTipo());
            }
        }

        return tipoPropiedads;
    }

    public void eliminarPropiedad(Integer idComunidad, TipoPropiedad tipoPropiedad){
        Propiedad propiedad = iPropiedadRepositorio.findByComunidad_IdAndTipo(idComunidad, tipoPropiedad);
        iPropiedadRepositorio.delete(propiedad);
    }

    public static PropiedadDTO getPropiedad(Propiedad p) {
        PropiedadDTO dto = new PropiedadDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setTipoPropiedad(p.getTipo());

        if (p.getDireccion() != null) {
            dto.setDireccion(p.getDireccion());
        }

        if (p.getComunidad().getId() != null){
            dto.setIdComunidad(p.getComunidad().getId());
        }

        if (p.getPista() != null) {
            dto.setIdPista(p.getPista().getId());
        }

        return dto;
    }


}
