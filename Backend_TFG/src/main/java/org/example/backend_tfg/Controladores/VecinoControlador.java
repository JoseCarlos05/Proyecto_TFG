package org.example.backend_tfg.Controladores;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.InsertarCodigoDTO;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Servicios.VecinoServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vecino")
@AllArgsConstructor
public class VecinoControlador {

    private VecinoServicio vecinoServicio;

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
        return vecinoServicio.busccarVecinoUsuarioID(idUsuario);
    }

    @PutMapping("/actualizar/{idVecino}")
    public void actualizarVecino(@RequestBody RegistrarVecinoDTO dto, @PathVariable Integer idVecino){
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


}
