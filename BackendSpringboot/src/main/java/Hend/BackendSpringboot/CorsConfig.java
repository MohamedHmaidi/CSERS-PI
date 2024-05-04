package Hend.BackendSpringboot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/auth") // Adjust the path pattern to match your API endpoints
                        .allowedOrigins("http://localhost:4200")
                        .allowedOrigins("http://localhost:8089/csers/ws/info?t=1714581246811")// Allow requests from your frontend app URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
