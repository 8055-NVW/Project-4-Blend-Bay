import { Container, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const LandingPageContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0',
  height: '100%',
  textAlign: 'center',
})

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(4, 0),
}));

export default function Landing() {

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/auth');
  };

  return (
    <LandingPageContainer>
      <Typography variant="h2" gutterBottom>
        Welcome to my Website Bla Bla
      </Typography>
      <Typography variant="body1" gutterBottom>
      Bla BlaBla BlaBla BlaBla BlaBla BlaBla Bla
      </Typography>
      <CenteredBox>
        <Button variant="contained" color="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </CenteredBox>
      <Typography variant="body1">
        Join up and start explorng!
      </Typography>
    </LandingPageContainer>
  )
}