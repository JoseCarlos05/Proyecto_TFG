package org.example.backend_tfg.Servicios;

import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComunidadService {

    private IComunidadRepositorio comunidadRepositorio;

    public List<ComunidadDTO> listarComunidades() {
        List<Comunidad> listaComunidades = comunidadRepositorio.findAll();
        List<ComunidadDTO> comunidades = new ArrayList<>();
        for (Comunidad comunidad : listaComunidades) {
            comunidades.add(getComunidadDTO(comunidad));
        }
        return comunidades;
    }

    public static ComunidadDTO getComunidadDTO(Comunidad c) {
        ComunidadDTO dto = new ComunidadDTO();
        dto.setNombre(c.getNombre());
        dto.setDireccion(c.getDireccion());
        dto.setNum_cuenta(c.getNumeroCuenta());
        dto.setBanco(c.getBanco());
        dto.setCif(c.getCIF());
        return dto;
    }
}
