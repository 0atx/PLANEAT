/*
영양제 검색 페이지 > 성분으로 검색
@author 전상현
@since 2022.09.19
*/
import React from "react";
import TagNute from "components/common/TagNute";
import { Grid } from "@mui/material";
import {Link} from 'react-router-dom';

function SearchByNutrient() {

  const nuterientTags = [
    {
      id: "1",
      title: "오메가3",
    },
    {
      id: "2",
      title: "프로바이오틱스",
    },
    {
      id: "3",
      title: "비타민C",
    },
    {
      id: "4",
      title: "가르시니아캄보지아",
    },
    {
      id: "5",
      title: "레시틴",
    },
    {
      id: "6",
      title: "코엔자임Q10",
    },
    {
      id: "7",
      title: "비타민B1",
    },
    {
      id: "8",
      title: "비타민A",
    },
    {
      id: "9",
      title: "칼슘",
    },
    {
      id: "10",
      title: "루테인",
    },
    {
      id: "11",
      title: "바나나잎 추출물",
    },
    {
      id: "12",
      title: "비타민D",
    },
    {
      id: "13",
      title: "글루코사민",
    },
    {
      id: "14",
      title: "옥타코사놀",
    },
    {
      id: "15",
      title: "쏘팔메토",
    },
    {
      id: "16",
      title: "비타민B6",
    },
    {
      id: "17",
      title: "셀레늄",
    },
    {
      id: "18",
      title: "폴리코사놀",
    },
    {
      id: "19",
      title: "엽산",
    },
    {
      id: "20",
      title: "공액리놀레산",
    },
    {
      id: "21",
      title: "비타민K",
    },
    {
      id: "22",
      title: "글라브리딘",
    },
    {
      id: "23",
      title: "크롬",
    },
    {
      id: "24",
      title: "녹차추출물",
    },
    {
      id: "25",
      title: "비타민E",
    },
  ];

  return (
      <div>
        <Grid container>
          <Grid item xs={2}>

          </Grid>
          <Grid item xs={8}>
            <Grid container>
              {nuterientTags.map((data, i) => (  
                // <Link to="/search/result" style={{textDecoration:'none'}}>           
                  <TagNute
                  key={i}
                  tag={data.title}
                />
                // </Link>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>
      </div>
  );
}

export default SearchByNutrient;