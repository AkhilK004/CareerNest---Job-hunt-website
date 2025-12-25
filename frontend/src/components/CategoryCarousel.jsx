import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { setSearchText } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Engineer",
    "Data Science",
    "Graphic Designer",
    "UI Developer",
    "Wordpress Developer",
]

export function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className='bg-white py-8 md:py-16 overflow-x-hidden'>
            <Carousel className="w-full max-w-4xl mx-auto px-4 md:px-0">
                <CarouselContent>
                    {category.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/3">
                            <div className="p-2">
                                <Button onClick={() => {
                                    dispatch(setSearchText(item));
                                    navigate("/browse");
                                }} variant="outline" className="rounded-lg border-[#E2E8F0] text-[#0F172A] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all w-full min-h-[48px] text-sm md:text-base">{item}</Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='border-[#E2E8F0] hover:border-[#3B82F6] min-h-[48px] min-w-[48px] hidden md:flex' />
                <CarouselNext className='border-[#E2E8F0] hover:border-[#3B82F6] min-h-[48px] min-w-[48px] hidden md:flex' />
            </Carousel>
        </div>
    )
}
