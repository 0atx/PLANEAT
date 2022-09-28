package planeat.database.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import planeat.database.entity.UserNutrient;

import java.util.List;

public interface UserNutrientRepository extends JpaRepository<UserNutrient, Long> {
    @EntityGraph(attributePaths = {"user"})
    @Query("select u from UserNutrient u where u.user.id = :userId")
    List<UserNutrient> findAllByUserId(Long userId);
}