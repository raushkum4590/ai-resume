import React from 'react'

const SkillPreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      <div className='grid grid-cols-2 gap-5'>

      {resumeInfo?.skills.map((skill, index) => (
        <div key={index} className="my-2 flex items-center justify-between">
          <h2 className="text-xs font-medium">{skill.name}</h2>
          <div className='h-2 bg-gray-200 w-[120px] rounded-full'>
            <div
              className='h-2 rounded-full'
              style={{
                backgroundColor: resumeInfo?.themeColor,
                width: skill.rating * 20 + '%', // Sets width based on rating
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SkillPreview;
