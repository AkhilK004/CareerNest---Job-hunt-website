import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ProfilePopover } from '../ProfilePopover';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { authUser } = useSelector(store => store.auth);
    return (
        <div className='bg-white border-b border-[#E2E8F0] sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-8'>
                <div>
                    <h1 className='text-2xl font-bold text-[#0F172A]'>Career<span className='text-[#3B82F6]'>Hunt</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-8'>
                        {
                            authUser && authUser.role === "recruiter" ? (
                                <>
                                    <li className='text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li className='text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer'><Link to={"/"}>Home</Link></li>
                                    <li className='text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                                    <li className='text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !authUser ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button variant={'outline'} className='rounded-lg border-[#E2E8F0] text-[#0F172A] hover:bg-[#FAFAFA]'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg">Signup</Button></Link>
                            </div>
                        ) : (
                            <ProfilePopover />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar