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
    <LandingPageContainer className='landing-page'>
      <Box className="text-container">
      <Box component="img" 
            sx={{
              margin: 'auto',
              paddingBottom: '50px',
              display:'block', 
              height: 100, 
              width: 100,
              borderRadius: '50%'}} 
              alt="home" 
              src="https://res.cloudinary.com/drdpt4mru/image/upload/v1717606948/Project-4%20GA/logo_seyzjh.png" />
      <Typography variant="h2" component="h1" gutterBottom>
          Welcome to <strong>Blend Bay</strong>!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          The vibrant hub where shake enthusiasts unite!  🌟🥤
        </Typography>
      <CenteredBox>
        <Button variant="contained" color="secondary" onClick={handleSignUp}>
        Explore Blend Bay
        </Button>
      </CenteredBox>
        <Box sx={{ my: 2 }}>
          <Typography  sx={{ my: 3 }} variant="body1" gutterBottom>
            <strong>Sip</strong>: Dive into our diverse menu of handcrafted shakes. From velvety classics to daring flavor fusions, there’s a shake for every palate.
          </Typography>
          <Typography sx={{ my: 3 }} variant="body1" gutterBottom>
            <strong>Share</strong>: Got a secret recipe? A twist on the traditional? Share it with the community! Post your favorite shake concoctions.
          </Typography>
          <Typography sx={{ my: 3 }} variant="body1" gutterBottom>
            <strong>Rate</strong>:Taste-tested a mind-blowing shake? Give it a thumbs-up!
          </Typography>
        </Box>
      </Box>
    </LandingPageContainer>
  )
}