import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeAnalysis from './ResumeAnalysis';
import { ResumeAnalysis as ResumeAnalysisType } from '../types';
import { Alert, Box } from '@mui/material';

// Get API URL from environment variables with fallbacks
const API_URL = import.meta.env.VITE_API_BASE_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : 'https://resume-analyzer-backend-1.onrender.com');

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
      
      console.log('Using API URL:', API_URL); // Debug log

      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // If we can't parse the error response, use the default message
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Response data:', data); // Debug log
      
      if (!data) {
        throw new Error('No data received from server');
      }

      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      let errorMessage = 'An error occurred while analyzing the resume';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection or try again later.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
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