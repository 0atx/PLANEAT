/*
메인 페이지
@author 전상현
@since 2022.09.15
*/

import React, { useState } from 'react';
import './Home.css'
import Grid from '@mui/material/Grid';
import { Card, Button } from '@mui/material';
import BtnMain from 'components/common/BtnMain';
import SimpleTestModal from 'components/modal/home/SimpleTestModal';
import Google from './Google';
import GoogleLogin from 'react-google-login';


function Home() {
  const monitordiv = { width:'35vw', height:'45vh', marginTop:'20vh'}
  const logo = { width:'30vw', height:'12.5vh' , marginTop:'20vh'}
  const card = { height:'50vh', backgroundColor:'transparent', fontSize:'1.5vw', color:'white'}
  const textcard = { height:'50vh', backgroundColor:'transparent', border:'none'}
  const button = { width:'5vw', height:'5vw'}
  const chip = { marginLeft: '20%'}

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => { setModalOpen(true);};
  const closeModal = () => {setModalOpen(false);};

  
  const responseGoogle=(response)=>{
    console.log('응답', response);
    console.log('프로필', response.profileObj);
  }

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

  return (
    <div className='bgColor'>
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={2}>

            </Grid>
          
            <Grid item xs={8}>
              <img src='assets/monitor.png' alt='' style={monitordiv}/>    
            </Grid>

            <Grid item xs={2}>

            </Grid>
          </Grid>
        </Grid>
  

          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={1}>
              
              </Grid>

              <Grid item xs={7}>
                <img src="assets/longlogo.png" alt='' style={logo}/>
              </Grid>

              <Grid item xs={4}>

              </Grid>

                  <div href="#" className='login'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                    {/* <KakaoLogin /> */}
                    {/* <svg width="83" height="84" viewBox="0 0 83 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={button}>
                      <circle cx="41.2258" cy="41.8589" r="41.2258" fill="#EDF10A"/>
                      <path d="M41.1693 21.876C54.0086 21.876 64.4168 29.9882 64.4168 39.9979C64.4168 50.0054 54.0086 58.1177 41.1693 58.1177C39.8909 58.1184 38.6137 58.037 37.3457 57.8741L27.5862 64.2572C26.4769 64.8439 26.0851 64.7797 26.5412 63.3428L28.5161 55.1996C22.1396 51.9671 17.9219 46.3655 17.9219 39.9979C17.9219 29.9905 28.3301 21.876 41.1693 21.876ZM54.2477 39.7212L57.5024 36.5684C57.6902 36.3733 57.7949 36.113 57.7946 35.8423C57.7943 35.5715 57.6889 35.3115 57.5006 35.1169C57.3123 34.9223 57.0559 34.8084 56.7853 34.7991C56.5147 34.7899 56.2511 34.886 56.0499 35.0673L51.7813 39.1987V35.7846C51.7813 35.5074 51.6712 35.2416 51.4752 35.0457C51.2792 34.8497 51.0134 34.7396 50.7362 34.7396C50.4591 34.7396 50.1933 34.8497 49.9973 35.0457C49.8013 35.2416 49.6912 35.5074 49.6912 35.7846V41.4459C49.652 41.6074 49.652 41.7759 49.6912 41.9374V45.1234C49.6912 45.4006 49.8013 45.6664 49.9973 45.8624C50.1933 46.0584 50.4591 46.1685 50.7362 46.1685C51.0134 46.1685 51.2792 46.0584 51.4752 45.8624C51.6712 45.6664 51.7813 45.4006 51.7813 45.1234V42.1057L52.7267 41.1913L55.8883 45.6925C55.9673 45.8048 56.0676 45.9006 56.1835 45.9742C56.2994 46.0478 56.4287 46.0978 56.564 46.1215C56.6993 46.1451 56.8379 46.1419 56.9719 46.112C57.106 46.082 57.2328 46.026 57.3452 45.9471C57.4575 45.8681 57.5533 45.7678 57.6269 45.6519C57.7005 45.536 57.7505 45.4067 57.7742 45.2714C57.7978 45.1361 57.7946 44.9975 57.7647 44.8635C57.7347 44.7294 57.6787 44.6026 57.5998 44.4902L54.2477 39.719V39.7212ZM47.6986 43.981H44.4661V35.8178C44.4537 35.5493 44.3383 35.2958 44.1439 35.1101C43.9495 34.9245 43.691 34.8209 43.4221 34.8209C43.1533 34.8209 42.8948 34.9245 42.7004 35.1101C42.506 35.2958 42.3906 35.5493 42.3782 35.8178V45.026C42.3782 45.6017 42.8432 46.0711 43.421 46.0711H47.6986C47.9757 46.0711 48.2415 45.961 48.4375 45.765C48.6335 45.569 48.7436 45.3032 48.7436 45.026C48.7436 44.7489 48.6335 44.4831 48.4375 44.2871C48.2415 44.0911 47.9757 43.981 47.6986 43.981ZM34.7309 41.5633L36.2719 37.7839L37.6844 41.5633H34.7309ZM40.3169 42.6437L40.3214 42.6083C40.3208 42.345 40.2203 42.0918 40.0402 41.8998L37.7243 35.7005C37.6272 35.405 37.4423 35.1463 37.1942 34.9588C36.9462 34.7712 36.6468 34.6639 36.3361 34.651C36.0231 34.6496 35.7171 34.7436 35.4589 34.9204C35.2006 35.0972 35.0023 35.3484 34.8903 35.6407L31.2128 44.6629C31.1609 44.79 31.1345 44.926 31.1352 45.0633C31.1359 45.2005 31.1636 45.3363 31.2167 45.4628C31.2699 45.5894 31.3474 45.7042 31.4449 45.8008C31.5425 45.8974 31.6581 45.9738 31.7851 46.0257C31.9122 46.0776 32.0482 46.1039 32.1855 46.1033C32.3227 46.1026 32.4585 46.0749 32.585 46.0217C32.7116 45.9686 32.8264 45.891 32.923 45.7935C33.0195 45.696 33.096 45.5804 33.1479 45.4533L33.8785 43.6533H38.4616L39.1236 45.4246C39.1686 45.557 39.2397 45.679 39.3327 45.7834C39.4257 45.8878 39.5388 45.9725 39.6651 46.0324C39.7915 46.0923 39.9286 46.1263 40.0683 46.1323C40.208 46.1383 40.3475 46.1161 40.4785 46.0672C40.6095 46.0183 40.7293 45.9436 40.8309 45.8476C40.9326 45.7515 41.0139 45.636 41.07 45.5079C41.1262 45.3799 41.1561 45.2418 41.1579 45.102C41.1598 44.9622 41.1335 44.8234 41.0808 44.6939L40.3169 42.6437ZM32.9619 35.8289C32.9619 35.5521 32.8521 35.2866 32.6566 35.0907C32.4611 34.8948 32.1958 34.7844 31.9191 34.7839H24.7345C24.4573 34.7839 24.1915 34.894 23.9955 35.0899C23.7996 35.2859 23.6895 35.5517 23.6895 35.8289C23.6895 36.106 23.7996 36.3719 23.9955 36.5678C24.1915 36.7638 24.4573 36.8739 24.7345 36.8739H27.3028V45.1456C27.3028 45.4227 27.4129 45.6886 27.6089 45.8845C27.8048 46.0805 28.0707 46.1906 28.3478 46.1906C28.625 46.1906 28.8908 46.0805 29.0868 45.8845C29.2827 45.6886 29.3928 45.4227 29.3928 45.1456V36.8739H31.9169C32.4947 36.8739 32.9619 36.4045 32.9619 35.8289Z" fill="black"/>
                    </svg> */}
                    {/* &nbsp;&nbsp;&nbsp;
                  
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={button}>
                      <circle cx="42" cy="42.1411" r="41.2258" fill="#1BE43B"/>
                      <path d="M23.9636 25.8225V58.4596H36.5206V42.131L47.4476 58.4596H60.0247V25.8225H47.4476V42.131L36.5206 25.8225H23.9636Z" fill="white"/>
                    </svg>
                    &nbsp;&nbsp;&nbsp;
                    <svg width="83" height="84" viewBox="0 0 83 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={button}>
                      <circle cx="41.7741" cy="42.1411" r="41.2258" fill="white"/>
                      <path d="M69.5315 37.4318H67.2848V37.3143H42.1822V48.6428H57.9452C55.6456 55.2374 49.4661 59.9713 42.1822 59.9713C32.9402 59.9713 25.447 52.3628 25.447 42.9785C25.447 33.5943 32.9402 25.9858 42.1822 25.9858C46.4482 25.9858 50.3294 27.6199 53.2845 30.2892L61.1737 22.2785C56.1922 17.5644 49.5289 14.6572 42.1822 14.6572C26.7789 14.6572 14.2903 27.3381 14.2903 42.9785C14.2903 58.619 26.7789 71.2998 42.1822 71.2998C57.5854 71.2998 70.074 58.619 70.074 42.9785C70.074 41.0796 69.8816 39.226 69.5315 37.4318Z" fill="#FFC107"/>
                      <path d="M17.5061 29.7964L26.67 36.6204C29.1496 30.3869 35.1547 25.9857 42.182 25.9857C46.4481 25.9857 50.3293 27.6199 53.2844 30.2892L61.1736 22.2785C56.1921 17.5644 49.5288 14.6572 42.182 14.6572C31.4688 14.6572 22.178 20.7987 17.5061 29.7964Z" fill="#FF3D00"/>
                      <path d="M42.1823 71.2998C49.3868 71.2998 55.933 68.5003 60.8824 63.9476L52.2499 56.5303C49.4495 58.6841 45.9686 59.9713 42.1823 59.9713C34.9276 59.9713 28.7677 55.2742 26.4471 48.7192L17.3516 55.835C21.9677 65.0068 31.3421 71.2998 42.1823 71.2998Z" fill="#4CAF50"/>
                      <path d="M69.5315 37.432H67.2848V37.3145H42.1821V48.643H57.9452C56.8407 51.8107 54.8339 54.5423 52.2455 56.5319C52.2469 56.5305 52.2483 56.5305 52.2497 56.529L60.8822 63.9464C60.2714 64.51 70.074 57.1394 70.074 42.9787C70.074 41.0798 69.8815 39.2261 69.5315 37.432Z" fill="#1976D2"/>
                    </svg> */}
                    <Google />
                    {/* <GoogleLogin 
                    clientId={clientId}
                    buttonText='Login'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    /> */}
                  </div>
              
            </Grid>
            <br></br>

            <div style={chip}>
              <BtnMain onClick={openModal} width='23vw' height='5vh'>
                PLANEAT 체험하기
              </BtnMain>
              <SimpleTestModal open={modalOpen} close={closeModal} />
            </div>

          </Grid>      
        </Grid>
    
      <div className='section2'>
        <p>
          식단 기록을 통해<br></br>
          부족한 영양분을 알아보세요
        </p>
        <div className='cardsection'>
          <Grid container>
            <Grid item xs={0.9}>

            </Grid>
            <Grid item xs={4.8}>
              <Card variant="outlined" style={card}>
                식사 등록 화면
              </Card>
            </Grid>
            <Grid item xs={0.6}>

            </Grid>
            <Grid item xs={4.8}>
              <Card variant="outlined" style={card}>
                식사 영양 상세 정보 화면
              </Card>
            </Grid>
            <Grid item xs={0.9}>

            </Grid>
          </Grid>
        </div>
      </div>

      <div className='section3'>
        <Grid container>
          <Grid item xs={0.9}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={textcard}>
              <p className='p'>
                내가 필요한 영양제를<br></br>
                쉽고 빠르게 찾아보세요
              </p>
            </Card>
          </Grid>
          <Grid item xs={0.6}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={card}>
              영양제 추천 화면
            </Card>
          </Grid>
          <Grid item xs={0.9}>

          </Grid>
        </Grid>
      </div>

      <div className='section4'>
        <Grid container>
          <Grid item xs={0.9}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={card}>
              영양제 추천 화면
            </Card>
          </Grid>
          <Grid item xs={0.6}>

          </Grid>
          <Grid item xs={4.8}>
            <Card variant="outlined" style={textcard}>
              <p className='p'>
                월간 통계를 통해<br></br>
                식단을 점검해보세요
              </p>
            </Card>
          </Grid>
          <Grid item xs={0.9}>

          </Grid>
        </Grid>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}

export default Home;
