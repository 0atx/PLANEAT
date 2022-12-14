package planeat.config.auth;

/*
 *
 * SecurityConfig
 *
 @author 박윤하
 @since 2022-09-15
*/

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import planeat.api.service.AuthService;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthService AuthService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .logout().logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/oauth/info", true)
                .userInfoEndpoint()
                .userService(AuthService);

        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("http://localhost:9000");
        configuration.addAllowedOriginPattern("http://j7a701.p.ssafy.io:3000");
        configuration.addAllowedOriginPattern("http://j7a701.p.ssafy.io:9000");
        configuration.addAllowedOriginPattern("https://j7a701.p.ssafy.io");
        configuration.addAllowedOriginPattern("https://j7a701.p.ssafy.io:3000");
        configuration.addAllowedOriginPattern("https://j7a701.p.ssafy.io:9000");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }

}
