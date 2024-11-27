import {create} from "zustand";
import axios from "axios";


const API_URL="http://localhost:5000/api/auth";


axios.defaults.withCredentials=true;


export const useAuthStore=create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isCheckingAuth:true,
    message:null,

    signup:async(name,role,email,password)=>{
        set({error:null});
        try{
            const response=await axios.post(`${API_URL}/signup`,{name,role,email,password});
            set({user:response.data.user,isAuthenticated:true});
        }catch(error){
            set({error:error.response.data.message||"Error in signing up"});
            throw error;
        }
    },

    login: async (email, password) => {
		set({  error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				
			});
           
          
            
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in"});
			throw error;
		}
	},

    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

    verifyEmail:async(code)=>{
        set({error:null});
        try{
            const response=await axios.post(`${API_URL}/verifyEmail`,{code});
            set({user:response.data.user,isAuthenticated:true});
            return response.data;
        }catch(error){
            set({error:error.response.data.message||"Error in verifying email"});
            throw error;
        }

    },

    forgotPassword: async (email) => {
		set({  error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message });
		} catch (error) {
			set({
				
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},

    resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message });
		} catch (error) {
			set({
			
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},

    checkAuth: async ()=>{
        set({isCheckingAuth:true,error:null});
        try{
            const response=await axios.get(`${API_URL}/checkAuth`);
            set({user:response.data.user,isAuthenticated:true});
        }catch(error){
            set({error:null,isCheckingAuth:false,isAuthenticated:false});
        }
    },
	editprofile:async(userId,name,phone,address)=>{
        set({error:null});
        try{
            const response=await axios.patch(`${API_URL}/edit-profile`,{userId,name,phone,address});
            set({user:response.data.user,isAuthenticated:true});
            
        }catch(error){
            set({error:error.response.data.message||"Error in profile update"});
            throw error;
        }
    },

   




}));


