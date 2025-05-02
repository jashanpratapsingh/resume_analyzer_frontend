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
import { ResumeAnalysis as ResumeAnalysisType } from '../types';

interface ResumeAnalysisProps {
  analysis: ResumeAnalysisType;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ analysis }) => {
  console.log('Rendering analysis:', analysis); // Debug log

  return (
    <Box sx={{ mt: 4 }}>
      {/* Personal Information */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <List>
          {analysis.name && (
            <ListItem>
              <ListItemText primary="Name" secondary={analysis.name} />
            </ListItem>
          )}
          {analysis.email && (
            <ListItem>
              <ListItemText primary="Email" secondary={analysis.email} />
            </ListItem>
          )}
          {analysis.phone && (
            <ListItem>
              <ListItemText primary="Phone" secondary={analysis.phone} />
            </ListItem>
          )}
          {analysis.location && (
            <ListItem>
              <ListItemText primary="Location" secondary={analysis.location} />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Education */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
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
                      {edu.field_of_study && (
                        <Typography component="span" variant="body2">
                          {edu.field_of_study}
                        </Typography>
                      )}
                      <br />
                      <Typography component="span" variant="body2">
                        {edu.graduation_date}
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
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Work Experience
        </Typography>
        <List>
          {analysis.work_experience.map((exp, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={exp.position}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {exp.company}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        {exp.duration}
                      </Typography>
                      {exp.location && (
                        <Typography component="span" variant="body2">
                          <br />
                          {exp.location}
                        </Typography>
                      )}
                      {exp.description && exp.description.length > 0 && (
                        <List dense>
                          {exp.description.map((desc, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={desc} />
                            </ListItem>
                          ))}
                        </List>
                      )}
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
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {analysis.skills.map((skill, index) => (
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
      {analysis.certifications && analysis.certifications.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Certifications
          </Typography>
          <List>
            {analysis.certifications.map((cert, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={cert.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {cert.issuing_organization}
                        </Typography>
                        {cert.date_obtained && (
                          <Typography component="span" variant="body2">
                            <br />
                            {cert.date_obtained}
                            {cert.expiration_date && ` - ${cert.expiration_date}`}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
                {index < (analysis.certifications?.length ?? 0) - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Languages */}
      {analysis.languages && analysis.languages.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Languages
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {analysis.languages.map((lang, index) => (
              <Chip key={index} label={lang} color="secondary" />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ResumeAnalysis; 