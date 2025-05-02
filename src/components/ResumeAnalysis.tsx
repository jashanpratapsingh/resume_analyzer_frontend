import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { ResumeAnalysis as ResumeAnalysisType, WorkExperience, Certification } from '../types';

interface ResumeAnalysisProps {
  analysis: ResumeAnalysisType;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ analysis }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Personal Information */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px' }}>
            <Typography><strong>Name:</strong> {analysis.name}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px' }}>
            <Typography><strong>Email:</strong> {analysis.email}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px' }}>
            <Typography><strong>Phone:</strong> {analysis.phone}</Typography>
          </Box>
          <Box sx={{ flex: '1 1 200px' }}>
            <Typography><strong>Location:</strong> {analysis.location}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Education */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Education
        </Typography>
        <List>
          {analysis.education.map((edu, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={edu.degree}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {edu.institution}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        {edu.field_of_study}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        {edu.start_date} - {edu.end_date}
                      </Typography>
                      {edu.gpa && (
                        <Typography component="span" variant="body2">
                          <br />
                          GPA: {edu.gpa}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
              {index < analysis.education.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Work Experience */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Work Experience
        </Typography>
        <List>
          {analysis.work_experience.map((exp: WorkExperience, index: number) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {exp.title} at {exp.company}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {exp.location}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        {exp.start_date} - {exp.end_date || 'Present'}
                      </Typography>
                      <List dense>
                        {exp.description.map((desc, i) => (
                          <ListItem key={i}>
                            <ListItemText primary={desc} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  }
                />
              </ListItem>
              {index < analysis.work_experience.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Skills */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {analysis.skills.map((skill: { name: string; years_of_experience?: number; category?: string }, index: number) => (
            <Chip
              key={index}
              label={`${skill.name}${skill.years_of_experience ? ` (${skill.years_of_experience} years)` : ''}`}
              color={skill.category === 'Technical' ? 'primary' : 'secondary'}
              variant="outlined"
            />
          ))}
        </Box>
      </Paper>

      {/* Certifications */}
      {analysis.certifications.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Certifications
          </Typography>
          <List>
            {analysis.certifications.map((cert: Certification, index: number) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={cert.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {cert.issuer}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          {cert.date_obtained}
                          {cert.expiration_date && ` - ${cert.expiration_date}`}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < analysis.certifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Languages */}
      {analysis.languages.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Languages
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {analysis.languages.map((lang: string, index: number) => (
              <Chip key={index} label={lang} />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ResumeAnalysis; 