package planeat.api.service;
/*
 *
 @author 신지한
 @since 2022-09-15
*/

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import planeat.api.dto.nutrient.NutrientDto;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;
import planeat.api.dto.nutrient.NutrientSearchResponse;
import planeat.config.image.S3Uploader;
import planeat.database.entity.*;
import planeat.database.repository.*;
import planeat.exception.CustomException;
import planeat.exception.CustomExceptionList;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NutrientService {

    private final NutrientRepository nutrientRepository;
    private final IngredientRepository ingredientRepository;
    private final NutrientReviewRepository nutrientReviewRepository;
    private final NutrientIngredientRespository nutrientIngredientRespository;
    private final CategoryRepository categoryRepository;
    private final S3Uploader s3Uploader;
    private final EntityManager em;
    private final ModelMapper modelMapper;

    public List<NutrientSearchResponse> readAllNutrientBySearchKeyword(String searchWord) {
        List<Nutrient> nutrientList = nutrientRepository.findByNutrientNameContains(searchWord);
        List<NutrientSearchResponse> responseList = new ArrayList<>(nutrientList.size());

        for (Nutrient n : nutrientList) {
            NutrientSearchResponse response = modelMapper.map(n, NutrientSearchResponse.class);
            responseList.add(response);
        }
        return responseList;
    }

    /**
     * 태그를 포함하는 영양제를 모두 검색
     *
     * @param categoryTag 검색할 태그
     * @return 검색결과 영양제 dto 리스트
     */
    public List<NutrientSearchResponse> readAllNutrientByCategoryTag(String categoryTag) {
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        String query = "select * from nutrient where nutrient_id in " +
                "(select nutrient_id from nutrient_ingredient where ingredient_id in " +
                "(select ingredient_id from category where category_tag like '" + categoryTag + "'))";
        Query q = em.createNativeQuery(query);

        List<NutrientSearchResponse> responseList = jpaResultMapper.list(q, NutrientSearchResponse.class);
        return responseList;
    }

    /**
     * 영양성분을 포함하는 영양제를 모두 검색
     *
     * @param ingredientId 검색할 영양성분 id
     * @return 검색결과 영양제 dto 리스트
     */
    public List<NutrientSearchResponse> readAllNutrientByIngredientId(Integer ingredientId) {
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        String query = "select * from nutrient where nutrient_id in " +
                "(select nutrient_id from nutrient_ingredient where ingredient_id =" + ingredientId + ")";
        Query q = em.createNativeQuery(query);

        List<NutrientSearchResponse> responseList = jpaResultMapper.list(q, NutrientSearchResponse.class);
        return responseList;
    }

    /**
     * 모든 영양제의 아이디와 이름 조회
     *
     * @return dto 리스트
     */
    public List<NutrientDto> readAllNutrientDto() {
        List<NutrientDto> dtoList = nutrientRepository.findAllName();
        return dtoList;
    }

    /**
     * nutrient객체를 받아 연관데이터를 response에 담아 반환한다
     *
     * @param nutrient
     * @return 영양제관련 response Dto
     */
    private NutrientResponse takeAllTable(Nutrient nutrient) {

        NutrientResponse nutrientResponse = new NutrientResponse();

        //영양제 정보 response에 저장
        nutrientResponse = NutrientResponse.builder()
                                           .nutrientId(nutrient.getId())
                                           .nutrientName(nutrient.getNutrientName())
                                           .company(nutrient.getCompany())
                                           .description(nutrient.getDescription())
                                           .imagePath(nutrient.getImagePath())
                                           .build();

        //영양제id로 영양제 성분들 가져오기
        List<NutrientIngredient> nutrientIngredientList = nutrientIngredientRespository.findAllByNutrientId(nutrient.getId());

        //영양제id로 영양제 리뷰들 가져오기
        List<NutrientReview> nutrientReviewList = nutrientReviewRepository.findByNutrient(nutrient);

        // response에 추가할 영양제 성분 list
        List<NutrientResponse.NutriIngredient> ingredientList = new ArrayList<>();

        // response에 추가할 영양제 리뷰 list
        List<NutrientResponse.NutrientReview> reviewList = new ArrayList<>();

        //영양제 성분id로 영양성분 가져오기
        for (NutrientIngredient ni : nutrientIngredientList) {
            Ingredient ingredient = ingredientRepository.findById(ni.getIngredient().getId()).get();

            List<Category> categoryList = categoryRepository.findAllByIngredientId(ingredient.getId());
            List<String> tagList = new ArrayList<>();
            for (Category c : categoryList) {
                tagList.add(c.getCategoryTag());
            }

            // responseList에 영양성분 이름, 영양성분 함량, 카테고리 list 넣어주기
            ingredientList.add(
                    new NutrientResponse.NutriIngredient(ingredient.getIngredientName(), ni.getIngredientAmount(), tagList)
            );

        }
        nutrientResponse.setNutriIngredientList(ingredientList);

        //영양제 성분id로 리뷰 가져오기
        for (NutrientReview nr : nutrientReviewList) {
            reviewList.add(new NutrientResponse.NutrientReview(nr.getKeyword(), nr.getCount()));
        }

        nutrientResponse.setNutrientReviewList(reviewList);


        return nutrientResponse;
    }

    /**
     * 영양제와 연관테이블 조회
     *
     * @param id 조회할 영양제 id
     * @return 영양제 + 영양제 성분 + 영양성분 + 카테고리
     */
    public NutrientResponse readNutrientById(Long id) {
        Nutrient nutrient = nutrientRepository.findById(id).orElseThrow(
                () -> new CustomException(CustomExceptionList.FOODINFO_NOT_FOUND_ERROR)
        );

        return takeAllTable(nutrient);
    }

    /**
     * 영양제와 연관테이블 등록
     *
     * @param nutrientRequest 영양제 등록 요청 DTO
     * @return 등록된 영양제의 id
     */
    public void createNutrientAndIngredients(NutrientRequest nutrientRequest, MultipartFile multipartFile) {
        //이미지 업로드 후 경로 받아오기
        String imageUrl = null;
        if (multipartFile != null && !multipartFile.isEmpty()) {
            try {
                //imageUrl 사진경로
                imageUrl = s3Uploader.uploadFiles(multipartFile, "static");
            } catch (Exception e) {
                throw new CustomException(CustomExceptionList.UPLOAD_ERROR);
            }
        }

        //영양제
        Nutrient nutrient = Nutrient.builder()
                                    .nutrientName(nutrientRequest.getNutrientName())
                                    .company(nutrientRequest.getCompany())
                                    .description(nutrientRequest.getDescription())
                                    .imagePath(imageUrl)
                                    .build();

        List<NutrientRequest.NutriIngredient> ingredientList = nutrientRequest.getNutriIngredientList();

        for (NutrientRequest.NutriIngredient dto : ingredientList) {
            //영양성분
            Ingredient ingredient = Ingredient.builder()
                                              .ingredientName(dto.getIngredientName())
                                              .unit(dto.getUnit())
                                              .build();

            //영양제 성분
            NutrientIngredient nutrientIngredient = NutrientIngredient.builder()
                                                                      .ingredientAmount(dto.getIngredientAmount())
                                                                      .nutrient(nutrient)
                                                                      .ingredient(ingredient)
                                                                      .build();
            nutrient.putNutrientIngredient(nutrientIngredient);
            nutrientIngredientRespository.save(nutrientIngredient);

            //카테고리
            for (String categoryTag : dto.getCategoryTagList()) {
                Category category = Category.builder()
                                            .categoryTag(categoryTag)
                                            .ingredient(ingredient)
                                            .build();
                ingredient.putCategory(category);
                categoryRepository.save(category);
            }
            ingredientRepository.save(ingredient);
        }

        nutrientRepository.save(nutrient);

    }

    /**
     * 이미지를 업로드하고 해당 영양제의 이미지경로를 update한다
     *
     * @param nutrientId    영양제id
     * @param multipartFile 이미지파일
     * @return 이미지파일 경로
     */
    public String updateNutrientImage(Long nutrientId, MultipartFile multipartFile) {
        //이미지 업로드 후 경로 받아오기
        //imageUrl 사진경로
        String imageUrl = null;
        if (multipartFile != null && !multipartFile.isEmpty()) {
            try {
                imageUrl = s3Uploader.uploadFiles(multipartFile, "static");
            } catch (Exception e) {
                throw new CustomException(CustomExceptionList.UPLOAD_ERROR);
            }
        }
        Nutrient nutrient = nutrientRepository.findById(nutrientId).orElseThrow(
                () -> new CustomException(CustomExceptionList.NUTRIENT_NOT_FOUND_ERROR)
        );
        //이미지 경로 변경
        nutrient.updateImagePath(imageUrl);

        return imageUrl;
    }

    /**
     * 워드 클라우드 이미지를 업로드하고 경로를 word_cloud_image_path에 update한다
     *
     * @param nutrientId    영양제 id
     * @param multipartFile 이미지 파일
     * @return 업로드한 이미지 경로
     */
    public String updateNutrientWordCloudImage(Long nutrientId, MultipartFile multipartFile) {
        //이미지 업로드 후 경로 받아오기
        //imageUrl 사진경로
        String imageUrl = null;
        if (multipartFile != null && !multipartFile.isEmpty()) {
            try {
                imageUrl = s3Uploader.uploadFiles(multipartFile, "static");
            } catch (Exception e) {
                throw new CustomException(CustomExceptionList.UPLOAD_ERROR);
            }
        }
        Nutrient nutrient = nutrientRepository.findById(nutrientId).orElseThrow(
                () -> new CustomException(CustomExceptionList.NUTRIENT_NOT_FOUND_ERROR)
        );
        //이미지 경로 변경
        nutrient.updateWordCloudImagePath(imageUrl);

        return imageUrl;
    }


}

