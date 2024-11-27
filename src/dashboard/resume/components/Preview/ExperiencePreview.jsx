import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
      style={{
        color:resumeInfo?.themeColor
      }}>Professional Experience</h2>
      <hr style={{
        borderColor:resumeInfo?.themeColor
      }}
      />
      {resumeInfo?.experience.map((experience,index) =>(
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
          style={{
            color: resumeInfo?.themeColor
          }}>{experience?.title}</h2>
          <h2 className='text-xs flex justify-between'>{experience?.comapnyName}
          {experience?.city},
          {experience?.state}
          <span>{experience?.startDate} TO {experience?.currentWorking?'present':experience?.endDate}</span>
          </h2>
         {/*<p className='text-xs my-2 '>
            {experience?.workSummary}
          </p>*/}
          <div className='text-sm'  dangerouslySetInnerHTML = {{__html:experience?.workSummary}}/>


        </div>
      ))}

    </div>
  )
}

export default ExperiencePreview