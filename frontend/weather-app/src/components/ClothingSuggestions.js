import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  Alert
} from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ReactMarkdown from 'react-markdown';

export default function ClothingSuggestions({ suggestions, loading, error }) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!suggestions) {
    return null;
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mt: 2, 
        width: '100%',
        bgcolor: 'rgba(255,255,255,0.9)',
        borderRadius: 2
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <CheckroomIcon color="primary" />
        <Typography variant="h6" component="h2">
          Clothing Suggestions
        </Typography>
      </Box>
      <Box sx={{ 
        '& p': { mb: 2 },
        '& strong': { color: 'primary.main' },
        '& ul': { pl: 2 },
        '& li': { mb: 1 }
      }}>
        <ReactMarkdown>
          {suggestions}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
} 