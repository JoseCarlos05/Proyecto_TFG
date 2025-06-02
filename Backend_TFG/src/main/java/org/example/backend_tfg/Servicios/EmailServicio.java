package org.example.backend_tfg.Servicios;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Usuario;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IUsuarioRepositorio;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class EmailServicio {

    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    private final IComunidadRepositorio iComunidadRepositorio;

    private final IUsuarioRepositorio iUsuarioRepositorio;

    @Value("${spring.mail.username}")
    private String from;

    public EmailServicio(JavaMailSender mailSender, PasswordEncoder passwordEncoder, IComunidadRepositorio iComunidadRepositorio, IUsuarioRepositorio iUsuarioRepositorio) {
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.iComunidadRepositorio = iComunidadRepositorio;
        this.iUsuarioRepositorio = iUsuarioRepositorio;
    }

    public void sendVerificationEmail(String to, String token) {
        String subject = "Verifica tu cuenta";
        String verificationUrl = "http://localhost:8080/verify?token=" + token;
        String message = "Por favor, haz clic en el siguiente enlace para verificar tu cuenta:\n" + verificationUrl;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(from);
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        try {
            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.err.println("Error sending verification email: " + e.getMessage());
        }
    }


    public void nuevoPresidente(String to, Integer idComunidad) {
        Comunidad comunidad = iComunidadRepositorio.findById(idComunidad)
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));

        Usuario usuario = iUsuarioRepositorio.findById(comunidad.getUsuario().getId())
                .orElseThrow(()-> new RuntimeException("No existe un usuario con este ID."));


        String nuevaContrasena = generarContrasenaAleatoria();
        usuario.setContrasena(passwordEncoder.encode(nuevaContrasena));
        iUsuarioRepositorio.save(usuario);

        String subject = "Cambio presidente";
        String message = "Buenas, has sido elegido nuevo presidente de la comunidad " + comunidad.getNombre() +
                " de la dirección: " + comunidad.getDireccion() + "\n A continuación le pasamos el correo y la contraseña de la comunidad" +
                ".\nCorreo: " + usuario.getCorreo() + "\n" + "Contraseña: " + nuevaContrasena;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(from);
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        try {
            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.err.println("Error sending verification email: " + e.getMessage());
        }
    }

    public void enviarCorreo(String destinatario, String asunto, String contenido) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);
            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(contenido, true);
            mailSender.send(mensaje);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo", e);
        }
    }

    private String generarContrasenaAleatoria() {
        final String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(16);
        for (int i = 0; i < 16; i++) {
            int index = random.nextInt(caracteres.length());
            sb.append(caracteres.charAt(index));
        }
        return sb.toString();
    }
}