import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeAnalysis from './ResumeAnalysis';
import { ResumeAnalysis as ResumeAnalysisType } from '../types';

const ResumeAnalyzer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisType | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ResumeUploader onUpload={handleUpload} isLoading={isLoading} />
      {analysis && <ResumeAnalysis analysis={analysis} />}
    </div>
  );
};

export default ResumeAnalyzer; 