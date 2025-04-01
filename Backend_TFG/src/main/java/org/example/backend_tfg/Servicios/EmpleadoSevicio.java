package org.example.backend_tfg.Servicios;

import lombok.AllArgsConstructor;
import org.example.backend_tfg.DTOs.RegistrarEmpleadoDTO;
import org.example.backend_tfg.Modelos.Comunidad;
import org.example.backend_tfg.Modelos.Empleado;
import org.example.backend_tfg.Repositorios.IComunidadRepositorio;
import org.example.backend_tfg.Repositorios.IEmpleadoRepositorio;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmpleadoSevicio {

    private IEmpleadoRepositorio iEmpleadoRepositorio;

    private IComunidadRepositorio iComunidadRepositorio;

    public void crearEmpleado(RegistrarEmpleadoDTO dto){

        Empleado empleado = new Empleado();
        empleado.setNombre(dto.getNombre());
        empleado.setApellidos(dto.getApellidos());
        empleado.setDni(dto.getDni());
        empleado.setTelefono(dto.getTelefono());
        empleado.setHorasTotales(dto.getHorasTotales());
        empleado.setHoraEntrada(dto.getHoraEntrada());
        empleado.setHoraSalida(dto.getHoraSalida());
        empleado.setOficio(dto.getOficio());
        empleado.setOficio(dto.getOficio());
        empleado.setSueldo(dto.getSueldo());
        empleado.setCorreoElectronico(dto.getCorreoElectronico());

        Comunidad comunidad = iComunidadRepositorio.findById(dto.getIdComunidad())
                .orElseThrow(()-> new RuntimeException("No existe una comunidad con este ID."));
        empleado.setComunidad(comunidad);

        iEmpleadoRepositorio.save(empleado);
    }

}
