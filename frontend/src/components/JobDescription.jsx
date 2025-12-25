import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import api from '@/lib/api';
import { setSingleJobById } from '@/redux/jobSlice';
import { useParams } from 'react-router-dom';
import Navbar from './shared/Navbar';

const JobDescription = () => {
  const { singleJobById } = useSelector(store => store.job);
  const { authUser } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJobById?.applications?.some(application => application.applicant === authUser?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();

  const applyJobHandler = async () => {
    try {
      const res = await api.get(`/api/v1/application/apply/${params.id}`);
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedJob = { ...singleJobById, applications: [...singleJobById.applications, { applicant: authUser._id }] };
        dispatch(setSingleJobById(updatedJob)); // Update the Redux state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await api.get(`/api/v1/job/${params.id}`);
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === authUser?._id)); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <div className='max-w-7xl mx-auto my-8 md:my-16 px-4 md:px-8'>
      <div className='bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-4 md:p-8 mb-6 md:mb-8'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4'>
          <div className='flex-1'>
            <h1 className='font-bold text-xl md:text-3xl text-[#0F172A] mb-4'>{singleJobById?.title}</h1>
            <div className='flex items-center gap-2 md:gap-3 flex-wrap'>
              <Badge className={'text-[#3B82F6] bg-[#EFF6FF] font-medium border-0 text-xs'} variant={'outline'}>{singleJobById?.position} Positions</Badge>
              <Badge className={'text-[#64748B] bg-[#F1F5F9] font-medium border-0 text-xs'} variant={'outline'}>{singleJobById?.jobType}</Badge>
              <Badge className={'text-[#0F172A] bg-[#F8FAFC] font-medium border-0 text-xs'} variant={'outline'}>{singleJobById?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg w-full md:w-auto px-8 min-h-[48px] ${isApplied ? "bg-[#64748B] cursor-not-allowed text-white" : "bg-[#3B82F6] hover:bg-[#2563EB] text-white"}`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
      <div className='bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-4 md:p-8'>
        <h1 className='border-b-2 pb-3 border-b-[#E2E8F0] font-semibold text-lg md:text-xl text-[#0F172A] mb-6'>Job Description</h1>
        <div className='space-y-4'>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Role:</span>
            <span className='text-[#64748B]'>{singleJobById?.title}</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Location:</span>
            <span className='text-[#64748B]'>{singleJobById?.location}</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Description:</span>
            <span className='text-[#64748B] leading-relaxed'>{singleJobById?.description}</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Experience:</span>
            <span className='text-[#64748B]'>{singleJobById?.experienceLevel}</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Salary:</span>
            <span className='text-[#64748B]'>{singleJobById?.salary} LPA</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Total Applicants:</span>
            <span className='text-[#64748B]'>{singleJobById?.applications?.length}</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-start gap-2'>
            <span className='font-semibold text-[#0F172A] md:min-w-[120px]'>Posted Date:</span>
            <span className='text-[#64748B]'>{singleJobById?.createdAt.split("T")[0]}</span>
          </div>
        </div>
      </div>
      <div>
        {/* <ApplyJobDialog open={open} setOpen={setOpen} /> */}
      </div>
      </div>
    </div>
  );
}

export default JobDescription;
