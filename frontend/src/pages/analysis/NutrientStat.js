/*
내 영양 분석 페이지 > 플래닛 지수 및 영양제 섭취 스탯
@author 조혜안
@since 2022.09.22
*/
import { Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { http } from "api/http";

import { userState } from "states/userState";
import { useRecoilValue } from "recoil";

// const userNutrientInfo = [
//   {
//     nutrient_name: "광동 마그네슘",
//     intake_reco: "2",
//     user_nutrient_info: [
//       {
//         intake_date: "220908",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220909",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220910",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220911",
//         real_reco: "2",
//       },
//     ],
//   },
//   {
//     nutrient_name: "큰상인 홍삼정 스틱",
//     intake_reco: "1",
//     user_nutrient_info: [
//       {
//         intake_date: "220908",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220909",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220910",
//         real_reco: "2",
//       },
//     ],
//   },
//   {
//     nutrient_name: "데일리코어 비타민C",
//     intake_reco: "2",
//     user_nutrient_info: [
//       {
//         intake_date: "220908",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220909",
//         real_reco: "2",
//       },
//       {
//         intake_date: "220910",
//         real_reco: "2",
//       },
//     ],
//   },
// ];

// for (let i = 0; i < userNutrientInfo.length; i++) {}

// 영양제 섭취 차트
function ShowNutrientCharts({ nameDatas, perDatas }) {
  const series = [
    {
      data: perDatas,
    },
  ];
  const options = {
    //data on the x-axis
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        barHeight: "70%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: ["#FFB3B3", "#F7BF87", "#FFEFC9", "#A9D5C7", "#9DA6F8"],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return val + "%";
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: nameDatas,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: function (val) {
          return Math.abs(Math.round(val)) + "%";
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="app">
      <div>
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height={100 + nameDatas.length * 40}
        />
      </div>
    </div>
  );
}

export default function NutrientStat({ value, nameDatas, perDatas }) {
  // userState 유저 정보
  const userInfo = useRecoilValue(userState);

  useEffect(() => {}, []);

  return (
    <Paper
      elevation={3}
      sx={{
        borderWidth: "3px",
        borderColor: "orange.main",
        color: "#747373",
        overflow: "auto",
      }}
    >
      {/* 최근 7일이면 0, 최근 30일이면 1, 전체 기간이면 2 */}
      {/* {value} */}
      <div style={{ margin: 20 }}>
        {/* 영양제 분석 차트 */}
        <h3>영양제 섭취 비율</h3>
        {/* {JSON.stringify(userNutrientInfo)} */}
        {nameDatas.length == 0 ? (
          <div style={{ lineHeight: "2", textAlign: "center" }}>
            섭취하고 있는 영양제가 없어요.
            <br />
            마이페이지에서 영양제를 등록해주세요!😊
          </div>
        ) : (
          <div>
            <ShowNutrientCharts nameDatas={nameDatas} perDatas={perDatas}></ShowNutrientCharts>
          </div>
        )}

        {/* {userNutrientInfo.map((data, i) => (
          <div>
            <ShowNutrientCharts
              nutrientName={data.nutrient_name}
              realReco={data.user_nutrient_info}
            ></ShowNutrientCharts>
            <p style={{ marginLeft: "3px", marginBottom: "0px", marginTop: "0px" }}>
              <b style={{ color: "#F7BF87" }}>{data.nutrient_name}</b>을 ~~일 중에{" "}
              <b style={{ color: "#F7BF87" }}>{data.user_nutrient_info.length}</b> 일 섭취했어요.
            </p>
          </div>
        ))} */}
      </div>
    </Paper>
  );
}
