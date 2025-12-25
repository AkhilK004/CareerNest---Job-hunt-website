import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-white py-12 md:py-24 overflow-x-hidden'>
            <div className='flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto px-4 md:px-8'>
                <div className='text-center mx-auto'>
                    <div className="text-[#3B82F6] px-4 md:px-6 py-2 rounded-full bg-[#EFF6FF] font-medium text-xs md:text-sm" >No. 1 Job Hunt Website</div>
                </div>
                <div>
                    <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight'>Search, Apply & <br className='hidden md:block' /> Get Your <span className='text-[#3B82F6]'>Dream Jobs</span></h1>
                </div>
                <div>
                    <p className='text-[#64748B] text-base md:text-lg leading-relaxed px-2'>Connect with top companies and discover opportunities that match your skills.<br className='hidden md:block' /> Your next career move starts here.</p>
                </div>
                <div className='flex flex-col md:flex-row w-full max-w-2xl shadow-sm border border-[#E2E8F0] pl-4 md:pl-6 pr-2 py-2 md:py-2 rounded-lg items-center gap-2 md:gap-4 mx-auto bg-white hover:shadow-md transition-shadow'>
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="outline-none border-none w-full text-[#0F172A] placeholder:text-[#64748B] text-base md:text-sm"
                        style={{ fontSize: '16px' }}
                    />
                    <Button onClick={searchJobHandler} className='w-full md:w-auto rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 min-h-[48px]'>
                        <Search className='h-5 w-5 mr-2' />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection