package com.java.oral.controllers;

import java.net.URISyntaxException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java.oral.controllers.Dto.UserDTO;
import com.java.oral.entities.User;
import com.java.oral.error.UserNotFoundException;
import com.java.oral.service.IUserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Optional<User> userOptional = iUserService.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .identification(user.getIdentification())
                    .testimonies(user.getTestimonies())
                    .build();

            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/save")
    public ResponseEntity<UserDTO> save(@RequestBody @Valid UserDTO userDTO) {
      
             User savedUser = iUserService.save(User.builder()
            .name(userDTO.getName())
            .identification(userDTO.getIdentification())
            .build());
        
            UserDTO savedUserDTO = new UserDTO();
            savedUserDTO.setId(savedUser.getId());
            savedUserDTO.setName(savedUser.getName());
            savedUserDTO.setIdentification(savedUser.getIdentification());

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUserDTO);
        

    }

    @GetMapping("/")
    public ResponseEntity<Page<UserDTO>> findAll(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserDTO> userpage = iUserService.findAll(pageable)
                .map(user -> UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .identification(user.getIdentification())
                        .testimonies(user.getTestimonies())
                        .build());
        System.out.println(userpage);
        return ResponseEntity.ok(userpage);
    }

    @GetMapping("/filter/{identification}")
    public ResponseEntity<Page<UserDTO>> findByIdentification(@PathVariable String identification,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) throws UserNotFoundException {

        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = iUserService.findByPartialIdentification(identification, pageable);

        Page<UserDTO> userDTOsPage = users
                .map(user -> UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .identification(user.getIdentification())
                        .testimonies(user.getTestimonies())
                        .build());
        System.out.println(userDTOsPage);
        if (!userDTOsPage.isEmpty()) {
            return ResponseEntity.ok(userDTOsPage);
        } else {
            throw new UserNotFoundException("Usuario no encontrado");
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO userDTO)
            throws UserNotFoundException {
        Optional<User> userOption = iUserService.findById(id);
        if (userOption.isPresent()) {
            User user = userOption.get();
            user.setName(userDTO.getName());
            user.setIdentification(userDTO.getIdentification());
            iUserService.save(user);

            UserDTO updatedUserDTO = new UserDTO();
            updatedUserDTO.setId(user.getId());
            updatedUserDTO.setName(user.getName());
            updatedUserDTO.setIdentification(user.getIdentification());

            return ResponseEntity.ok(updatedUserDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        if (id != null) {
            iUserService.deleteById(id);
            return ResponseEntity.ok("register delete");
        }

        return ResponseEntity.badRequest().build();
    }
}
