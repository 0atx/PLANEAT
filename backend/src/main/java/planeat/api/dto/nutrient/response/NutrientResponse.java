package planeat.api.dto.nutrient.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NutrientResponse {
    private List<NutrientResponse.EachNutrient> eachNutrients;

    @Getter
    @Setter
    public static class EachNutrient{
        private Integer intakeRecommend;
        private String nutrientName;
        private String company;
        private String description;
    }

}
