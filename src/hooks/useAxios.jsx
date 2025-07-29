import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://management-server-zeta.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;