package planeat.api.dto.mydiet;

/*
 *
 * MyDietResponse
 *
 @author 박윤하
 @since 2022-09-22
*/

import lombok.Builder;
import lombok.Getter;
import planeat.database.entity.FoodInfo;
import planeat.enums.FoodType;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class MyDietResponse {

    private Long myDietId;
    private String dietName;
    private List<DietInfos> dietInfosList;

    @Getter
    static public class DietInfos {
        Long foodInfoId;
        Long foodUser;
        FoodType foodType;
        String name;
        Integer year;
        String manufacturer;
        String categoryLarge;
        String categoryDetail;
        Integer servingSize;
        String servingUnit;
        Float capacityG;
        Float capacityMl;
        Float calorie;
        Float protein;
        Float fat;
        Float carbohydrate;
        Float sugar;
        Float dietary_fiber;
        Float calcium;
        Float iron;
        Float magnesium;
        Float phosphorus;
        Float potassium;
        Float sodium;
        Float zinc;
        Float copper;
        Float manganese;
        Float selenium;
        Float vitaminA;
        Float vitaminD;
        Float vitaminB6;
        Float folate;
        Float vitaminB12;
        Float vitaminC;
        Float cholesterol;
        Float fattyAcid;
        Float linoleicAcid;
        Float alphaLinoleicAcid;
        Float transFattyAcid;
        Float vitaminB1;
        Float vitaminB2;
        BigDecimal amount;

        public DietInfos(FoodInfo foodInfo, BigDecimal amount) {
            this.foodInfoId = foodInfo.getId();
            this.foodType = foodInfo.getFoodType();
            this.foodUser = foodInfo.getFoodUser();
            this.name = foodInfo.getName();
            this.year = foodInfo.getYear();
            this.manufacturer = foodInfo.getManufacturer();
            this.categoryLarge = foodInfo.getCategoryLarge();
            this.categoryDetail = foodInfo.getCategoryDetail();
            this.servingSize = foodInfo.getServingSize();
            this.servingUnit = foodInfo.getServingUnit();
            this.capacityG = foodInfo.getCapacityG();
            this.capacityMl = foodInfo.getCapacityMl();
            this.calorie = foodInfo.getCalorie();
            this.protein = foodInfo.getProtein();
            this.fat = foodInfo.getFat();
            this.carbohydrate = foodInfo.getCarbohydrate();
            this.sugar = foodInfo.getSugar();
            this.dietary_fiber = foodInfo.getDietary_fiber();
            this.calcium = foodInfo.getCalcium();
            this.iron = foodInfo.getIron();
            this.magnesium = foodInfo.getMagnesium();
            this.phosphorus = foodInfo.getPhosphorus();
            this.potassium = foodInfo.getPotassium();
            this.sodium = foodInfo.getSodium();
            this.zinc = foodInfo.getZinc();
            this.copper = foodInfo.getCopper();
            this.manganese = foodInfo.getManganese();
            this.selenium = foodInfo.getSelenium();
            this.vitaminA = foodInfo.getVitaminA();
            this.vitaminD = foodInfo.getVitaminD();
            this.vitaminB6 = foodInfo.getVitaminB6();
            this.folate = foodInfo.getFolate();
            this.vitaminB12 = foodInfo.getVitaminB12();
            this.vitaminC = foodInfo.getVitaminC();
            this.cholesterol = foodInfo.getCholesterol();
            this.fattyAcid = foodInfo.getFattyAcid();
            this.linoleicAcid = foodInfo.getLinoleicAcid();
            this.alphaLinoleicAcid = foodInfo.getAlphaLinoleicAcid();
            this.transFattyAcid = foodInfo.getTransFattyAcid();
            this.vitaminB1 = foodInfo.getVitaminB1();
            this.vitaminB2 = foodInfo.getVitaminB2();
            this.amount = amount;
        }
    }

    @Builder
    public MyDietResponse(Long myDietId, String dietName, List<DietInfos> dietInfosList) {
        this.myDietId = myDietId;
        this.dietName = dietName;
        this.dietInfosList = dietInfosList;
    }

    public static MyDietResponse createMyDietResponse(Long myDietId, String dietName, List<DietInfos> dietInfosList) {
        MyDietResponse myDietResponse = MyDietResponse.builder()
                .myDietId(myDietId)
                .dietName(dietName)
                .dietInfosList(dietInfosList)
                .build();
        return myDietResponse;
    }

}
