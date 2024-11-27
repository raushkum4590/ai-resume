import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: "https://resume-edit.onrender.com/api/", // Ensure Strapi is running on this URL
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

// Create a new resume entry
const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

// Get a user's resume by their email
const GetUserResume = (userEmail) => axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

// Update a specific resume entry by its ID
const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);

const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);

const DeleteResumeByID = (id) => axiosClient.delete(`/user-resumes/${id}`);





export default {
    CreateNewResume,
    GetUserResume,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeByID
};
