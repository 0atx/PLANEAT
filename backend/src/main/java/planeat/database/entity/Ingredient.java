package planeat.database.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/*
 *
 * 영양성분 이름 (망간, 비타민A, 비타민C ...)
 *
 @author 신지한
 @since 2022-09-15
*/
@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Integer id;

    @Column(nullable = false)
    private String ingredientName;
    @Column(nullable = false)
    private String unit;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "ingredient")
    List<NutrientIngredient> nutrientIngredientList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "ingredient")
    List<Category> categoryList = new ArrayList<>();

    @Builder
    public Ingredient(Integer id, String ingredientName, String unit) {
        this.id = id;
        this.ingredientName = ingredientName;
        this.unit = unit;
    }

    public void putCategory(Category category) {
        this.categoryList.add(category);
    }

}
