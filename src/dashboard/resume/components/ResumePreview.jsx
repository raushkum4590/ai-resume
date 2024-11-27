import React, { useContext } from 'react';
import PersonalDetailPreview from './Preview/PersonalDetailPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummaryPreview from './Preview/SummaryPreview';
import ExperiencePreview from './Preview/ExperiencePreview';
import EducationalPreview from './Preview/EducationalPreview';
import SkillPreview from './Preview/SkillPreview';

const ResumePreview = () => {
    const { resumeInfo } = useContext(ResumeInfoContext);

    if (!resumeInfo) return <div>Loading...</div>;

    return (
        <div
            className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo.themeColor
            }}
        >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummaryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <SkillPreview resumeInfo={resumeInfo} />
        </div>
    );
};

export default ResumePreview;
