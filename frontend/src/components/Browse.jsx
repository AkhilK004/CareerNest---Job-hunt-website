import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchText } from '@/redux/jobSlice';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
    }
  }, [])
  return (
    <div className='bg-[#FAFAFA] min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto py-12 px-8'>
        <h1 className='font-bold text-2xl text-[#0F172A] mb-2'>Search Results</h1>
        <p className='text-[#64748B] mb-8'>{allJobs?.length || 0} jobs found</p>
        <div className='flex-1 min-h-[88vh] overflow-y-auto no-scrollbar pb-5'>
          <div className='grid grid-cols-3 gap-6'>
            {
              allJobs?.length !== 0 ? allJobs?.map((job) => {
                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                )
              }) : <div className='col-span-3 text-center py-16'><span className='text-[#64748B] text-lg'>No jobs found</span></div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse