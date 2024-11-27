import React, { useContext, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const ThemeColor = () => {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FFA133", "#33A1FF", "#A1FF33", "#FF5733",
        "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFA1",
        "#FFA133", "#33A1FF", "#A1FF33", "#FF5733", "#33FF57",
        "#3357FF", "#FF33A1", "#A133FF", "#33FFA1", "#FFA133",
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const  onColorSelect=(color)=>{
        setResumeInfo({
            ...resumeInfo,
            ThemeColor: color
        })



    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-1">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='grid grid-cols-4 gap-3'>
                {/* You can map through the colors array to display color options */}
                {colors.map((item, index) => (
                    <div onClick={()=>onColorSelect(item)} key={index} className='h-5 w-5 rounded-full' style={{ backgroundColor: item}}>
                        
                    </div>
                ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ThemeColor;
