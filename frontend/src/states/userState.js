/*
recoil userState
유저 정보
필요한 곳에 useRecoilValue로 꺼내쓰거나, useRecoilState로 조작
@author 전상현
@since 2022.09.28
*/

import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    // accessToken: localStorage.getItem("accessToken"),
    // refreshToken: localStorage.getItem("refreshToken"),
    // accessTokenExpiration: localStorage.getItem("accessTokenExpiration"),
    // refreshTokenExpiration: localStorage.getItem("refreshTokenExpiration"),
    // userId: localStorage.getItem("userId"),
    // name: localStorage.getItem("name"),
    // 로컬에서 확인해보고 싶을 때, 특정 id와 name 넣어보기
    userId: "25",
    name: "예원",
    birthYear: localStorage.getItem("birthYear"),
    gender: localStorage.getItem("gender"),
    age: "",
    email: "",
    height: 0.0,
    weight: 0.0,
    active: 0.0,
    bmi: 0.0,
    categories: [],
  },
});

// export const myDiet = selector({
//   key:'diet',
//   get: async({get}) => {
//     // const response = await http.get(`/my-diets/${userId}`)
//     const response = await http.get('/my-diets/9')
//     return response.data
//   }
// })

// export const myHistory = selector({
//   key:'history',
//   get: async({get}) => {
//     // const response = await http.get(`/intake-histories/${userId}/${date}`)
//     const response = await http.get('/intake-histories/9/2022-09-30')
//     return response.data
//   }
// })
