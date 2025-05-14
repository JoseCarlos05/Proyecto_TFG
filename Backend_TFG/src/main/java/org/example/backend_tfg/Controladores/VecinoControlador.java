package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.EditarVecinoDTO;
import org.example.backend_tfg.DTOs.InsertarCodigoDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Seguridad.UsuarioAdapter;
import org.example.backend_tfg.Servicios.UsuarioServicio;
import org.example.backend_tfg.Servicios.VecinoServicio;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vecino")
@AllArgsConstructor
public class VecinoControlador {

    private VecinoServicio vecinoServicio;

    private UsuarioServicio usuarioServicio;

    @GetMapping("/listar/vecinos")
    public List<VecinoDTO> listarVecinos(){
        return vecinoServicio.listarVecino();
    }

    @GetMapping("/ver/vecino/{idVecino}")
    public VecinoDTO verVecinoID(@PathVariable Integer idVecino){
        return vecinoServicio.buscarVecinoID(idVecino);
    }

    @GetMapping("/ver/vecino/usuario/{idUsuario}")
    public VecinoDTO verVecinoUsuarioID(@PathVariable Integer idUsuario){
        return vecinoServicio.buscarVecinoUsuarioID(idUsuario);
    }

    @PutMapping("/actualizar/{idVecino}")
    public void actualizarVecino(@RequestBody EditarVecinoDTO dto, @PathVariable Integer idVecino){
        vecinoServicio.actualizarVecino(dto, idVecino);
    }

    @PostMapping("/solicitar/{idVivienda}/{idComunidad}/{idVecino}")
    public void solicitarIngresoComunidad(@PathVariable Integer idVivienda, @PathVariable Integer idComunidad,
                                          @PathVariable Integer idVecino){
        vecinoServicio.solicitarIngresoComunidad(idVivienda, idComunidad, idVecino);
    }

    @PostMapping("/insertar/codigo")
    public void insertarCodigoComunidad(@RequestBody InsertarCodigoDTO dto){
        vecinoServicio.insertarCodigoComunidad(dto);
    }

    @GetMapping("/usuario/correo/{correo}")
    public Usuario buscarUsuarioPorCorreo(@PathVariable String correo){
        UserDetails userDetails = usuarioServicio.loadUserByUsername(correo);
        if (userDetails instanceof UsuarioAdapter) {
            return ((UsuarioAdapter) userDetails).getUsuario();
        }
        throw new RuntimeException("El usuario autenticado no es del tipo esperado.");
    }
}
