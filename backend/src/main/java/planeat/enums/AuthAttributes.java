package planeat.enums;

/*
 *
 * AuthAttributes
 *
 @author 박윤하
 @since 2022-09-15
*/

import planeat.api.dto.auth.UserProfile;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum AuthAttributes {

    GOOGLE("google", (attributes) -> {
        UserProfile userProfile = new UserProfile();
        userProfile.setName((String) attributes.get("name"));
        userProfile.setEmail((String) attributes.get("email"));
        return userProfile;
    }),

    KAKAO("kakao", (attributes) -> {
        // kakao는 kakao_account에 유저정보가 있다. (email)
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        // kakao_account안에 또 profile이라는 JSON객체가 있다. (nickname, profile_image)
        Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

        UserProfile userProfile = new UserProfile();
        userProfile.setName((String) kakaoProfile.get("name"));
        userProfile.setEmail((String) kakaoAccount.get("email"));
        return userProfile;
    }),

    NAVER("naver", (attributes) -> {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        UserProfile userProfile = new UserProfile();
        userProfile.setName((String) response.get("nickname"));
        userProfile.setEmail(((String) response.get("email")));
        return userProfile;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, UserProfile> of;

    AuthAttributes(String registrationId, Function<Map<String, Object>, UserProfile> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static UserProfile extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }

}
