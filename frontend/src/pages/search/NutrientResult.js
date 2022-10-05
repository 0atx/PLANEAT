/*
영양제 검색 페이지 > 검색 결과(성분)
@author 전상현
@since 2022.09.22
*/
import React, { useState, useEffect } from "react";
import { useParams, useLocation} from 'react-router-dom'
import CardNutrient from "components/common/CardNutrient";
import { Grid } from "@mui/material";
import SideBar from "components/common/SideBar";
import {Link} from 'react-router-dom';
import { http } from "api/http";
import Pagination from "components/common/Pagination";

function NutrientResult() {

  const ingredient = useParams()
  const location = useLocation()
  const dataTitle = location.state.data.title

  const [info, setInfo] = useState([])

  useEffect(() => {
    http.get(`/nutrient/ingredient/${ingredient.id}`)
    .then(response => {
      console.log('info', response.data.data)
      setInfo(response.data.data)
    })
  }, [])

  const section = { marginTop:'80px' }
  const section1 = { marginTop:'25vh', textAlign:'center'}
  const section2 = { marginTop:'5vh', textAlign:'center'}
  const section3 = { marginTop:'10vh' }
  const card = { textAlign:'left' }
  const bold = {fontWeight:'bold'}

  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const offset = (page-1)*limit

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
      <div style={section}>
          <Grid container> 
            {/* 좌측 사이드 바 */}
            <Grid item xs={1.5} style={section1}>
              <SideBar />
            </Grid>

            <Grid item xs={10.5} style={section2}>
              <Grid container>
                <Grid item xs={3}>

                </Grid>
                {/* 상단 문구 */}
                <Grid item xs={4}>
                  <p><span style={bold}>{dataTitle}</span>을 포함한 제품을 만나보세요</p>
                </Grid>
                <Grid item xs={5}>
                  
                </Grid>
              </Grid>
              
              <div style={section3}>
                
              </div>
              
              <Grid container> 
                <Grid item xs={1}>

                </Grid>
                {/* 카드들 부분 */}
                <Grid item xs={9}>
                  <Grid container>
                    {info.slice(offset, offset+limit).map(function(data, i) {
                      return (
                        <Link to={'/searchdetail/'+info[i].nutrientId} style={{textDecoration:'none'}}>
                          <CardNutrient key={i} pill={data} />
                        </Link>
                      )})}
                  </Grid>

                  <Grid container>
                      <Grid item xs={2}>

                      </Grid>
                      <Grid item xs={6}>
                        <Pagination
                        total={info.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                      />


                      </Grid>
                      <Grid item xs={4}>
                
                      </Grid>
                    </Grid>
                    <br></br>
                </Grid>
                <Grid item xs={2}>

                </Grid>  
              </Grid>

            </Grid>
          </Grid>
      </div>
  );
}

export default NutrientResult;