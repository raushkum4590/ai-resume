import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';

import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from '@/hooks/use-toast';

const formField = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: ''
};

function Education({ enableNext }) {
  const [educationList, setEducationList] = useState([{ ...formField }]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params=useParams();

  const handleChange = (index, event) => {
    enableNext(false);
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  

  const addNewEducation = () => {
    setEducationList([...educationList,{
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''

    }]);
  };

  const removeEducation = () => {
    setEducationList((prevList) => {
      if (prevList.length > 1) {
        return prevList.slice(0, -1);
      }
      return prevList;
    });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList
    });
  }, [educationList]);
 

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    enableNext(true);
  
    const payload = {
      data: {
        education: educationList, // Ensure `educationList` is an array of objects
      },
    };
  
    try {
      const response = await GlobalApi.UpdateResumeDetail(params.resumeId, payload);
      console.log('Education details updated successfully:', response.data);
     
    } catch (error) {
      console.error('Error updating education details:', error.response?.data || error.message);
    
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>
      <form onSubmit={onSave}>
        {educationList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">University Name</label>
              <Input
                name="universityName"
              
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-xs">Degree</label>
              <Input
                name="degree"
               
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-xs">Major</label>
              <Input
                name="major"
                
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-xs">Start Date</label>
              <Input
                type="date"
                name="startDate"
                
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-xs">End Date</label>
              <Input
                type="date"
                name="endDate"
             
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2 text-sm">
              <label  className="text-xs">Description</label>
              <textarea
                name="description"
               
                onChange={(event) => handleChange(index, event)}
                className="w-full h-20 border rounded-md p-2 bg-white"
              ></textarea>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={addNewEducation} className="text-primary">
                + Add More Education
              </Button>
              <Button variant="outline" onClick={removeEducation} className="text-primary">
                - Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Education;
