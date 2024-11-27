import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';

const Dashboard = () => {


  const {user}=useUser();
  const[resumeList,setResumeList]=useState([]);

 
  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);
  const GetResumeList=()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      
      setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-2xl'>My Resume</h2>
      <p>Start Creating AI resume to your next job</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10'>
        <AddResume/>
        {resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} />


        ))}
      </div>
    </div>
    

  )
}

export default Dashboard