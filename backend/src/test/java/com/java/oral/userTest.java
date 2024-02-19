package com.java.oral;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java.oral.controllers.Dto.UserDTO;
import com.java.oral.entities.User;
import com.java.oral.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.Random;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class userTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testCreate1000Users() throws Exception {
        Random random = new Random();
        for (int i = 0; i < 1000; i++) {
            String randomName = generateRandomString(10);
            String randomIdentification = generateRandomNumericString(10);

            UserDTO userDTO = new UserDTO();
            userDTO.setName(randomName);
            userDTO.setIdentification(randomIdentification);

            ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders
                    .post("/api/user/save")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(userDTO)))
                    .andExpect(status().isCreated());

        
        }
    }

    // Method to generate a random string of given length
    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < length; i++) {
            randomString.append(characters.charAt(new Random().nextInt(characters.length())));
        }
        return randomString.toString();
    }
       // Method to generate a random numeric string of given length
       private String generateRandomNumericString(int length) {
        String characters = "0123456789";
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < length; i++) {
            randomString.append(characters.charAt(new Random().nextInt(characters.length())));
        }
        return randomString.toString();
    }
}
