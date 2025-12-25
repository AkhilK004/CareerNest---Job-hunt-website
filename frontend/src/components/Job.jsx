import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ApplyJobDialog } from './ApplyJobDialog'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 3600));
    }
 
    return (
        <div className='p-8 rounded-lg bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-l-4 hover:border-l-[#3B82F6] transition-all duration-200 cursor-pointer group'>
            <div className='flex items-center justify-between mb-6'>
                <p className='text-sm text-[#64748B]'>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button size="icon" className="rounded-lg border-[#E2E8F0] hover:bg-[#FAFAFA]" variant="ghost"><Bookmark className='h-4 w-4 text-[#64748B]' /></Button>
            </div>
            <div className='flex items-center gap-4 mb-6'>
                <div className='p-3 rounded-lg border border-[#E2E8F0] bg-[#FAFAFA]'>
                    <Avatar className='h-12 w-12'>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-semibold text-lg text-[#0F172A]'>{job?.company?.name}</h1>
                    <p className='text-sm text-[#64748B]'>India</p>
                </div>
            </div>
            <div className='mb-6'>
                <h1 className='font-bold text-xl text-[#0F172A] mb-2'>{job?.title}</h1>
                <p className='text-sm text-[#64748B] line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mb-6 flex-wrap'>
                <Badge className={'text-[#3B82F6] bg-[#EFF6FF] font-medium border-0'} variant={'outline'}>{job?.position} positions</Badge>
                <Badge className={'text-[#64748B] bg-[#F1F5F9] font-medium border-0'} variant={'outline'}>{job?.jobType}</Badge>
                <Badge className={'text-[#0F172A] bg-[#F8FAFC] font-medium border-0'} variant={'outline'}>{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-3'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="rounded-lg border-[#E2E8F0] text-[#0F172A] hover:bg-[#FAFAFA] flex-1">Details</Button>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg flex-1">Save For Later</Button>
            </div>
            <div>
                <ApplyJobDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Job