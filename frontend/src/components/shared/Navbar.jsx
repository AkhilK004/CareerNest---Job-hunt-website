import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ProfilePopover } from '../ProfilePopover';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { authUser } = useSelector(store => store.auth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <div className='bg-white border-b border-[#E2E8F0] sticky top-0 z-50 overflow-x-hidden'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4 md:px-8'>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold text-[#0F172A]'>Career<span className='text-[#3B82F6]'>Hunt</span></h1>
                </div>
                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-12'>
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
                                <Link to="/login"><Button variant={'outline'} className='rounded-lg border-[#E2E8F0] text-[#0F172A] hover:bg-[#FAFAFA] min-h-[48px]'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg min-h-[48px]">Signup</Button></Link>
                            </div>
                        ) : (
                            <ProfilePopover />
                        )
                    }
                </div>
                
                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center gap-3'>
                    {authUser && <ProfilePopover />}
                    <Button
                        variant="ghost"
                        size="icon"
                        className='min-h-[48px] min-w-[48px]'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    </Button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden border-t border-[#E2E8F0] bg-white'>
                    <div className='flex flex-col px-4 py-4 space-y-4'>
                        {authUser && authUser.role === "recruiter" ? (
                            <>
                                <Link to={"/admin/companies"} onClick={() => setMobileMenuOpen(false)} className='text-[#64748B] hover:text-[#0F172A] transition-colors py-3 text-lg min-h-[48px] flex items-center'>Companies</Link>
                                <Link to={"/admin/jobs"} onClick={() => setMobileMenuOpen(false)} className='text-[#64748B] hover:text-[#0F172A] transition-colors py-3 text-lg min-h-[48px] flex items-center'>Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to={"/"} onClick={() => setMobileMenuOpen(false)} className='text-[#64748B] hover:text-[#0F172A] transition-colors py-3 text-lg min-h-[48px] flex items-center'>Home</Link>
                                <Link to={"/jobs"} onClick={() => setMobileMenuOpen(false)} className='text-[#64748B] hover:text-[#0F172A] transition-colors py-3 text-lg min-h-[48px] flex items-center'>Jobs</Link>
                                <Link to={"/browse"} onClick={() => setMobileMenuOpen(false)} className='text-[#64748B] hover:text-[#0F172A] transition-colors py-3 text-lg min-h-[48px] flex items-center'>Browse</Link>
                            </>
                        )}
                        {!authUser && (
                            <div className='flex flex-col gap-3 pt-4 border-t border-[#E2E8F0]'>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant={'outline'} className='w-full rounded-lg border-[#E2E8F0] text-[#0F172A] hover:bg-[#FAFAFA] min-h-[48px]'>Login</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg min-h-[48px]">Signup</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar