package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.RegistrarVecinoDTO;
import org.example.backend_tfg.DTOs.UsuarioDTO;
import org.example.backend_tfg.DTOs.VecinoDTO;
import org.example.backend_tfg.Modelos.*;
import org.example.backend_tfg.Repositorios.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VecinoServicio {

    private IVecinoRepositorio iVecinoRepositorio;

    private IUsuarioRepositorio iUsuarioRepositorio;

    private IViviendaRepositorio iViviendaRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    private ISolicitudRepositorio iSolicitudRepositorio;

    public VecinoDTO buscarVecinoID(Integer id){
        Vecino vecino = iVecinoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        return getVecinoDTO(vecino);
    }

    public VecinoDTO busccarVecinoUsuarioID(Integer idUsuario) {
        Vecino vecino = iVecinoRepositorio.findByUsuario_Id(idUsuario);
        return getVecinoDTO(vecino);
    }

    public List<VecinoDTO> listarVecino(){
        List<Vecino> vecinos = iVecinoRepositorio.findAll();
        List<VecinoDTO> vecinoDTOS = new ArrayList<>();

        for (Vecino vecino: vecinos){
            vecinoDTOS.add(getVecinoDTO(vecino));
        }

        return vecinoDTOS;
    }

    private VecinoDTO actualizarVecino(VecinoDTO vecinoDTO, UsuarioDTO usuarioDTO) {
        Vecino vecino = iVecinoRepositorio.findById(vecinoDTO.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe un vecino con este ID."));
        vecino.setNombre(vecinoDTO.getNombre());
        vecino.setApellidos(vecinoDTO.getApellidos());
        vecino.setDNI(vecinoDTO.getDNI());
        vecino.setTelefono(vecinoDTO.getTelefono());
        vecino.setFechaNacimiento(vecinoDTO.getFechaNacimiento());
        vecino.setNumCuenta(vecinoDTO.getNumeroCuenta());

        if (usuarioDTO != null && vecinoDTO.getCorreo() != null) {
            Usuario usuario = vecino.getUsuario();
            if (usuario != null) {
                String nuevoCorreo = vecinoDTO.getCorreo().trim().toLowerCase();
                String correoActual = usuario.getCorreo() != null ? usuario.getCorreo().trim().toLowerCase() : "";
                if (!nuevoCorreo.equals(correoActual)) {
                    Optional<Usuario> usuarioExistente = iUsuarioRepositorio.findOtherByCorreoIgnoreCase(nuevoCorreo, usuario.getId());
                    if (usuarioExistente.isPresent()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El correo ya está en uso por otro usuario.");
                    }
                    usuario.setCorreo(nuevoCorreo);
                    iUsuarioRepositorio.save(usuario);
                }
            }
        }
        Vecino vecinoActualizado = iVecinoRepositorio.save(vecino);
        return getVecinoDTO(vecinoActualizado);
    }

    public void solicitarIngresoComunidad(Integer idVivienda, Integer idComunidad, Integer idVecino) {

        Solicitud solicitud = new Solicitud();
        solicitud.setIdComunidad(idComunidad);
        solicitud.setIdVecino(idVecino);
        solicitud.setIdVivienda(idVivienda);
        iSolicitudRepositorio.save(solicitud);

    }

    public void insertarCodigoComunidad(String codigoComunidad, Integer idVecino) {
        Vecino vecino = iVecinoRepositorio.findById(idVecino)
                .orElseThrow(() -> new RuntimeException("No existe un vecino con este ID."));

        for (Comunidad comunidad : iComunidadRepositorio.findAll()) {
            if (comunidad.getCodigoComunidad().equals(codigoComunidad)) {
                String dirViviendaHex = codigoComunidad.substring(6);
                StringBuilder dirViviendaSB = new StringBuilder();
                for (int i = 0; i < dirViviendaHex.length(); i += 2) {
                    String strByte = dirViviendaHex.substring(i, i + 2);
                    int decimal = Integer.parseInt(strByte, 16);
                    dirViviendaSB.append((char) decimal);
                }
                String dirVivienda = dirViviendaSB.toString();
                for (Vivienda vivienda : iViviendaRepositorio.findAll()) {
                    if (vivienda.getDireccionPersonal().equals(dirVivienda)) {
                        vivienda.getVecinos().add(vecino);
                        iViviendaRepositorio.save(vivienda);
                        vecino.getViviendas().add(vivienda);
                        iVecinoRepositorio.save(vecino);
                        break;
                    }
                }
                comunidad.setCodigoComunidad(null);
                iComunidadRepositorio.save(comunidad);
                break;
            } else {
                throw new RuntimeException("Código incorrecto.");
            }

        }

    }

    public static VecinoDTO getVecinoDTO(Vecino vecino){
        VecinoDTO dtoNuevo  = new VecinoDTO();

        dtoNuevo.setId(vecino.getId());
        dtoNuevo.setNombre(vecino.getNombre());
        dtoNuevo.setApellidos(vecino.getApellidos());
        dtoNuevo.setDNI(vecino.getDNI());
        dtoNuevo.setTelefono(vecino.getTelefono());
        dtoNuevo.setFechaNacimiento(vecino.getFechaNacimiento());
        dtoNuevo.setNumeroCuenta(vecino.getNumCuenta());

        return dtoNuevo;
    }
}
