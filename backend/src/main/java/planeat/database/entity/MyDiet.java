package planeat.database.entity;

/*
 * 내 식단 엔티티
 * MyDiet - my_diet table entity
 *
 @author 박윤하
 @since 2022-09-14
*/

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import planeat.api.dto.mydiet.MyDietRequest;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "my_diet")
public class MyDiet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "my_diet_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "diet_name", nullable = false)
    private String dietName;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "myDiet")
    List<DietInfo> dietInfoList = new ArrayList<>();


    @Builder
    public MyDiet(Long id, User user, String dietName) {
        this.id = id;
        this.user = user;
        this.dietName = dietName;
    }

    public static MyDiet createMyDiet(User user, MyDietRequest myDietRequest) {
        MyDiet myDiet = MyDiet.builder()
                .user(user)
                .dietName(myDietRequest.getDietName())
                .build();
        return myDiet;
    }


    public static MyDiet updateMyDiet(User user, MyDietRequest myDietRequest) {
        MyDiet myDiet = MyDiet.builder()
                .id(myDietRequest.getMyDietId())
                .user(user)
                .dietName(myDietRequest.getDietName())
                .build();
        return myDiet;
    }

}
