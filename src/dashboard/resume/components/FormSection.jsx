import React, { useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Eduaction from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

const FormSection = () => {
    const [activeFormIndex, setActiveIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const {resumeId}=useParams();

    return (
        <div>
            <div className='flex justify-between items-center'>
                <ThemeColor/>
                
                <div className="flex gap-2">
                    {activeFormIndex > 1 && (
                        <Button size="sm" className="flex gap-1" onClick={() => setActiveIndex(activeFormIndex - 1)}>
                            <ArrowLeft /> Previous
                        </Button>
                    )}
                    <Button
                    disabled={!enableNext} // Disable if enableNext is false
                    size="sm" className="flex gap-1" onClick={() => setActiveIndex(activeFormIndex + 1)}>
                        Next <ArrowRight />
                    </Button>
                </div>
            </div>

            {/* Conditionally render PersonalDetail or Summary based on activeFormIndex */}
            {activeFormIndex === 1 ? <PersonalDetail enableNext={setEnableNext} /> : activeFormIndex === 2 ? <Summary enableNext={setEnableNext} />
            :activeFormIndex === 3 ? <Experience enableNext={setEnableNext}/>
            :activeFormIndex === 4 ? <Eduaction enableNext={setEnableNext}/>
            :activeFormIndex === 5 ? <Skills enableNext={setEnableNext}/> 
            :activeFormIndex === 6 ? <Navigate to={'/my-resume/'+resumeId+"/view"}/>
          
            : null}
        </div>
    );
};

export default FormSection;
