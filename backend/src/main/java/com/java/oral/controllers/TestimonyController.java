package com.java.oral.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.oral.controllers.Dto.TestimonyDTO;
import com.java.oral.controllers.Dto.UserDTO;
import com.java.oral.entities.Testimony;
import com.java.oral.entities.User;
import com.java.oral.service.ITestimonyService;

@RestController
@RequestMapping("/api/testimony")
public class TestimonyController {

    @Autowired
    private ITestimonyService iTestimonyService;

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Optional<Testimony> testimonyOption = iTestimonyService.findById(id);

        if (testimonyOption.isPresent()) {
            Testimony testimony = testimonyOption.get();

            TestimonyDTO testimonyDTO = TestimonyDTO.builder()
                                                .id(testimony.getId())
                                                .category(testimony.getCategory())
                                                .section(testimony.getSection())
                                                .user(testimony.getUser())
                                                .build();

                                return ResponseEntity.ok(testimonyDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/findall")
    public ResponseEntity<?> findAll(){
        List<TestimonyDTO> testimonylist = iTestimonyService.findAll(null)
                                            .stream()
                                            .map(testimony -> TestimonyDTO.builder()
                                                            .id(testimony.getId())
                                                            .category(testimony.getCategory())
                                                            .section(testimony.getSection())
                                                            .user(testimony.getUser())
                                                            .build())
                                                        .toList();
                    return ResponseEntity.ok(testimonylist);
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody TestimonyDTO testimonyDTO) throws URISyntaxException{
        if (testimonyDTO.getCategory().isBlank() || testimonyDTO.getCategory().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Testimony testimony = Testimony.builder()
                            .category(testimonyDTO.getCategory())
                            .section(testimonyDTO.getSection())
                            .user(testimonyDTO.getUser())
                            .build();

                iTestimonyService.save(testimony);

        return ResponseEntity.created(new URI("/api/testimony")).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody TestimonyDTO testimonyDTO){
        Optional<Testimony> testimonyOption = iTestimonyService.findById(id);

        if (testimonyOption.isPresent()) {
            Testimony testimony = testimonyOption.get();
            testimony.setCategory(testimonyDTO.getCategory());
            testimony.setSection(testimonyDTO.getSection());
            iTestimonyService.save(testimony);
            return ResponseEntity.ok("register update");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        if (id != null) {
            iTestimonyService.deleteById(id);
            return ResponseEntity.ok("register delete");
        }

        return ResponseEntity.badRequest().build();
    }
}
