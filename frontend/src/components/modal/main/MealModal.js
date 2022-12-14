/*
식사 등록 버튼 클릭시 나오는 모달
속성: month, day, mealModalOpen, setMealModalOpen, mealtype
@author 여예원
@since 2022.09.26
*/

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import Chart from "react-apexcharts";
import ChipDeletable from "components/common/ChipDeletable";
// recoil 사용
import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

import {
  Typography,
  Grid,
  TextField,
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import BtnMain from "components/common/BtnMain";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DietModal from "components/modal/main/DietModal";
import FoodModal from "components/modal/main/FoodModal";
import { http } from "api/http";
import { click } from "@testing-library/user-event/dist/click";
import Btn from "components/common/Btn";
import RegistMeal from "pages/main/RegistMeal";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MaxWidthDialog(props) {
  const navigator = useNavigate();

  let month = props.month;
  if (month < 10) {
    month = "0" + props.month;
  }
  let day = props.day;
  if (day < 10) {
    day = "0" + props.day;
  }
  let curDate = props.year + "-" + month + "-" + day;

  const [allFood, setAllFood] = useState([]); // 모든 음식, 왼쪽 영역 음식
  const [myFood, setMyFood] = useState([]); // 내음식
  const [myDiet, setMyDiet] = useState([]); // 내식단
  const [hasRecord, setHasRecord] = useState(false);

  // 맨 처음 음식 전체 데이터 가져오기
  async function getAllFood() {
    console.log("getAllFood");
    const response = await http.get(`/food-infos/1`);
    if (response.data.message === "success") {
      setAllFood(response.data.data);
      console.log(response.data.data);
    }
  }

  // 맨 처음 내 음식 가져오는 함수
  async function getMyFood() {
    const response = await http.get(`/food-infos/${userInfo.userId}`);
    if (response.data.message === "success") {
      setMyFood(response.data.data);
    }
  }

  // 맨 처음 내 식단 가져오는 함수
  async function getMyDiet() {
    console.log("getMyDiet");
    const response = await http.get(`/my-diets/${userInfo.userId}`);
    if (response.data.message === "success") {
      setMyDiet(response.data.data);
      console.log(response.data.data);
    }
  }

  // 맨 처음 식사 기록 가져오는 함수
  async function getMealRecord() {
    const response = await http.get(
      `/intake-histories/${userInfo.userId}/${curDate}`
    );

    console.log(response.data.data);
    let record = response.data.data;

    for (let i = 0; i < record.length; i++) {
      if (record[i].mealType == props.mealType) {
        setHasRecord(true);
        setClickedFoodList(record[i].intakeFoodsList);
      }
    }
  }

  const [isChange, setIsChange] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getAllFood();
      getMyFood();
      getMyDiet();
      getMealRecord();
    }
  }, [isChange]);

  const [searchKeyWord, setSearchKeyWord] = useState();
  const searchInput = useRef(null); // 검색바 input 객체
  const intakeFoodInput = useRef(null); // 섭취량 input 객체
  const [fullWidth, setFullWidth] = useState(true);
  const [showMoreFoodModal, setShowMoreFoodModal] = useState(false);

  // 음식 이름 검색하는 함수
  async function search(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let keyword = searchKeyWord;
      keyword = keyword.trim();
      const response = await http.get(
        `/food-infos/${userInfo.userId}/${keyword}`
      );

      if (response.data.message == "success") {
        if (response.data.data.length == 0) {
          alert(`${keyword}에 해당하는 음식이 없습니다.`);
        } else {
          setAllFood(response.data.data);
        }
      } else {
        alert("올바른 검색어를 입력해주세요.");
      }
      searchInput.current.value = "";
    }
  }
  // 음식 이름 검색하는 함수(클릭)
  async function searchClick(e) {
    e.preventDefault();
    let keyword = searchKeyWord;
    keyword = keyword.trim();
    const response = await http.get(
      `/food-infos/${userInfo.userId}/${keyword}`
    );

    if (response.data.message == "success") {
      if (response.data.data.length == 0) {
        alert(`${keyword}에 해당하는 음식이 없습니다.`);
      } else {
        setAllFood(response.data.data);
      }
    } else {
      alert("올바른 검색어를 입력해주세요.");
    }
    searchInput.current.value = "";
  }

  // 전체탭 음식 클릭 함수
  function foodClick(index) {
    let food = allFood[index];
    food.amount = 1;

    setClickedFood(food);
    setModifyFood(food);

    // 탄, 단, 지, 당, 나 함량 변경
    let nutri = [];
    nutri[0] = food.carbohydrate;
    nutri[1] = food.protein;
    nutri[2] = food.fat;
    nutri[3] = food.sugar;
    nutri[4] = food.sodium;
    setIntakeAmount(nutri);

    // 섭취량 입력 창 초기 값 설정
    intakeFoodInput.current.value = allFood[index].servingSize;
  }

  // MY탭 음식 클릭 함수
  function myFoodClick(index) {
    console.log("MYfoodClick");
    console.log(myFood[index]);

    let food = myFood[index];
    food.amount = 1;

    setClickedFood(food);
    setModifyFood(food);

    // 탄, 단, 지, 당, 나 함량 변경
    let nutri = [];
    nutri[0] = food.carbohydrate;
    nutri[1] = food.protein;
    nutri[2] = food.fat;
    nutri[3] = food.sugar;
    nutri[4] = food.sodium;
    setIntakeAmount(nutri);

    // 섭취량 입력 창 초기 값 설정
    intakeFoodInput.current.value = myFood[index].servingSize;
  }

  // 내 식단 클릭 함수
  function myDietClick(index) {
    console.log("MYDietClick");
    console.log(myDiet[index]);
    setClickedDiet(myDiet[index]);
    let myDiets = myDiet[index].dietInfosList;
    let myDietIntakes = [0, 0, 0, 0, 0];

    for (let i = 0; i < myDiets.length; i++) {
      myDietIntakes[0] = myDietIntakes[0] + myDiets[i].carbohydrate;
      myDietIntakes[1] = myDietIntakes[1] + myDiets[i].protein;
      myDietIntakes[2] = myDietIntakes[2] + myDiets[i].fat;
      myDietIntakes[3] = myDietIntakes[3] + myDiets[i].sugar;
      myDietIntakes[4] = myDietIntakes[4] + myDiets[i].sodium;
    }

    console.log(myDietIntakes);
    setMyDietAmount(myDietIntakes);
  }

  // Tab 관련 변수, 함수
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setClickedFood(null);
  };

  const [dietModalOpen, setDietModalOpen] = useState(false); // 식단 모달 관리 변수
  const [foodModalOpen, setFoodModalOpen] = useState(false); // 음식 직접입력 모달 관리 변수
  const [clickedFood, setClickedFood] = useState(null); // 클릭한 음식 (기준)
  const [clickedDiet, setClickedDiet] = useState(null); // 클릭한 식단 (기준)
  const [modifyFood, setModifyFood] = useState(null); // 클릭한 양조절 후 변수
  const [clickedFoodList, setClickedFoodList] = useState([]); // 클릭한 음식 담는 배열
  const [intakeAmount, setIntakeAmount] = useState([0, 0, 0, 0, 0]); // 탄, 단, 지, 당, 나 함량
  const [myDietAmount, setMyDietAmount] = useState([0, 0, 0, 0, 0]); // 선택한 식단의 영양 정보 함량

  // 클릭한 음식 섭취량 조절 함수
  let regex = /^[0-9]+$/;
  function changeClickedFood(e) {
    e.preventDefault();
    if (regex.test(e.target.value) || e.target.value == "") {
    } else {
      alert("섭취량을 숫자로 입력하세요");
      intakeFoodInput.current.value = null; // 내가 먹은양
    }

    let copy = { ...clickedFood }; // 음식 정보
    let info = []; // 영양성분의 양
    copy.amount =
      Number(intakeFoodInput.current.value) / clickedFood.servingSize; // 음식 객체의 year 를 amount로 쓰자
    copy.carbohydrate = Number(copy.amount * clickedFood.carbohydrate);
    info[0] = copy.carbohydrate;
    copy.protein = Number(copy.amount * clickedFood.protein);
    info[1] = copy.protein;
    copy.fat = Number(copy.amount * clickedFood.fat);
    info[2] = copy.fat;
    copy.sugar = Number(copy.amount * clickedFood.sugar);
    info[3] = copy.sugar;
    copy.sodium = Number(copy.amount * clickedFood.sodium);
    info[4] = copy.sodium;

    // 변경된 음식 정보, 각 음식양 변경
    setModifyFood(copy);
    setIntakeAmount(info);
  }

  // 식단 영양정보 (탄,단,지,당,나) 차트
  function DietInfoChart() {
    let series = [];
    if (
      typeof myDietAmount[0] == "number" &&
      typeof myDietAmount[1] == "number" &&
      typeof myDietAmount[2] == "number" &&
      typeof myDietAmount[3] == "number" &&
      typeof myDietAmount[4] == "number"
    ) {
      series = [
        {
          data: [
            (
              (myDietAmount[0] / props.recIntakeAmount.carbohydrate) *
              100
            ).toFixed(1),
            ((myDietAmount[1] / props.recIntakeAmount.protein) * 100).toFixed(
              1
            ),
            ((myDietAmount[2] / props.recIntakeAmount.fat) * 100).toFixed(1),
            ((myDietAmount[3] / 50) * 100).toFixed(1),
            (
              (myDietAmount[4] /
                props.recIntakeAmount.nutritionsList[17].intake_rec) *
              100
            ).toFixed(1),
          ], // 음식의 (영양분/권장)*100
        },
      ];
    } else {
      series = [
        {
          data: [
            (myDietAmount[0] / props.recIntakeAmount.carbohydrate) * 100,
            (myDietAmount[1] / props.recIntakeAmount.protein) * 100,
            (myDietAmount[2] / props.recIntakeAmount.fat) * 100,
            (myDietAmount[3] / 50) * 100,
            (myDietAmount[4] /
              props.recIntakeAmount.nutritionsList[17].intake_rec) *
              100,
          ], // 음식의 (영양분/권장)*100
        },
      ];
    }

    const options = {
      colors: ["#FFEFC9", "#FFB3B3", "#A9D5C7", "#9DA6F8", "#E6E8FD"],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          distributed: true, // 막대바 마다 색 바꿔 주기 위해서 사용하는 옵션
          borderRadius: 4,
          horizontal: true,
          barHeight: "50%",
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#666666"],
        },
        formatter: function (val, opt) {
          return myDietAmount[opt.dataPointIndex] + " (" + val + "%" + ")";
        },
        offsetX: -10,
      },
      xaxis: {
        categories: [
          "탄수화물(g)",
          "단백질(g)",
          "지방(g)",
          "당류(g)",
          "나트륨(mg)",
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      legend: {
        show: false,
      },
    };

    return (
      <div className="app">
        <div id="chart">
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      </div>
    );
  }

  // 음식 영양정보 (탄,단,지,당,나) 차트
  function FoodInfoChart() {
    let series = [];
    if (
      typeof modifyFood.carbohydrate == "number" &&
      typeof modifyFood.protein == "number" &&
      typeof modifyFood.fat == "number" &&
      typeof modifyFood.sugar == "number" &&
      typeof modifyFood.sodium == "number"
    ) {
      series = [
        {
          data: [
            (
              (modifyFood.carbohydrate / props.recIntakeAmount.carbohydrate) *
              100
            ).toFixed(1),
            (
              (modifyFood.protein / props.recIntakeAmount.protein) *
              100
            ).toFixed(1),
            ((modifyFood.fat / props.recIntakeAmount.fat) * 100).toFixed(1),
            ((modifyFood.sugar / 50) * 100).toFixed(1),
            (
              (modifyFood.sodium /
                props.recIntakeAmount.nutritionsList[17].intake_rec) *
              100
            ).toFixed(1),
          ], // 음식의 (영양분/권장)*100
        },
      ];
    } else {
      series = [
        {
          data: [
            (modifyFood.carbohydrate / props.recIntakeAmount.carbohydrate) *
              100,
            (modifyFood.protein / props.recIntakeAmount.protein) * 100,
            (modifyFood.fat / props.recIntakeAmount.fat) * 100,
            (modifyFood.sugar / 50) * 100,
            (modifyFood.sodium /
              props.recIntakeAmount.nutritionsList[17].intake_rec) *
              100,
          ], // 음식의 (영양분/권장)*100
        },
      ];
    }

    const options = {
      colors: ["#FFEFC9", "#FFB3B3", "#A9D5C7", "#9DA6F8", "#E6E8FD"],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          distributed: true, // 막대바 마다 색 바꿔 주기 위해서 사용하는 옵션
          borderRadius: 4,
          horizontal: true,
          barHeight: "50%",
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#666666"],
        },
        formatter: function (val, opt) {
          return intakeAmount[opt.dataPointIndex] + " (" + val + "%" + ")";
        },
        offsetX: -10,
      },
      xaxis: {
        categories: [
          "탄수화물(g)",
          "단백질(g)",
          "지방(g)",
          "당류(g)",
          "나트륨(mg)",
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      legend: {
        show: false,
      },
    };

    return (
      <div className="app">
        <div id="chart">
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      </div>
    );
  }

  // 오른쪽 영역에서 식사에 추가 버튼
  function addMeal() {
    let copyList = [...clickedFoodList];

    let id = modifyFood.foodInfoId;
    let hasFood = false;
    for (let i = 0; i < copyList.length; i++) {
      // copyList에 추가하려는 음식이 있는 경우
      if (copyList[i].foodInfoId == id) {
        // 음식 양을 변경 후 음식 리스트 변경
        copyList[i].amount = modifyFood.amount;
        hasFood = true;
        setClickedFoodList(copyList);
        break;
      }
    }

    if (!hasFood) {
      copyList.push(modifyFood);
      setClickedFoodList(copyList);
    }
  }

  async function deleteMyFood() {
    console.log(clickedFood);
    const response = await http.delete(`food-infos/${userInfo.userId}`, {
      data: {
        foodInfoId: clickedFood.foodInfoId,
        foodUser: clickedFood.foodUser,
        userId: userInfo.userId,
      },
    });
    if (response.data.message == "success") {
      alert(`${clickedFood.name} 이(가) 삭제 되었습니다.`);
      setClickedFood(null);
      getMyFood();
    }
  }

  // 식사 등록 함수
  async function registerMeal() {
    // 음식 정보 데이터 변환
    let list = [];
    for (let i = 0; i < clickedFoodList.length; i++) {
      list.push({
        amount: clickedFoodList[i].amount,
        foodInfoId: clickedFoodList[i].foodInfoId,
      });
    }

    if (list.length == 0) {
      alert("음식을 선택해주세요.");
    } else {
      const response = await http.post(`/intake-histories/${userInfo.userId}`, {
        date: curDate,
        intakeFoodsList: list,
        mealType: props.mealType,
      });

      if (response.data.message == "success") {
        let str = "";
        if (props.mealType == "간식") {
          str += "이 등록되었습니다.";
        } else {
          str += "식사가 등록되었습니다.";
        }
        alert(`${props.month}월 ${props.day}일 ${props.mealType}` + str);
      } else {
        alert("식사 등록에 실패했습니다.");
      }
      getMealRecord();
      let change = props.isChange;
      props.setIsChange(!change);
      props.close();
    }
  }

  // 식사 수정 함수
  async function modifyMeal() {
    // 음식 정보 데이터 변환
    let list = [];
    for (let i = 0; i < clickedFoodList.length; i++) {
      list.push({
        amount: clickedFoodList[i].amount,
        foodInfoId: clickedFoodList[i].foodInfoId,
      });
    }

    const response = await http.put(`/intake-histories/${userInfo.userId}`, {
      date: curDate,
      intakeFoodsList: list,
      mealType: props.mealType,
      userId: userInfo.userId,
    });

    if (response.data.message == "success") {
      let str = "";
      if (props.mealType == "간식") {
        str += "이 수정되었습니다.";
      } else {
        str += "식사가 수정되었습니다.";
      }
      alert(`${props.month}월 ${props.day}일 ${props.mealType}` + str);
    } else {
      alert("식사 수정에 실패했습니다.");
    }
    getMealRecord();
    let change = props.isChange;
    props.setIsChange(!change);
    props.close();
  }

  const userInfo = useRecoilValue(userState);

  // 내식단 탭 관련 함수
  // 내식단 삭제 함수
  async function deleteDiet() {
    console.log(clickedDiet);
    const response = await http.delete(`/my-diets/${userInfo.userId}`, {
      data: {
        myDietId: clickedDiet.myDietId,
        userId: userInfo.userId,
      },
    });

    if (response.data.message == "success") {
      alert(`${clickedDiet.dietName} 식단 삭제가 완료되었습니다.`);
      setClickedDiet(null);
      getMyDiet();
    }
  }

  // 내식단 식사에 추가 함수
  function addDietToMeal() {
    let copyList = [...clickedFoodList];

    console.log(clickedDiet);
    let diet = clickedDiet.dietInfosList;

    for (let i = 0; i < diet.length; i++) {
      let id = diet[i].foodInfoId;
      let hasFood = false;

      for (let j = 0; j < copyList.length; j++) {
        if (copyList[j].foodInfoId == id) {
          copyList[j].amount = diet[i].amount;
          hasFood = true;
          setClickedFoodList(copyList);
          break;
        }
      }

      if (!hasFood) {
        copyList.push(diet[i]);
        setClickedFoodList(copyList);
      }
    }
  }

  return (
    <div>
      {/* 식단으로 추가 모달 */}
      <DietModal
        open={dietModalOpen}
        close={() => setDietModalOpen(false)}
        foodList={clickedFoodList}
        setIsChange={setIsChange}
        getMyDiet={getMyDiet}
      />
      {/* 내음식 추가 모달 */}
      <FoodModal
        open={foodModalOpen}
        close={() => {
          setFoodModalOpen(false);
          setShowMoreFoodModal(false);
        }}
        setIsChange={setIsChange}
        showMoreFoodModal={showMoreFoodModal}
        setShowMoreFoodModal={setShowMoreFoodModal}
        getMyFood={getMyFood}
      />
      <Dialog
        style={{ zIndex: 1700 }}
        keepMounted
        fullWidth={fullWidth}
        maxWidth="lg"
        open={props.mealModalOpen}
        onClose={props.close}
        id="container"
      >
        {/* 모달 타이틀 */}
        <Grid
          container
          direction="row"
          style={{
            padding: "2vw",
            fontSize: "18px",
            color: "#9DA6F8",
            fontWeight: "bold",
          }}
          alignItems="center"
        >
          <Grid container xs={7}>
            {props.month}월 {props.day}일 {props.mealType}{" "}
            {props.mealType == "간식" ? null : "식사"}
          </Grid>
          <Grid container xs={5}>
            {/* 내 식단으로 추가 버튼 */}
            <Grid item xs={6}>
              <BtnMain
                width="80%"
                onClick={() => {
                  setDietModalOpen(true);
                }}
              >
                내 식단으로 추가
              </BtnMain>
            </Grid>
            {/* 식사 등록 버튼 */}
            <Grid item xs={6}>
              {hasRecord == false ? (
                <BtnMain
                  width="70%"
                  onClick={() => {
                    registerMeal();
                  }}
                >
                  식사 등록
                </BtnMain>
              ) : (
                <BtnMain
                  width="70%"
                  onClick={() => {
                    modifyMeal();
                  }}
                >
                  식사 수정
                </BtnMain>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* 선택 음식 칩 영역 */}
        <Grid
          container
          direction="row"
          style={{ paddingLeft: "2vw" }}
          alignItems="center"
        >
          {clickedFoodList.length == 0 ? null : (
            <>
              {clickedFoodList.map(function (food, i) {
                return (
                  <ChipDeletable
                    col="black"
                    label={food.name}
                    onClick={() => {
                      setModifyFood(food);
                      setClickedFood(food);
                      let nutri = [];
                      nutri[0] = food.carbohydrate * food.amount;
                      nutri[1] = food.protein * food.amount;
                      nutri[2] = food.fat * food.amount;
                      nutri[3] = food.sugar * food.amount;
                      nutri[4] = food.sodium * food.amount;
                      setIntakeAmount(nutri);
                      intakeFoodInput.current.value =
                        food.amount * food.servingSize;
                    }}
                    onDelete={() => {
                      let copy = [...clickedFoodList];
                      let index = copy.indexOf(food);
                      copy.splice(index, 1);
                      setClickedFoodList(copy);
                    }}
                    style={{ marginRight: "5px" }}
                  ></ChipDeletable>
                );
              })}
            </>
          )}
        </Grid>
        {/* 검색바 영역 */}
        <Grid
          container
          direction="row"
          style={{ padding: "2vw" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={7}>
            <Paper
              elevation={0}
              component="form"
              id="search"
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "24px",
                backgroundColor: "#F5F5F5",
              }}
            >
              {/* 검색어 입력 부분 */}
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="음식명으로 검색하세요"
                onChange={(e) => {
                  setSearchKeyWord(e.target.value);
                }} // 검색 키워드 변경
                id="searchValue"
                inputRef={searchInput} // input 객체를 반환
                onKeyDown={(e) => {
                  search(e);
                }} // enter시 검색하는 함수
              />
              {/* 검색어 삭제 버튼 */}
              {searchKeyWord == null || searchKeyWord == "" ? null : (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => {
                    searchInput.current.value = null; // input 객체의 값을 비운다.
                    setSearchKeyWord(null);
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
              )}
              {/* 돋보기 버튼 */}
              <IconButton
                type="button"
                sx={{ p: "10px", color: "#9DA6F8", mr: 2 }}
                aria-label="search"
                onClick={(e) => {
                  searchClick(e);
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        {/* 음식 선택 영역 */}
        <Tabs
          indicatorColor="primary"
          textColor="inherit"
          value={value}
          sx={{ ml: "3vw", mr: "3vw" }}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="전체" {...a11yProps(0)} style={{ minWidth: "33%" }} />
          <Tab label="내음식" {...a11yProps(1)} style={{ minWidth: "33%" }} />
          <Tab label="내식단" {...a11yProps(2)} style={{ minWidth: "33%" }} />
        </Tabs>
        {/* 전체 탭 내용*/}
        <TabPanel value={value} index={0}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {/* 음식 선택 영역: 왼쪽 */}
            <Grid item xs={6}>
              <StyledWrapper>
                <Grid container xs={12} id="container">
                  <List sx={{ width: "100%" }}>
                    {allFood.map(function (food, i) {
                      return (
                        <ListItemButton key={i} onClick={() => foodClick(i)}>
                          <ListItemText
                            // primary={`[${food.manufacturer}] ${food.name}`}
                            primary={
                              <p>
                                <b>[{food.manufacturer}]</b>&nbsp;
                                {food.name}
                              </p>
                            }
                            secondary={`${food.calorie}kcal, ${food.servingSize}${food.servingUnit}, (1회 제공량)`}
                            id={i}
                            sx={{ fontWeight: "bold" }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 선택 영역: 오른쪽 */}
            <Grid item xs={6}>
              <StyledWrapper>
                <Grid
                  container
                  id="container"
                  justifyContent="center"
                  alignItems="center"
                >
                  {clickedFood == null ? (
                    <Grid id="noClickedFood">
                      <Grid item xs={12} sx={{ mb: 2 }}>
                        <img src="assets/planet.png" id="planet" />
                      </Grid>
                      <Grid item xs={12}>
                        음식을 클릭하면 영양성분을 확인할 수 있어요
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      xs={12}
                      style={{
                        padding: "3%",
                        height: "400px",
                      }}
                    >
                      {/* 음식명 */}
                      <Grid
                        container
                        xs={12}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid
                          item
                          xs={6}
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          섭취량 설정
                        </Grid>
                        <Grid item xs={3}>
                          <Btn
                            bgColor="#E6E8FD"
                            fontColor="black"
                            onClick={() => {
                              addMeal();
                            }}
                          >
                            식사에 추가
                          </Btn>
                        </Grid>
                      </Grid>
                      {/* 음식 양 */}
                      <Grid item xs={12}>
                        <ListItemText
                          primary={clickedFood.name}
                          secondary={`${clickedFood.calorie}kcal, ${clickedFood.servingSize}${clickedFood.servingUnit}, (1회 제공량)`}
                        />
                        <FormControl
                          sx={{ m: 1, width: "25ch" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            id="outlined-adornment-weight"
                            defaultValue={
                              modifyFood.servingSize * modifyFood.amount
                            }
                            onChange={(e) => {
                              changeClickedFood(e);
                            }}
                            inputRef={intakeFoodInput}
                            endAdornment={
                              <InputAdornment position="end">
                                {clickedFood.servingUnit}
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FoodInfoChart></FoodInfoChart>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ color: "#666666", fontSize: "12px" }}
                      >
                        * (%)하루 권장섭취량에 대한 비율
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </StyledWrapper>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 내음식탭 내용*/}
        <TabPanel value={value} index={1}>
          <Grid container direction="row" alignItems="center">
            {/* 음식 선택 영역: 왼쪽 */}
            <Grid item xs={6}>
              <StyledWrapper>
                <Grid container xs={12} id="container" elevation={0}>
                  <List
                    sx={{
                      width: "100%",
                    }}
                    subheader={
                      <ListSubheader
                        sx={{ fontWeight: "bold", fontSize: "18px" }}
                        component="div"
                        id="nested-list-subheader"
                      >
                        내 음식
                      </ListSubheader>
                    }
                  >
                    {myFood.map(function (food, i) {
                      return (
                        <ListItemButton
                          key={i}
                          onClick={() => {
                            myFoodClick(i);
                          }}
                        >
                          <ListItemText
                            primary={food.name}
                            secondary={`${food.calorie}kcal, ${food.servingSize}${food.servingUnit}, (1회 제공량)`}
                            id={i}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 선택 영역: 오른쪽 */}
            <Grid item xs={6}>
              <StyledWrapper>
                <Grid
                  container
                  id="container"
                  justifyContent="center"
                  alignItems="center"
                >
                  {clickedFood == null ? (
                    <Grid id="noClickedFood">
                      <Grid item xs={12} sx={{ mb: 2 }}>
                        <img src="assets/planet.png" id="planet" />
                      </Grid>
                      <Grid item xs={12}>
                        음식을 클릭하면 영양성분을 확인할 수 있어요
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      xs={12}
                      style={{
                        padding: "3%",
                        height: "400px",
                      }}
                    >
                      {/* 음식명 */}
                      <Grid
                        container
                        xs={12}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid
                          item
                          xs={6}
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          섭취량 설정
                        </Grid>
                        <Grid item xs={3}>
                          <Btn
                            bgColor="#E6E8FD"
                            fontColor="black"
                            onClick={() => {
                              addMeal();
                            }}
                          >
                            식사에 추가
                          </Btn>
                        </Grid>
                        <Grid item xs={3}>
                          <Btn
                            bgColor="#D9D9D9"
                            fontColor="black"
                            onClick={() => {
                              deleteMyFood();
                            }}
                          >
                            삭제
                          </Btn>
                        </Grid>
                      </Grid>
                      {/* 음식 양 */}
                      <Grid item xs={12}>
                        <ListItemText
                          primary={clickedFood.name}
                          secondary={`${clickedFood.calorie}kcal, ${clickedFood.servingSize}${clickedFood.servingUnit}, (1회 제공량)`}
                        />
                        <FormControl
                          sx={{ m: 1, width: "25ch" }}
                          variant="outlined"
                        >
                          <OutlinedInput
                            id="outlined-adornment-weight"
                            defaultValue={clickedFood.servingSize}
                            onChange={(e) => {
                              changeClickedFood(e);
                            }}
                            inputRef={intakeFoodInput}
                            endAdornment={
                              <InputAdornment position="end">
                                {clickedFood.servingUnit}
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FoodInfoChart></FoodInfoChart>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ color: "#666666", fontSize: "12px" }}
                      >
                        * (%)하루 권장섭취량에 대한 비율
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 정보 직접 입력 버튼 */}
            <Grid container xs={12} justifyContent="center">
              <Grid item xs={4}>
                <BtnMain
                  width="100%"
                  onClick={() => {
                    setFoodModalOpen(true);
                  }}
                >
                  음식 정보 직접 입력
                </BtnMain>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 내식단 탭 내용*/}
        <TabPanel value={value} index={2}>
          <Grid container direction="row" alignItems="center">
            {/* 음식 선택 영역: 왼쪽 */}
            <Grid item xs={6}>
              <StyledWrapper>
                <Grid container xs={12} id="container" elevation={0}>
                  <List
                    sx={{ width: "100%" }}
                    subheader={
                      <ListSubheader
                        sx={{ fontWeight: "bold", fontSize: "18px" }}
                        component="div"
                        id="nested-list-subheader"
                      >
                        내 식단
                      </ListSubheader>
                    }
                  >
                    {myDiet.map(function (diet, i) {
                      return (
                        <>
                          <ListItemButton
                            key={i}
                            onClick={() => {
                              myDietClick(i);
                            }}
                          >
                            <ListItemText primary={diet.dietName} id={i} />
                          </ListItemButton>
                        </>
                      );
                    })}
                  </List>
                </Grid>
              </StyledWrapper>
            </Grid>
            {/* 음식 선택 영역: 오른쪽 */}
            <Grid item xs={6}>
              <StyledWrapper>
                <Grid
                  container
                  id="container"
                  justifyContent="center"
                  alignItems="center"
                >
                  {clickedDiet == null ? (
                    <Grid id="noClickedFood">
                      <Grid item xs={12} sx={{ mb: 2 }}>
                        <img src="assets/planet.png" id="planet" />
                      </Grid>
                      <Grid item xs={12}>
                        식단을 클릭하면 정보를 확인할 수 있어요
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      xs={12}
                      style={{
                        padding: "3%",
                      }}
                    >
                      {/* 음식명 */}
                      <Grid container xs={12}>
                        <Grid
                          item
                          xs={6}
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {clickedDiet.dietName}
                        </Grid>
                        <Grid item xs={3}>
                          <Btn
                            bgColor="#E6E8FD"
                            fontColor="black"
                            onClick={() => {
                              addDietToMeal();
                            }}
                          >
                            식사에 추가
                          </Btn>
                        </Grid>
                        <Grid item xs={3}>
                          <Btn
                            bgColor="#D9D9D9"
                            fontColor="black"
                            onClick={() => {
                              deleteDiet();
                            }}
                          >
                            식단 삭제
                          </Btn>
                        </Grid>
                      </Grid>
                      {/* 음식 양 */}
                      <Grid container xs={12}>
                        {clickedDiet.dietInfosList.map(function (food, i) {
                          return (
                            <>
                              <Grid item xs={12}>
                                <ListItemText
                                  primary={food.name}
                                  secondary={`(${
                                    food.servingSize * food.amount
                                  }${food.servingUnit}, ${
                                    food.calorie * food.amount
                                  }kcal)`}
                                  id={i}
                                />
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                      <Grid item xs={12}>
                        <DietInfoChart></DietInfoChart>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ color: "#666666", fontSize: "12px" }}
                      >
                        * (%)하루 권장섭취량에 대한 비율
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </StyledWrapper>
            </Grid>
          </Grid>
        </TabPanel>
      </Dialog>
    </div>
  );
}

const StyledWrapper = styled.div`
  && #container {
    background-color: white;
    margin: 1vw;
    border: 2px solid #e6e8fd;
    border-radius: 15px;
    width: 95%;
    height: 400px;
    overflow: auto;
    scrollbar-width: thin;
  }
  && #container::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 100px;
  }

  /* 스크롤바 뒷 배경 */
  && #container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 100px;
  }

  /* 스크롤바 막대 */
  && #container::-webkit-scrollbar-thumb {
    background-color: #bababa;
    border-radius: 100px;
  }

  && #noClickedFood {
    font-weight: bold;
    text-align: center;
  }

  && #planet:hover {
    transform: scale(1.1);
  }
`;
