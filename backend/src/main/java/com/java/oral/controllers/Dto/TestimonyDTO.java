package com.java.oral.controllers.Dto;


import com.java.oral.entities.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestimonyDTO {

   
    private Long id;
    private String category;
    private String section;

    
    private User user;
}
