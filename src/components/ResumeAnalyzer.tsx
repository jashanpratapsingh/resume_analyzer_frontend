import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeAnalysis from './ResumeAnalysis';
import { ResumeAnalysis as ResumeAnalysisType } from '../types';
import { Alert, Box } from '@mui/material';

const ResumeAnalyzer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw response:', data); // Debug log
      
      if (!data) {
        throw new Error('No data received from server');
      }

      // The analysis is directly in the response, not nested
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while analyzing the resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <ResumeUploader onUpload={handleUpload} isLoading={isLoading} />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {analysis && <ResumeAnalysis analysis={analysis} />}
    </Box>
  );
};

export default ResumeAnalyzer; 