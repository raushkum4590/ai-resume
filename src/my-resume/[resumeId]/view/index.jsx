import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useNavigation, Navigate } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume(resume) {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();
    const navigate = useNavigate(); // Initialize navigate hook
    // Initialize navigate hook

    useEffect(() => {
        GetResumeInfo();
    }, []);

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        });
    }

    const HandleDownload = () => {
        window.print();
    }

    

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI Generated Resume is ready To Download</h2>
                    <p className='text-center text-gray-400'>Now you can share your resume with friends and family</p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>

                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume",
                                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                title: resumeInfo?.FirstName + " " + resumeInfo?.LastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                    {/* Back Button */}
                   
                </div>
            </div>
            <div id="Print-area" className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
