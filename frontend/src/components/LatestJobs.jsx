import React, { useState } from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    return (
        <div className='max-w-7xl mx-auto my-24 px-8'>
            <h1 className='text-4xl font-bold text-[#0F172A] mb-2'><span className='text-[#3B82F6]'>Latest and Top</span> Job Openings</h1>
            <p className='text-[#64748B] mb-8 text-lg'>Discover the most exciting opportunities from top companies</p>
            <div className='grid grid-cols-3 gap-6'>
                {
                    allJobs && allJobs?.slice(0,6).map(job => <Link key={job._id} to={`/description/${job?._id}`}><LatestJobCard job={job}/></Link> )
                }
            </div>
        </div>
    )
}

export default LatestJobs