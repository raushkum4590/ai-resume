import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from './../../../../context/ResumeInfoContext';
import React, { useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Brain, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { AIchatSession } from './../../../../../service/AIMODAI';

// Global prompt definition
const promptTemplate = "Create a concise and compelling summary for a resume based on the job title: {jobTitle}. The summary should emphasize relevant skills, accomplishments, and qualities that make the candidate an ideal fit for this role.";

const Summary = ({ enableNext }) => {
  const {resumeInfo, setResumeInfo}= useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || '');
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState([]);

  const { resumeId } = useParams();

  useEffect(() => {
    setSummary(resumeInfo?.summary || '');
  }, [resumeInfo?.summary]);

  // Function to generate the summary from AI
  const GenerateSummaryFromAI = async () => {
    setLoading(true);

    // Replace placeholders in the global promptTemplate
    const prompt = promptTemplate.replace('{jobTitle}', resumeInfo?.jobTitle || '');

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const aiResponseText = await result.response.text(); // Get response as plain text

      console.log("Generated summary suggestions:", aiResponseText);

      // Split response into suggestions (adjust as needed based on AI response format)
      const suggestions = aiResponseText.split('\n\n').filter(Boolean); // Improved suggestion handling
      setAiGeneratedSummary(suggestions); // Store suggestions as an array
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in the summary input
  const handleSummaryChange = (e) => {
    enableNext(false);
    const value = e.target.value.trim(); // Ensure no leading/trailing whitespace
    setResumeInfo({
      ...resumeInfo,
      summary: value,
    });
    setSummary(value); // Update local summary state
  };

  // Save summary to API
  const saveSummaryToAPI = (e) => {
    e.preventDefault();

    if (!summary.trim()) {
      console.error("Summary is empty, cannot save.");
      toast("Summary cannot be empty", { className: "text-red-500" });
      return;
    }

    if (!resumeId) {
      console.warn("No resume ID available for saving.");
      toast("Resume ID missing, cannot save", { className: "text-red-500" });
      return;
    }

    setLoading(true);

    const data = {
      data: { summary: summary },
    };

    console.log("Sending data to API:", data);
    console.log(`API URL: /user-resumes/${resumeId}`);

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        console.log("API call successful:", resp);
        toast("Summary Updated", { className: "text-blue-500" });
        enableNext(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API call error:", error);
        toast("Failed to update summary", { className: "text-red-500" });
        setLoading(false);
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add a summary for your job title</p>
      <form onSubmit={saveSummaryToAPI}>
        <div className="mt-7">
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button 
              variant="outline" 
              onClick={GenerateSummaryFromAI} 
              type='button' 
              size="sm" 
              className="border-primary text-primary flex gap-2"
            >
              <Brain className='h-4 w-4'/>Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            name="summary"
            value={summary}
            onChange={handleSummaryChange}
            required
          />
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiGeneratedSummary && aiGeneratedSummary.length > 0 && (
        <div className="mt-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummary.map((suggestion, index) => (
            <div key={index} className="mt-3">
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
