package com.java.oral.controllers.Dto;

import java.util.ArrayList;
import java.util.List;

import com.java.oral.entities.Testimony;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    

    private Long id;


    @NotBlank(message = "Campo no debe estar vacio")
    @Size(min = 10, max = 15, message = "Debe tener minimo 10 caracteres")
    private String identification;

    @NotBlank(message = "Campo no debe estar vacio")
    @Size(min = 10, max = 15, message = "Debe tener minimo 10 caracteres")
    private String name;    
    
    private List<Testimony> testimonies = new ArrayList<>();
}
