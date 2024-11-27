import {create} from "zustand";
import axios from "axios";


const API_URL="http://localhost:5000/api/product";


axios.defaults.withCredentials=true;

export const proAuthStore=create((set)=>({
    product:[],
    message:null,

    getproduct: async ()=>{
        set({error:null});
        try{
            const response=await axios.get(`${API_URL}/get-product`);
            set({product:response.data.products});
        }catch(error){
            set({error: error.response?.data?.message || "Failed to fetch products" });
        }
    },


}))