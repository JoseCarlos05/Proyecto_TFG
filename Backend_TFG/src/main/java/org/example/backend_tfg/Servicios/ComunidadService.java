package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class ComunidadService {

    private IComunidadRepositorio comunidadRepositorio;

    public ComunidadDTO verComunidadID(Integer idComunidad){
        Comunidad comunidad = comunidadRepositorio.findById(idComunidad)
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));

        return getComunidadDTO(comunidad);
    }

    public ComunidadDTO verComunidadUsuarioID(Integer idUsuario){
        Comunidad comunidad = comunidadRepositorio.findByUsuario_Id(idUsuario);

        return getComunidadDTO(comunidad);
    }

    public List<ComunidadDTO> listarComunidades() {
        List<Comunidad> listaComunidades = comunidadRepositorio.findAll();
        List<ComunidadDTO> comunidades = new ArrayList<>();
        for (Comunidad comunidad : listaComunidades) {
            comunidades.add(getComunidadDTO(comunidad));
        }
        return comunidades;
    }

    public String regenerarCodigo() {
        Random random = new Random();
        StringBuilder resultado = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int number = random.nextInt(10);
            resultado.append(number);
        }

        return resultado.toString();
    }

    public static ComunidadDTO getComunidadDTO(Comunidad c) {
        ComunidadDTO dto = new ComunidadDTO();
        dto.setNombre(c.getNombre());
        dto.setDireccion(c.getDireccion());
        dto.setNum_cuenta(c.getNumeroCuenta());
        dto.setBanco(c.getBanco());
        dto.setCif(c.getCIF());
        dto.setCodigo_comunidad(c.getCodigoComunidad());

        if (c.getPresidente() != null) {
            dto.setId_presidente(c.getPresidente().getId());
        }
        return dto;
    }
}
