import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCard = ({job}) => {
    return (
        <div className='p-4 md:p-6 rounded-lg bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-l-4 hover:border-l-[#3B82F6] transition-all duration-200 cursor-pointer min-h-[48px]'>
            <div className='mb-3 md:mb-4'>
                <h1 className='font-semibold text-base md:text-lg text-[#0F172A]'>{job?.company?.name}</h1>
                <p className='text-xs md:text-sm text-[#64748B] mt-1'>India</p>
            </div>
            <div className='mb-3 md:mb-4'>
                <h1 className='font-bold text-lg md:text-xl text-[#0F172A] mb-2'>{job?.title}</h1>
                <p className='text-xs md:text-sm text-[#64748B] line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
                <Badge className={'text-[#3B82F6] bg-[#EFF6FF] font-medium border-0 text-xs'} variant={'outline'}>{job?.position} Positions</Badge>
                <Badge className={'text-[#64748B] bg-[#F1F5F9] font-medium border-0 text-xs'} variant={'outline'}>{job?.jobType}</Badge>
                <Badge className={'text-[#0F172A] bg-[#F8FAFC] font-medium border-0 text-xs'} variant={'outline'}>{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard