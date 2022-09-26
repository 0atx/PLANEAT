package planeat.api.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planeat.api.dto.common.BasicResponse;
import planeat.api.dto.nutrient.NutrientRequest;
import planeat.api.dto.nutrient.NutrientResponse;
import planeat.api.dto.usernutrient.NutrientHistoryRequest;
import planeat.api.dto.usernutrient.UserNutrientRequest;
import planeat.api.dto.usernutrient.UserNutrientResponse;
import planeat.api.service.NutrientService;
import planeat.api.service.UserNutrientService;
import planeat.database.entity.Nutrient;
import planeat.database.entity.NutrientHistory;
import planeat.database.repository.NutrientRepository;

import java.util.List;
import java.util.Optional;

/*
 *
 * 영양제 데이터 API
 *
 @author 신지한
 @since 2022-09-15
*/
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/nutrient")
public class NutrientController {

    final NutrientService nutrientService;
    final NutrientRepository nutrientRepository;
    final UserNutrientService userNutrientService;

    static final String SUCCESS = "success";

    @GetMapping("/user/{userId}")
    @ApiOperation(value = "유저의 영양제 목록 조회", notes = "유저 id를 받아 Table[유저 영양제, 영양제 섭취기록]을 조회한다")
    public ResponseEntity<BasicResponse<List<UserNutrientResponse>>> readUserNutrient(@PathVariable("userId") Long userId){
        List<UserNutrientResponse> userNutrientResponseList = userNutrientService.readAllUserNutrientByUserId(userId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, userNutrientResponseList), HttpStatus.OK);
    }

    @PostMapping("/user/{userId}")
    @ApiOperation(value = "유저 영양제 등록", notes = "유저 영양제 정보를 받아 Table[유저 영양제]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createUserNutrient(UserNutrientRequest userNutrientRequest){
        userNutrientService.createUserNutrient(userNutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.CREATED);
    }

    @PostMapping("/user/history/{nutrientId}")
    @ApiOperation(value = "유저의 영양제 목록 조회", notes = "영양제 섭취기록 request를 받아 Table[영양제 섭취기록]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrientHistory(@PathVariable("nutrientId") Long nutrientId ,NutrientHistoryRequest request){
        userNutrientService.createNutrientHistory(request);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, " "), HttpStatus.CREATED);
    }

    @GetMapping
    @ApiOperation(value = "영양제 조회", notes = "영양제 id를 받아 Table[영양제, 영양제 성분, 영양성분, 카테고리]을 조회한다")
    public ResponseEntity<BasicResponse<NutrientResponse>> readNutrient(Long id){

        NutrientResponse nutrientResponse = nutrientService.readNutrientById(id);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS , nutrientResponse), HttpStatus.CREATED);
    }


    @PostMapping
    @ApiOperation(value = "영양제 등록", notes = "영양제 정보를 받아 Table[영양제, 영양제 성분, 영양성분, 카테고리]에 등록한다")
    public ResponseEntity<BasicResponse<String>> createNutrient(NutrientRequest nutrientRequest){
        nutrientService.createNutrientAndIngredients(nutrientRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS , " "), HttpStatus.CREATED);
    }

    /**
     * 기본 Response 형식 DTO
     *
     * @param message 성공, 실패 여부 메세지 "SUCCESS", "ERROR"
     * @param data 반환할 데이터
     * @return ResponseEntity의 Body
     */
    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
