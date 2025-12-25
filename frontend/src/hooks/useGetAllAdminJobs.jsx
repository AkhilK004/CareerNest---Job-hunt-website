import { setAdminJobs } from "@/redux/jobSlice";
import api from "@/lib/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await api.get('/api/v1/job/getadminjobs');
                if(res.data.success){ 
                    dispatch(setAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdminJobs();
    }, []);
}
export default useGetAllAdminJobs;