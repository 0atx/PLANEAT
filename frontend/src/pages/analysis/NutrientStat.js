/*
내 영양 분석 페이지 > 플래닛 지수 및 영양제 섭취 스탯
@author 조혜안
@since 2022.09.22
*/
import { Paper, Grid } from "@mui/material";
import { useEffect } from "react";
import Chart from "react-apexcharts";

// 유저가 등록한 영양제
const userNutrientInfo = [
  {
    nutrient_name: "광동 마그네슘",
    intake_reco: "2",
    user_nutrient_info: [
      {
        intake_date: "220908",
        real_reco: "2",
      },
      {
        intake_date: "220909",
        real_reco: "2",
      },
      {
        intake_date: "220910",
        real_reco: "2",
      },
      {
        intake_date: "220911",
        real_reco: "2",
      },
    ],
  },
  {
    nutrient_name: "큰상인 홍삼정 스틱",
    intake_reco: "1",
    user_nutrient_info: [
      {
        intake_date: "220908",
        real_reco: "2",
      },
      {
        intake_date: "220909",
        real_reco: "2",
      },
      {
        intake_date: "220910",
        real_reco: "2",
      },
    ],
  },
  {
    nutrient_name: "데일리코어 비타민C",
    intake_reco: "2",
    user_nutrient_info: [
      {
        intake_date: "220908",
        real_reco: "2",
      },
      {
        intake_date: "220909",
        real_reco: "2",
      },
      {
        intake_date: "220910",
        real_reco: "2",
      },
    ],
  },
];

// for (let i = 0; i < userNutrientInfo.length; i++) {}

// 영양제 섭취 차트
function ShowNutrientCharts({ nutrientName, realReco }) {
  const series = [
    {
      data: [realReco.length],
    },
  ];
  const options = {
    //data on the x-axis
    colors: ["#F7BF87"],
    chart: {
      height: 100,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [nutrientName],
      min: 0, // start date
      max: 7, // end date
      tickAmount: 7, // interval you want
    },
  };

  return (
    <div className="app">
      <div>
        <Chart options={options} series={series} type="bar" width="100%" height={110} />
      </div>
    </div>
  );
}

export default function NutrientStat({ value }) {
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
        <h3>영양제 분석</h3>
        {userNutrientInfo.map((data, i) => (
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
        ))}
      </div>
    </Paper>
  );
}
