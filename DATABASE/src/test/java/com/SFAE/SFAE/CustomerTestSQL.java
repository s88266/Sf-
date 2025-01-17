package com.SFAE.SFAE;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.text.Normalizer;
import java.util.Base64;

import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.SFAE.SFAE.DTO.ContractStatusDTO;
import com.SFAE.SFAE.DTO.CustomerDTO;
import com.SFAE.SFAE.Service.ChatBot;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.io.IOException;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class CustomerTestSQL {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @Autowired
    ChatBot chatbot;

    @Autowired
    private ObjectMapper objectMapper;

   
    @Test
    public void testCreateCustomer() throws Exception {
        String json = "{ \"name\": \"MaxMusterdsadsda\", \"password\": \"Passwort123!\", \"email\": \"leventavgosdrsddedadadadadn@gmail.com\"}";

        mockMvc.perform(post("/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateCustomerEmptyValue() throws Exception {
        String json = "{ \"name\":, \"password\": \"passwort123\", \"email\": \"erayor045@gmail.com\"}";
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(post("/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest());

        transactionManager.commit(status);
    }

    @Test
    public void testGetCustomerByName() throws Exception {

        mockMvc.perform(get("/customer/usr/Test Name"))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    public void testGetCustomerByNameEmptyValue() throws Exception {

        mockMvc.perform(get("/customer/usr/ "))
                .andExpect(status().isBadRequest())
                .andReturn();

    }

    @Test
    public void testGetCustomerBySecName() throws Exception {

        mockMvc.perform(get("/customer/usr/DucDai"))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    public void testGetCustomerByID() throws Exception {

        mockMvc.perform(get("/customer/C3"))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void testGetCustomerByNegativeID() throws Exception {

        mockMvc.perform(get("/customer/-7"))
                .andExpect(status().isBadRequest())
                .andReturn();
    }
    @Test
    public void testUpdateCustomerByID() throws Exception {
        String base64Image = encodeFileToBase64Binary("static/images/koestliche-donuts-wurden-automatisch-generiert.jpg");
        CustomerDTO customerData = new CustomerDTO();
        customerData.setId("C2");
        customerData.setName("Test Name");
        customerData.setEmail("kheir321@example.com");
        customerData.setRole("ADMIN");
        customerData.setPassword("tTest123!");
        customerData.setProfileBase64(base64Image);
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(put("/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(customerData)))
                .andExpect(status().isOk());

        transactionManager.commit(status);
    }
     public static String encodeFileToBase64Binary(String resourcePath) throws IOException, FileNotFoundException, java.io.IOException {
        ClassPathResource resource = new ClassPathResource(resourcePath);
        File file = resource.getFile();
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            byte[] bytes = new byte[(int) file.length()];
            fileInputStream.read(bytes);
            return Base64.getEncoder().encodeToString(bytes);
        }
    }

    @Test
    public void testUpdateCustomerWithoutID() throws Exception {
        CustomerDTO customerData = new CustomerDTO();
        customerData.setName("Test Name");
        customerData.setEmail("test@example.com");
        customerData.setRole("ADMIN");
        customerData.setPassword("test123");
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(put("/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(customerData)))
                .andExpect(status().isBadRequest());

        transactionManager.commit(status);
    }

    @Test
    public void testUpdateCustomerEmptyName() throws Exception {
        CustomerDTO customerData = new CustomerDTO();
        customerData.setId("C3");
        customerData.setEmail("test@example.com");
        customerData.setRole("ADMIN");
        customerData.setPassword("test123");
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(put("/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(customerData)))
                .andExpect(status().isBadRequest());

        transactionManager.commit(status);
    }

    @Test
    public void testUpdateCustomerWrongRole() throws Exception {
        CustomerDTO customerData = new CustomerDTO();
        customerData.setId("C3");
        customerData.setName("Test Name");
        customerData.setEmail("test@example.com");
        customerData.setRole("KILOBYTE");
        customerData.setPassword("test123");
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(put("/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(customerData)))
                .andExpect(status().isBadRequest());

        transactionManager.commit(status);
    }

    @Test
    public void testLoginCustomer() throws Exception {
        String json = "{ \"password\": \"Passwort123!\", \"email\": \"leventavgoren@gmail.com\"}";
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andReturn();

        transactionManager.commit(status);
    }

    @Test
    public void testLoginCustomerWithOutAuth() throws Exception {
        String json = "{ \"password\": \"Passwort123!\", \"email\": \"leventavgoren@gmail.com\"}";
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isForbidden())
                .andReturn();

        transactionManager.commit(status);
    }

    @Test
    public void testLoginCustomerWithoutPassword() throws Exception {
        String json = "{ \"password\":, \"email\": \"erayzor045@gmail.com\"}";
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andReturn();

        transactionManager.commit(status);
    }

    @Test
    public void testLoginCustomerWithoutEmail() throws Exception {
        String json = "{ \"password\": \"passwort123\", \"email\":}";
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andReturn();

        transactionManager.commit(status);
    }

    @Test
    public void testLoginCustomerWrongEmail() throws Exception {
        String json = "{ \"password\": \"passwort123\", \"email\": \"iDontExist@gmail.com\"}";
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());

        mockMvc.perform(post("/customer/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isNotFound())
                .andReturn();

        transactionManager.commit(status);
    }

       @Test
    public void testCountAllCustomers() throws Exception {

         MvcResult mvcResult = mockMvc.perform(get("/customer/all"))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
public void testImageGetWorkerById() throws Exception {
    MvcResult mvcResult = mockMvc.perform(get("/customer/C1/image"))
            .andExpect(status().isOk())
            .andReturn();

    String contentAsString = mvcResult.getResponse().getContentAsString();

}


@Test
public void testImageGetWorkerByIdNotFound() throws Exception {
    MvcResult mvcResult = mockMvc.perform(get("/customer/C100/image"))
            .andExpect(status().isNotFound())
            .andReturn();

    String contentAsString = mvcResult.getResponse().getContentAsString();

}

@Test
public void testImageGetWorkerByIdBadRequest() throws Exception {
    MvcResult mvcResult = mockMvc.perform(get("/customer//image"))
            .andExpect(status().isBadRequest())
            .andReturn();

    String contentAsString = mvcResult.getResponse().getContentAsString();

}

@Test
    public void testDeleteCustomerByid() throws Exception {

         MvcResult mvcResult = mockMvc.perform(delete("/customer/C4"))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
    public void testDeleteCustomer() throws Exception {

         MvcResult mvcResult = mockMvc.perform(delete("/customer/-C4"))
                .andExpect(status().isBadRequest())
                .andReturn();

        String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
   public void testDeleteCustomerNotFound() throws Exception {

        MvcResult mvcResult = mockMvc.perform(delete("/customer/C400"))
               .andExpect(status().isNotFound())
               .andReturn();

       String contentAsString = mvcResult.getResponse().getContentAsString();
  }

  @Test
   public void testDeleteCustomerWithOpenContracts() throws Exception {

        MvcResult mvcResult = mockMvc.perform(delete("/customer/C9"))
               .andExpect(status().isConflict())
               .andReturn();

       String contentAsString = mvcResult.getResponse().getContentAsString();
  }





   @Test
   public void testUpdateRoleOfCustomer() throws Exception {
       String id = "C28";
       String role = "ADMIN";

       String requestBody = String.format("{\"id\":\"%s\", \"role\":\"%s\"}", id, role);

       MvcResult mvcResult = mockMvc.perform(put("/customer/updateRole")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestBody))
               .andExpect(status().isOk())
               .andReturn();

       String contentAsString = mvcResult.getResponse().getContentAsString();
   }
   @Test
   public void testUpdateRoleOfCustomerBadReq() throws Exception {
       String id = "C28";
       String role = "ADMIsN";

       String requestBody = String.format("{\"id\":\"%s\", \"role\":\"%s\"}", id, role);

       MvcResult mvcResult = mockMvc.perform(put("/customer/updateRole")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestBody))
               .andExpect(status().isBadRequest())
               .andReturn();

       String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
   public void testUpdateRoleOfCustomerCustom() throws Exception {
       String id = "C28";
       String role = "CUSTOMER";

       String requestBody = String.format("{\"id\":\"%s\", \"role\":\"%s\"}", id, role);

       MvcResult mvcResult = mockMvc.perform(put("/customer/updateRole")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestBody))
               .andExpect(status().isOk())
               .andReturn();

       String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
   public void testUpdateRoleOfCustomerCustomNotFound() throws Exception {
       String id = "C1000";
       String role = "CUSTOMER";

       String requestBody = String.format("{\"id\":\"%s\", \"role\":\"%s\"}", id, role);

       MvcResult mvcResult = mockMvc.perform(put("/customer/updateRole")
               .contentType(MediaType.APPLICATION_JSON)
               .content(requestBody))
               .andExpect(status().isNotFound())
               .andReturn();

       String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
   public void testUpdateCustomerStatusOrder() throws Exception{

  ContractStatusDTO contractStatusDTO= new ContractStatusDTO();
  contractStatusDTO.setId("C28");
  contractStatusDTO.setStatusOrder("FINISHED");
  String jsonContent = objectMapper.writeValueAsString(contractStatusDTO);
    MvcResult mvcResult = mockMvc.perform(put("/customer/updateStatusOrder")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isOk())
            .andReturn();

    String contentAsString = mvcResult.getResponse().getContentAsString();
   }


   @Test
   public void testUpdateCustomerStatusOrderWithWrongInput() throws Exception{

  ContractStatusDTO contractStatusDTO= new ContractStatusDTO();
  contractStatusDTO.setId("C28");
  contractStatusDTO.setStatusOrder("NOENUM");
  String jsonContent = objectMapper.writeValueAsString(contractStatusDTO);
    MvcResult mvcResult = mockMvc.perform(put("/customer/updateStatusOrder")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isBadRequest())
            .andReturn();

    String contentAsString = mvcResult.getResponse().getContentAsString();
   }

   @Test
   public void testUpdateCustomerStatusOrderNotFound() throws Exception {
       ContractStatusDTO contractStatusDTO = new ContractStatusDTO();
       contractStatusDTO.setId("C800");
       contractStatusDTO.setStatusOrder("UNDEFINED");
   
       String jsonContent = objectMapper.writeValueAsString(contractStatusDTO);
   
       MvcResult mvcResult = mockMvc.perform(put("/customer/updateStatusOrder")
               .contentType(MediaType.APPLICATION_JSON)
               .content(jsonContent))
               .andExpect(status().isNotFound())
               .andReturn();
   
       String contentAsString = mvcResult.getResponse().getContentAsString();
   }




  


}
