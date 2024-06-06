import { Box, Typography, IconButton, Container } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Footer() {
  return (
    <Container
      id='footer'
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
        mt: 'auto',
        width: '100%'
      }}
    >
      <Typography variant="body1">
        Created by Vivian Lopes
      </Typography>
      <Box>
        <IconButton
          component="a"
          href="https://github.com/your-github-username"
          target="_blank"
          aria-label="GitHub"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/vivian-lopes-44094798/"
          target="_blank"
          aria-label="LinkedIn"
          color="inherit"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Container>
  )
}