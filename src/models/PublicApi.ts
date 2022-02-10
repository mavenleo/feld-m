import axios from "axios";
import {ApiResponse, CategoryResponse} from "@/types/types";
const API_URL = 'https://api.publicapis.org'

const PublicApi = {
     /*
     * Fetch list of public Apis
     */
    getApis: () : Promise<ApiResponse> => {
        return axios.get(`${API_URL}/entries`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    },

     /*
     * Fetch list of api categories
     */
    getApiCategories: () : Promise<CategoryResponse> => {
        return axios.get(`${API_URL}/categories`)
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    }
}

export default PublicApi;
