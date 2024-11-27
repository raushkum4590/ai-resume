import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';

function Skills({enableNext}) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams(); // Extract `resumeId` from route params

  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0,
    },
  ]);

  const handleChange = (index, name, value) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index][name] = value;
    setSkillsList(updatedSkills);
  };

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: '',
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1));
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    enableNext(true);

    const payload = {
      data: {
        skills: skillsList, // Use `skillsList` instead of undefined `educationList`
      },
    };

    try {
      const response = await GlobalApi.UpdateResumeDetail(resumeId, payload);
      console.log('Skills updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating skills:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add Your Skills</p>
        <div>
          {skillsList.map((item, index) => (
            <div key={index} className="flex justify-between border rounded-lg p-3 mb-2">
              <div>
                <label className="text-xs">Name</label>
                <Input
                  className="w-full"
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 100 }}
                value={item.rating}
                onChange={(v) => handleChange(index, 'rating', v)} // Use `v` directly
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" onClick={addNewSkills} className="text-primary">
            + Add More Skills
          </Button>
          <Button variant="outline" onClick={removeSkills} className="text-primary">
            - Remove
          </Button>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
