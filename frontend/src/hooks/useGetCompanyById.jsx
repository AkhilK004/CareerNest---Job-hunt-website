import { setSingleCompany } from "@/redux/companySlice";
import api from "@/lib/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanyDetails = async () => {
            try {
                const res = await api.get(`/api/v1/company/getcompany/${id}`);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log("Error occured while fetching company details",error);
            }
        };
        fetchCompanyDetails();
    },[id,dispatch])
};
export default useGetCompanyById;