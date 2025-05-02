import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, Paper, alpha } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from 'framer-motion';

interface ResumeUploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUpload, isLoading }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else {
      setError('Please upload a valid PDF file');
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Paper
        {...getRootProps()}
        sx={{
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: theme => isDragActive 
            ? alpha(theme.palette.primary.main, 0.1)
            : alpha(theme.palette.background.paper, 0.8),
          border: '2px dashed',
          borderColor: theme => isDragActive 
            ? 'primary.main' 
            : alpha(theme.palette.primary.main, 0.3),
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
            borderColor: 'primary.main',
          },
        }}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <CircularProgress size={48} />
            </motion.div>
            <Typography variant="h6" color="primary">
              Analyzing your resume...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <motion.div
              animate={isDragActive ? { scale: 1.2, rotate: 0 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            </motion.div>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {isDragActive ? 'Drop your resume here' : 'Drag and drop your resume here'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              or click to select a file
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Only PDF files are supported
            </Typography>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography 
                  color="error" 
                  variant="body2"
                  sx={{
                    mt: 2,
                    p: 1,
                    px: 2,
                    borderRadius: 1,
                    bgcolor: theme => alpha(theme.palette.error.main, 0.1),
                  }}
                >
                  {error}
                </Typography>
              </motion.div>
            )}
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default ResumeUploader; 