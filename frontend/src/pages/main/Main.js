/*
메인(식사기록)페이지
@author 여예원
@since 2022.09.22
*/

import * as React from "react";
import Calendar from "./Calendar";
import RegistMeal from "./RegistMeal";
import { Grid, Item } from "@mui/material";
import { useState } from "react";
import DailyMeal from "./DailyMeal";
import "./Main.css";
import { useRef } from "react";
import { http } from "api/http";
import { userState } from "states/userState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

function Main() {
  const userInfo = useRecoilValue(userState);

  const [isChange, setIsChange] = useState(false);

  // 오늘 날짜 구하기
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const today = year + "-" + month + "-" + day;

  const [clickDate, setClickDate] = useState(today); // 딜력에서 선택된 날짜
  const [recIntakeAmount, setRecIntakeAmount] = useState(null); //권장 섭취량

  const [goodDays, setGoodDays] = useState([]); // 플래닛 지수 좋음
  const [normalDays, setNormalDays] = useState([]); // 플래닛 지수 보통
  const [badDays, setBadDays] = useState([]); // 플래닛 지수 나쁨

  const [clickDateMeal, setClickDateMeal] = useState([]); // 선택된 날짜 식사기록
  const [clickDateAnalysis, setClickDateAnalysis] = useState([]); //선택된 날짜 식사기록 분석

  const [breakfastAmount, setBreakfastAmount] = useState("350"); // 아침 칼로리
  const [lunchAmount, setLunchAmount] = useState("200"); // 점심 칼로리
  const [dinnerAmount, setDinnerAmount] = useState("500"); // 저녁 칼로리
  const [snackAmount, setsnackAmount] = useState("100"); // 간식 칼로리

  // 맨 처음 유저 권장섭취량 state 저장
  async function getRecIntakeAmount() {
    console.log("getRec");
    const response = await http.get(
      `/user-infos/rec-intake/${userInfo.userId}/${clickDate}`
    );
    if (response.data.message == "success") {
      setRecIntakeAmount(response.data.data);
    }
  }

  // 맨 처음 식사 기록 가져오는 함수(플래닛 지수)
  async function getIntakeRecords() {
    console.log("getRecs");
    const response = await http.get(`/analysis/all`, {
      params: {
        userId: userInfo.userId,
      },
    });
    if (response.data.message == "success") {
      console.log(response.data.data);
      let records = response.data.data;
      let goods = [];
      let bads = [];
      let normals = [];
      for (let i = 0; i < records.length; i++) {
        if (records[i].analysisType == 0) {
          let score = records[i].analysisScore;
          if (score == "나쁨") {
            let index = bads.indexOf(records[i].date);
            if (index == -1) {
              bads.push(records[i].date);
            }
          } else if (score == "보통") {
            let index = normals.indexOf(records[i].date);
            if (index == -1) {
              normals.push(records[i].date);
            }
          } else {
            let index = goods.indexOf(records[i].date);
            if (index == -1) {
              goods.push(records[i].date);
            }
          }
        } else {
          continue;
        }
      }
      setGoodDays(goods);
      setBadDays(bads);
      setNormalDays(normals);
    }
  }

  // 날짜 클릭시 해당 날짜 식사 기록 가져오는 함수
  async function getClickDayRecord() {
    const response = await http.get(
      `/intake-histories/${userInfo.userId}/${clickDate}`
    );
    if (response.data.message == "success") {
      setClickDateMeal(response.data.data);
    } else {
      setClickDateMeal([]);
    }
  }

  // 날짜 클릭시 해당 날짜 식사 기록 분석 가져오는 함수
  async function getClickDayAnalysis() {
    const response = await http.get(`/analysis/${clickDate}`, {
      params: {
        userId: userInfo.userId,
      },
    });
    if (response.data.message == "success") {
      setClickDateAnalysis(response.data.data);
    }
  }

  const mounted1 = useRef(false);
  useEffect(() => {
    if (!mounted1.current) {
      mounted1.current = true;
    } else {
      getRecIntakeAmount();
      getClickDayRecord();
      getClickDayAnalysis();
      getIntakeRecords();
    }
  }, [clickDate]);

  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) {
      mounted2.current = true;
    } else {
      getClickDayRecord();
      getClickDayAnalysis();
      getIntakeRecords();
    }
  }, [isChange]);

  const mounted3 = useRef(false);
  useEffect(() => {
    if (!mounted3.current) {
      mounted3.current = true;
    } else {
      getRecIntakeAmount();
      getClickDayRecord();
      getClickDayAnalysis();
      getIntakeRecords();
    }
  }, []);

  return (
    <div>
      <div id="wrap">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ padding: "0px" }}
        >
          {/* 왼쪽 영역 */}
          <Grid
            item
            style={{
              textAlign: "center",
              justifyContent: "center",
            }}
            xs={12}
            md={6}
          >
            <Calendar
              clickDate={clickDate}
              setClickDate={setClickDate}
              goodDays={goodDays}
              normalDays={normalDays}
              badDays={badDays}
            ></Calendar>
          </Grid>
          <Grid item style={{ textAlign: "center" }} xs={12} md={6}>
            {/* 우측 영역 */}
            <Grid style={{ margin: "auto" }}>
              <RegistMeal
                clickDate={clickDate}
                breakfastAmount={breakfastAmount}
                setBreakfastAmount={setBreakfastAmount}
                lunchAmount={lunchAmount}
                setLunchfastAmount={setLunchAmount}
                dinnerAmount={dinnerAmount}
                setDinnerAmount={setDinnerAmount}
                snackAmount={snackAmount}
                setsnackAmount={setsnackAmount}
                recIntakeAmount={recIntakeAmount}
                isChange={isChange}
                setIsChange={setIsChange}
              ></RegistMeal>
              <DailyMeal
                clickDate={clickDate}
                clickDateMeal={clickDateMeal}
                recIntakeAmount={recIntakeAmount}
                isChange={isChange}
              ></DailyMeal>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Main;

/*
메인에서 관리하는 정보 : 클릭 날짜 , 식사기록 데이터
Calendar: 클릭날짜, 클릭셑함수, 평가별 날짜배열 (좋음, 보통, 나쁨)
RegistMeal : 클릭 날짜, 식사기록 데이터 중 아/점/저/간 섭취 칼로리 양
DailyMeal : 식사기록 데이터 전부
*/
