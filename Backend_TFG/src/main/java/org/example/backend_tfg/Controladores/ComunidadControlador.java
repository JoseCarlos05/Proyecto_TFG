package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.ComunidadDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.Solicitud;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Seguridad.UsuarioAdapter;
import org.example.backend_tfg.Servicios.ComunidadServicio;
import org.example.backend_tfg.Servicios.UsuarioServicio;
import org.example.backend_tfg.Servicios.VecinoServicio;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@AllArgsConstructor
public class ComunidadControlador {

    private ComunidadServicio comunidadService;

    private UsuarioServicio usuarioServicio;

    private VecinoServicio vecinoServicio;

    @GetMapping("/vecino/ver/comunidad/{idComunidad}")
    public ComunidadDTO verComunidadID(@PathVariable Integer idComunidad){
        return comunidadService.verComunidadID(idComunidad);
    }

    @GetMapping("/vecino/ver/comunidad/usuario/{idUsuario}")
    public ComunidadDTO verComunidadUsuarioID(@PathVariable Integer idUsuario){
        return comunidadService.verComunidadUsuarioID(idUsuario);
    }

    @GetMapping("/comunidad/ver/comunidad/usuario/{idUsuario}")
    public ComunidadDTO verComunidadUsuarioIDComunidad(@PathVariable Integer idUsuario){
        return comunidadService.verComunidadUsuarioID(idUsuario);
    }

    @GetMapping("/comunidad/usuario/correo/{correo}")
    public Usuario buscarUsuarioPorCorreo(@PathVariable String correo){
        UserDetails userDetails = usuarioServicio.loadUserByUsername(correo);
        if (userDetails instanceof UsuarioAdapter) {
            return ((UsuarioAdapter) userDetails).getUsuario();
        }
        throw new RuntimeException("El usuario autenticado no es del tipo esperado.");
    }

    @GetMapping("/vecino/listar/comunidades/{idVecino}")
    public List<ComunidadDTO> listarComunidades(@PathVariable Integer idVecino){
        return comunidadService.listarComunidades(idVecino);
    }

    @PostMapping("/comunidad/generar/codigo/{idVivienda}/{idComunidad}")
    public String generarCodigo(@PathVariable Integer idVivienda, @PathVariable Integer idComunidad){
        return comunidadService.generarCodigo(idVivienda, idComunidad);
    }

    @GetMapping("/comunidad/listar/solicitudes/{idComunidad}")
    public List<Solicitud> listarSolicitudesComunidad(@PathVariable Integer idComunidad){
        return comunidadService.listarSolicitudes(idComunidad);
    }

    @PostMapping("/comunidad/aceptar/solicitud")
    public void aceptarSolicitud(@RequestBody Solicitud solicitud){
        comunidadService.aceptarSolicitudEntrada(solicitud);
    }

    @PostMapping("/comunidad/rechazar/solicitud")
    public void rechazarSolicitud(@RequestBody Solicitud solicitud){
        comunidadService.rechazarSolicitud(solicitud);
    }

    @GetMapping("/vecino/listar/todas/comunidades")
    public List<ComunidadDTO> listarTodasComunidades(){
        return comunidadService.listarTodasComunidades();
    }

    @GetMapping("/comunidad/ver/vecino/{idVecino}")
    public VecinoDTO verVecinoID(@PathVariable Integer idVecino){
        return vecinoServicio.buscarVecinoID(idVecino);
    }
}
