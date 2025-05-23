package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.*;
import org.example.backend_tfg.Enumerados.Rol;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Modelos.Vecino;
import org.example.backend_tfg.Modelos.VerificationToken;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IUsuarioRepositorio;
import org.example.backend_tfg.Repositorios.IVecinoRepositorio;
import org.example.backend_tfg.Repositorios.IVerificationTokenRepositorio;
import org.example.backend_tfg.Seguridad.JWTService;
import org.example.backend_tfg.Seguridad.UsuarioAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.*;

@Service
@AllArgsConstructor
public class UsuarioServicio implements UserDetailsService {

    private IUsuarioRepositorio usuarioRepositorio;

    private final PasswordEncoder passwordEncoder;

    private JWTService jwtService;

    private IVecinoRepositorio iVecinoRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    private ViviendaServicio viviendaServicio;

    private EmailServicio emailServicio;

    private IVerificationTokenRepositorio iVerificationTokenRepositorio;

    private final EmailServicio emailService;

    private final Map<String, CodigoRecuperacion> codigoStorage = new HashMap<>();

    private static class CodigoRecuperacion {
        String codigo;
        LocalDateTime fechaCreacion;

        public CodigoRecuperacion(String codigo) {
            this.codigo = codigo;
            this.fechaCreacion = LocalDateTime.now();
        }
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findTopByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return new UsuarioAdapter(usuario);
    }

    public ResponseEntity<RespuestaDTO> login(LoginDTO dto) {

        UserDetails userDetails = loadUserByUsername(dto.getCorreo());
        if (userDetails == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        if (!userDetails.isEnabled()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(RespuestaDTO.builder()
                            .estado(HttpStatus.UNAUTHORIZED.value())
                            .mensaje("Cuenta no verificada. Por favor, verifica tu correo electrónico.")
                            .build());
        }

        if (passwordEncoder.matches(dto.getContrasena(), userDetails.getPassword())) {
            Usuario usuario = ((UsuarioAdapter) userDetails).getUsuario();
            String token = jwtService.generateToken(usuario);
            return ResponseEntity.ok(RespuestaDTO.builder()
                    .estado(HttpStatus.OK.value())
                    .token(token)
                    .build());
        } else {
            throw new BadCredentialsException("Contraseña incorrecta");
        }
    }

    public Usuario registrarVecino(RegistrarVecinoDTO dto) {
        Usuario nuevoUsuario = new Usuario();
        Vecino vecino = new Vecino();

        nuevoUsuario.setCorreo(dto.getCorreo());
        nuevoUsuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        nuevoUsuario.setRol(Rol.VECINO);

        vecino.setNombre(dto.getNombre());
        vecino.setApellidos(dto.getApellidos());
        vecino.setDni(dto.getDni());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaNacimiento = LocalDate.parse(dto.getFechaNacimiento(), formatter);
        vecino.setFechaNacimiento(fechaNacimiento);

        vecino.setTelefono(dto.getTelefono());
        vecino.setNumCuenta(dto.getNumeroCuenta());

        vecino.setUsuario(nuevoUsuario);
        iVecinoRepositorio.save(vecino);

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(24);
        VerificationToken verificationToken = new VerificationToken(token, nuevoUsuario, expiryDate);
        iVerificationTokenRepositorio.save(verificationToken);

        emailServicio.sendVerificationEmail(nuevoUsuario.getCorreo(), token);

        return nuevoUsuario;
    }

    public Usuario registrarComunidad(RegistrarComunidadDTO dto){

        Usuario nuevoUsuario = new Usuario();
        Comunidad comunidad = new Comunidad();

        nuevoUsuario.setCorreo(dto.getCorreo());
        nuevoUsuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        nuevoUsuario.setRol(Rol.COMUNIDAD);

        comunidad.setNombre(dto.getNombre());
        comunidad.setDireccion(dto.getDireccion());
        comunidad.setNumeroCuenta(dto.getNumCuenta());
        comunidad.setBanco(dto.getBanco());
        comunidad.setCIF(dto.getCif());

        Vecino presidente = iVecinoRepositorio.findById(dto.getIdPresidente())
                .orElseThrow(() -> new RuntimeException("No existe un presidente con este ID."));

        comunidad.setPresidente(presidente);

        Usuario usuarioGuardado = usuarioRepositorio.save(nuevoUsuario);
        comunidad.setUsuario(usuarioGuardado);

        iComunidadRepositorio.save(comunidad);

        viviendaServicio.crearVivienda(new RegistrarViviendaDTO("(Modifica este nombre de vivienda)", comunidad.getId()));
        ViviendaDTO vivienda = viviendaServicio.listarViviendas(comunidad.getId()).getFirst();
        viviendaServicio.asignarViviendaVecino(vivienda.getId(), presidente.getId());
        viviendaServicio.asignarPropietarioVivienda(vivienda.getId(), presidente.getId());

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(24);
        VerificationToken verificationToken = new VerificationToken(token, usuarioGuardado, expiryDate);
        iVerificationTokenRepositorio.save(verificationToken);

        emailServicio.sendVerificationEmail(usuarioGuardado.getCorreo(), token);

        return usuarioGuardado;
    }

    public void solicitarCambioContrasena(String correo) {
        Usuario usuario = usuarioRepositorio.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Generar código numérico de 6 dígitos con ceros a la izquierda
        String codigo = String.format("%06d", new Random().nextInt(1_000_000));

        codigoStorage.put(correo, new CodigoRecuperacion(codigo));

        emailService.enviarCorreo(correo, "Código para recuperar contraseña",
                "Tu código para recuperar la contraseña es: " + codigo + "\n" +
                        "Este código expirará en 10 minutos.");
    }

    public boolean cambiarContrasena(String correo, String codigo, String nuevaContrasena) {
        if (!codigoStorage.containsKey(correo)) {
            throw new RuntimeException("No existe solicitud para este correo.");
        }

        CodigoRecuperacion codigoRecuperacion = codigoStorage.get(correo);

        // Comprobar caducidad (10 minutos)
        if (codigoRecuperacion.fechaCreacion.plusMinutes(10).isBefore(LocalDateTime.now())) {
            codigoStorage.remove(correo);
            throw new RuntimeException("Código expirado.");
        }

        if (!codigoRecuperacion.codigo.equals(codigo)) {
            throw new RuntimeException("Código inválido.");
        }

        Usuario usuario = usuarioRepositorio.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setContrasena(passwordEncoder.encode(nuevaContrasena));
        usuarioRepositorio.save(usuario);

        codigoStorage.remove(correo);
        return true;
    }
}
