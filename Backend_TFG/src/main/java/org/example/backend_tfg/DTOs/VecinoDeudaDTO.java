package org.example.backend_tfg.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VecinoDeudaDTO {
    private VecinoDTO vecino;
    private List<GastoDTO> gastos;
}
