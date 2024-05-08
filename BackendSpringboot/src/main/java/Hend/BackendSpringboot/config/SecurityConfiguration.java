package Hend.BackendSpringboot.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.io.IOException;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true)
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthFilter jwtAuthFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/auth/staff","/ressource/**","/auth/login","/auth/register","/forgetpassword/**","/forgetpassword/verify0tp/{otp}/{email}","/auth/changeRole","/auth/updateID/**","/auth/stats","/fcm/send", "/incident/**","/ws/**")
                        .permitAll()
                        .requestMatchers("/auth/allUser").hasAuthority("USER")
                        .requestMatchers("/equipes/**").hasAuthority("USER")
                        .requestMatchers("/membre/**").hasAuthority("USER")
                        .requestMatchers("/reservation/**").hasAuthority("USER")
                        .requestMatchers("/ressource/**").hasAuthority("USER")
                        .requestMatchers("/claim/**").hasAuthority("USER")
                        .requestMatchers("/incident/**").hasAuthority("USER")
                        .requestMatchers("/quizzes/**").hasAuthority("USER")
                        .requestMatchers("/response/**").hasAuthority("USER")
                        .requestMatchers("/training-content/**").hasAuthority("USER")
                        .requestMatchers("/incidentType/**").hasAuthority("USER")
                        .requestMatchers("http://localhost:8089/csers/ws/**").hasAuthority("USER")
                        .requestMatchers("/incident/GetAllMsg").hasAuthority("USER")
                        .requestMatchers("/chat.sendMessage").hasAuthority("USER")
                        .requestMatchers("/chat.addUser").hasAuthority("USER")
                        .requestMatchers("/auth/allUser").hasAuthority("ADMIN")
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }



    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // Set CORS headers here
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range");

        // Proceed with the filter chain
        chain.doFilter(request, response);
    }
}



