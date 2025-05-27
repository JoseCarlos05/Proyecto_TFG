package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Servicios.ViviendaServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ViviendaControlador {

    private ViviendaServicio viviendaServicio;

    @PostMapping("/comunidad/crear/vivienda")
    public void crearGasto(@RequestBody RegistrarViviendaDTO registrarViviendaDTO){
        viviendaServicio.crearVivienda(registrarViviendaDTO);
    }

    @GetMapping("/vecino/listar/viviendas/{idComunidad}")
    public List<ViviendaDTO> listarViviendas(@PathVariable Integer idComunidad){
        return viviendaServicio.listarViviendas(idComunidad);
    }

    @GetMapping("/comunidad/listar/viviendas/{idComunidad}")
    public List<ViviendaDTO> listarViviendasComunidad(@PathVariable Integer idComunidad){
        return viviendaServicio.listarViviendas(idComunidad);
    }

    @GetMapping("/vecino/listar/residentes/{idVivienda}")
    public Set<VecinoDTO> listarResidentes(@PathVariable Integer idVivienda){
        return viviendaServicio.listarResidentes(idVivienda);
    }

    @GetMapping("/comunidad/listar/residentes/{idVivienda}")
    public Set<VecinoDTO> listarResidentesComunidad(@PathVariable Integer idVivienda){
        return viviendaServicio.listarResidentes(idVivienda);
    }

    @GetMapping("/numero/viviendas/{idComunidad}")
    public Integer numeroViviendas(@PathVariable Integer idComunidad){
        return viviendaServicio.numeroViviendas(idComunidad);
    }

    @GetMapping("/numero/propietarios/{idComunidad}")
    public Integer numeroPropietarios(@PathVariable Integer idComunidad){
        return viviendaServicio.numeroPropietarios(idComunidad);
    }

    @GetMapping("/comunidad/numero/viviendas/{idComunidad}")
    public Integer numeroViviendasComunidad(@PathVariable Integer idComunidad){
        return viviendaServicio.numeroViviendas(idComunidad);
    }

    @GetMapping("/comunidad/ver/info/vivienda/{idVivienda}")
    public ViviendaDTO verInfoVivienda(@PathVariable Integer idVivienda){
        return viviendaServicio.verViviendaID(idVivienda);
    }

    @PostMapping("comunidad/asginar/propietario/vivienda/{idVivienda}/{idPropietario}")
    public void asignarPropietarioVivienda(@PathVariable Integer idVivienda, @PathVariable Integer idPropietario){
        viviendaServicio.asignarPropietarioVivienda(idVivienda, idPropietario);
    }

    @PostMapping("/comunidad/editar/vivienda/{idVivienda}")
    public void editarVivienda(@RequestBody EditarViviendaDTO editarViviendaDTO, @PathVariable Integer idVivienda){
        viviendaServicio.editarNombreVivienda(editarViviendaDTO, idVivienda);
    }

    @DeleteMapping("/viviendas/{idVivienda}/residentes/{idResidente}")
    public ResponseEntity<String> eliminarResidente(@PathVariable Integer idVivienda, @PathVariable Integer idResidente) {
        viviendaServicio.eliminarResidente(idVivienda, idResidente);
        return ResponseEntity.ok("Residente eliminado correctamente.");
    }
}
