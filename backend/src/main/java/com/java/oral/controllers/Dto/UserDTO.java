package com.java.oral.controllers.Dto;

import java.util.ArrayList;
import java.util.List;

import com.java.oral.entities.Testimony;

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
    private String identification;
    private String name;    
    
    private List<Testimony> testimonies = new ArrayList<>();
}
