import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from '@/hooks/use-toast';
import { Brain } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIchatSession } from './../../../service/AIMODAI';

const PROMPT = "Position Title: {positionTitle}. Based on the position title, generate a professional summary highlighting the key skills, experiences, and accomplishments relevant to the role. The summary should focus on key achievements, professional impact, and core competencies in a concise, paragraph-style format, without HTML formatting.";


function RichTextEditor({ index, value, onChange }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [editorValue, setEditorValue] = useState(value || '');

  const GenerateSummaryFromAI = async () => {
    // Check if the position title is available
    if (!resumeInfo.experience[index].title) {
      toast('Please Add Position Title');
      return;
    }

    // Replace the placeholder in the prompt
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    try {
      // Send the prompt to the AI chat session
      const result = await AIchatSession.sendMessage(prompt);

      const aiResponseText = await result.response.text();
      // Log the AI response text
      console.log(aiResponseText);

      // You can now update the editor or handle the response
      setEditorValue(aiResponseText);
      onChange(aiResponseText); // Pass updated value to parent
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      toast('Error generating summary from AI');
    }
  };

  const handleEditorChange = (event) => {
    const newValue = event.target.value;
    setEditorValue(newValue); // Update local editor state
    onChange(newValue); // Pass updated value to parent
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button onClick={GenerateSummaryFromAI} variant="outline" size="sm" className="flex gap-2 border-primary text-primary">
          <Brain className="h-4 w-4" />Generate from AI
        </Button>
      </div>
      <EditorProvider>
        <Editor value={editorValue} onChange={handleEditorChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
