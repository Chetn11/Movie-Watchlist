import { type } from "@testing-library/user-event/dist/type";
import { DELETE_DATA_ERROR, DELETE_DATA_LOADING, DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS, POST_DATA_ERROR, POST_DATA_LOADING, POST_DATA_SUCCESS } from "./actionType"
import axios from "axios";

const baseUrl="https://movie-watchlist-lake.vercel.app/movies";

//fetching data
export const getData=()=>async(dispatch)=>{
    try {
        dispatch({type:GET_DATA_LOADING})
        const response=await axios.get(baseUrl);
        dispatch({type:GET_DATA_SUCCESS,payload:response.data.data})
    } catch (error) {
        dispatch({type:GET_DATA_ERROR})
    }
}

// add Data
export const postData=(payload)=>async(dispatch)=>{
    try {
        dispatch({type:POST_DATA_LOADING})
        const post_data=await axios.post(`${baseUrl}/add`,payload);
        dispatch({type:POST_DATA_SUCCESS})
    } catch (error) {
        dispatch({type:POST_DATA_ERROR})
    }
}

// change status
export const toggleData=(id,status)=>async(dispatch)=>{
    try {
        await axios.patch(`${baseUrl}/edit/${id}`,{status:!status})
    } catch (error) {
        console.log(error);
    }
}

// delete data
export const deleteData=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_DATA_LOADING})
        await axios.delete(`${baseUrl}/delete/${id}`)
        dispatch({type:DELETE_DATA_SUCCESS})
    } catch (error) {
        dispatch({type:DELETE_DATA_ERROR})
    }
}

// update data 
export const updateData=(id,payload)=>async(dispatch)=>{
    try {
        await axios.patch(`${baseUrl}/edit/${id}`,payload)
    } catch (error) {
        
    }
}