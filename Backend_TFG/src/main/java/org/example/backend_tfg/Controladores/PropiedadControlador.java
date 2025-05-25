package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.CrearPropiedadDTO;
import org.example.backend_tfg.DTOs.PropiedadDTO;
import org.example.backend_tfg.DTOs.VecinoUsuarioDTO;
import org.example.backend_tfg.Enumerados.TipoPropiedad;
import org.example.backend_tfg.Servicios.PropiedadServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class PropiedadControlador {

    private PropiedadServicio propiedadServicio;

    @PostMapping("/comunidad/crear/propiedad")
    public void crearPropiedades(@RequestBody CrearPropiedadDTO dto){
        propiedadServicio.crearPropiedad(dto);
    }

    @GetMapping("/comunidad/listar/propiedad/{idComunidad}")
    public List<PropiedadDTO> listarPropiedadesIdComunidad(@PathVariable Integer idComunidad){
        return propiedadServicio.listarPropiedad(idComunidad);
    }

    @GetMapping("/comunidad/listar/tipo/propiedad/{idComunidad}")
    public List<TipoPropiedad> listarTipoPropiedadesIdComunidad(@PathVariable Integer idComunidad){
        return propiedadServicio.listarTipoPropiedad(idComunidad);
    }

    @DeleteMapping("/comunidad/eliminar/propiedad/{idComunidad}/{tipoPropiedad}")
    public void eliminarPropiedades(@PathVariable Integer idComunidad,@PathVariable TipoPropiedad tipoPropiedad){
        propiedadServicio.eliminarPropiedad(idComunidad, tipoPropiedad);
    }

    @GetMapping("/vecino/listar/propiedad/{idComunidad}")
    public List<PropiedadDTO> listarPropiedadesVecinoIdComunidad(@PathVariable Integer idComunidad){
        return propiedadServicio.listarPropiedad(idComunidad);
    }

}
