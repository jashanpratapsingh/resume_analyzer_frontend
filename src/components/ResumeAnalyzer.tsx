import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeAnalysis from './ResumeAnalysis';
import { ResumeAnalysis as ResumeAnalysisType } from '../types';
import { Alert, Box } from '@mui/material';

// Get API URL from environment variables or use default
const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://ai-resume-analyzer-claude.onrender.com';

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
      
      // First check if the API is healthy
      try {
        const healthCheck = await fetch(`${API_URL}/health`);
        if (!healthCheck.ok) {
          throw new Error('API service is not available');
        }
      } catch (e) {
        throw new Error('Could not connect to the API service');
      }

      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || `HTTP error! status: ${response.status}`
        );
      }
      
      const data = await response.json();
      console.log('Raw response:', data);
      
      if (!data) {
        throw new Error('No data received from server');
      }

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