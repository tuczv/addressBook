package org.bitbucket.cyd.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.bitbucket.cyd.SpringbootAngularjsAddressbookApplication;
import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.IOException;
import java.nio.charset.Charset;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringbootAngularjsAddressbookApplication.class)
public class UserResourceTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private UserRepository userRepository;

    private User user;

    private MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        UserResource userResource = new UserResource();
        ReflectionTestUtils.setField(userResource, "userRepository", userRepository);
        this.mockMvc = MockMvcBuilders.standaloneSetup(userResource).build();    }

    @Test
    public void getAllTest() throws Exception {

        mockMvc.perform(get("/api/users")
                .accept(contentType))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE));

    }

  /*  @Test
    public void registerUser() throws Exception {
        mockMvc.perform(
                post("/api/users/register")
                        .contentType(contentType)
                        .content(convertObjectToJsonBytes(this.user)))
                .andExpect(status().isCreated());
        User user = userRepository.findByUsername("testing123");
        assertTrue("email not correct: " + user.getEmail(), "test@gmail.com".equals(user.getEmail()));

    }*/

    public static byte[] convertObjectToJsonBytes(Object object)
            throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        JavaTimeModule module = new JavaTimeModule();
        mapper.registerModule(module);

        return mapper.writeValueAsBytes(object);
    }

}