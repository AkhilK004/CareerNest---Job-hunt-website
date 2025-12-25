import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, } from '../ui/radio-group'
import api from '@/lib/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Singup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, authUser } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    } 
    try {
      dispatch(setLoading(true));
      const res = await api.post("/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (authUser?.role === 'recruiter') {
      navigate("/admin/companies");
    } else if (authUser?.role === 'student') {
      navigate("/");
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto overflow-x-hidden'>
        <form onSubmit={submitHandler} className='w-full md:w-1/2 border border-[#E2E8F0] rounded-lg p-6 md:p-4 my-6 md:my-10 mx-4 md:mx-0'>
          <h1 className='font-bold text-xl md:text-2xl mb-6 md:mb-4'>Sign Up</h1>
          <div className='my-4 md:my-2'>
            <Label className='text-base'>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="patel"
              className='min-h-[48px] text-base'
              style={{ fontSize: '16px' }}
            />
          </div>
          <div className='my-4 md:my-2'>
            <Label className='text-base'>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
              className='min-h-[48px] text-base'
              style={{ fontSize: '16px' }}
            />
          </div>
          <div className='my-4 md:my-2'>
            <Label className='text-base'>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+918080808080"
              className='min-h-[48px] text-base'
              style={{ fontSize: '16px' }}
            />
          </div>
          <div className='my-4 md:my-2'>
            <Label className='text-base'>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
              className='min-h-[48px] text-base'
              style={{ fontSize: '16px' }}
            />
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <RadioGroup className="flex flex-col md:flex-row items-start md:items-center gap-4 my-5">
              <div className="flex items-center space-x-2 min-h-[48px]">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer min-w-[20px] min-h-[20px]"
                />
                <Label htmlFor="r1" className='text-base cursor-pointer'>Students</Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[48px]">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer min-w-[20px] min-h-[20px]"
                />
                <Label htmlFor="r2" className='text-base cursor-pointer'>Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <Label className='text-base'>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer min-h-[48px] text-base"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>
          {
            loading ? (
              <Button className='w-full my-4 min-h-[48px]'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button type='submit' className='w-full my-4 min-h-[48px]'>Sign Up</Button>
            )
          }
          <span className='text-sm md:text-base block text-center mt-4'>Already have an account? <Link to={"/login"} className='text-[#3B82F6] cursor-pointer underline'>Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default Singup