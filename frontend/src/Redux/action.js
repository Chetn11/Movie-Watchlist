import { type } from "@testing-library/user-event/dist/type";
import { DELETE_DATA_ERROR, DELETE_DATA_LOADING, DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS, POST_DATA_ERROR, POST_DATA_LOADING, POST_DATA_SUCCESS } from "./actionType"
import axios from "axios";

const baseUrl="https://movie-watchlist-lake.vercel.app/movies";

export const getData=()=>async(dispatch)=>{
    try {
        dispatch({type:GET_DATA_LOADING})
        const response=await axios.get(baseUrl);
        dispatch({type:GET_DATA_SUCCESS,payload:response.data.data})
    } catch (error) {
        dispatch({type:GET_DATA_ERROR})
    }
}