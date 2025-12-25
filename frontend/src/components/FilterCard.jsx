import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        filterType: "Salary",
        array: ["0 - 40k", "42k to 1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    useEffect(() => {
        dispatch(setSearchText(selectedValue));
    }, [selectedValue])

    return (
        <div className='w-full bg-white p-4 md:p-3 rounded-md border border-[#E2E8F0]'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-base md:text-lg'>Filter Jobs</h1>
            </div>
            <hr className='mt-3 border-[#E2E8F0]' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {filterData.map((data, index) => (
                    <div key={index} className='mt-4'>
                        <h1 className='font-medium text-base md:text-lg mb-3'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`; // Ensure unique id for each radio button
                            return (
                                <div key={idx} className="flex items-center space-x-2 my-3 min-h-[48px]">
                                    <RadioGroupItem value={item} id={itemId} className='min-w-[20px] min-h-[20px]' />
                                    <Label htmlFor={itemId} className='text-sm md:text-base cursor-pointer'>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
