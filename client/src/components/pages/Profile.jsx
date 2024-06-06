import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getToken } from '../../lib/auth'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

// Material ui imports
import { Container, Box, Typography, Button, Avatar, Tabs, Tab, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Custom Components
import ButtonBox from "../subcomponents/ButtonBox"
import ProfileCard from "../elements/ProfileCard"

// Tab Panel component for content display
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}


// Profile view card 
function ProfileShakeView({ shakes, currentUserId, singleView, title, showProfileCard, ownerId }) {
  return (
    <Box>
      <Box
        sx={{ mb: 1 }}>
        {shakes.length > 0 ? (
          shakes.map((shake) => (
            <Box
              key={shake.id}
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                pb: 2,
                mb: 3,
                pt: 2,
                backgroundColor: 'rgba(254, 254, 254, 0.955)'
              }}>
              <Typography
                variant='h5'
                sx={{ mb: 2, textAlign: 'center' }}>
                {shake.name}
              </Typography>
              <Container
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                <Box>
                  <Box
                    sx={{
                      border: '1px solid rgba(159, 159, 159, 0.404)',
                      borderRadius: 1
                    }}
                    className='shake-image'
                    component='img'
                    alt={shake.name}
                    src={shake.image} />
                </Box>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                  <Box
                    sx={{
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                    <Typography
                      variant='h5'
                      sx={{ my: 2 }}>
                      Categories: {shake.categories.map((category) =>
                        <Typography
                          key={category.id}>
                          {category.name}
                        </Typography>
                      )}
                    </Typography>
                    <Typography
                      variant='h5'
                      sx={{ my: 2 }}>
                      Calories: {shake.calories}
                    </Typography>
                    {showProfileCard &&
                      <ProfileCard owner={shake.owner} userId={currentUserId} />}
                    <Box
                      sx={{ pb: { xs: 4, sm: 8 } }}>
                      <ButtonBox
                        id={shake.id}
                        singleView={singleView}
                        userId={currentUserId}
                        ownerId={ownerId}
                        favourites={shake.favourites} />
                    </Box>
                  </Box>
                </Container>
              </Container>
            </Box>
          ))
        ) : (
          <>
          <Typography variant="h4" sx={{textAlign: 'center'}}>No {title} yet.</Typography>
          {title === 'Posts' && (
            <Typography variant="h6" sx={{textAlign: 'center', mt:2}}>Got a favorite shake recipe? Share it with our community! Click the <strong>ADD SHAKE</strong> button to the left.</Typography>
          )}
          </>
          
        )}
      </Box>
    </Box>
  )
}

ProfileShakeView.propTypes = {
  shakes: PropTypes.array.isRequired,
  currentUserId: PropTypes.number.isRequired,
  singleView: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  showProfileCard: PropTypes.bool.isRequired,
  ownerId: PropTypes.number.isRequired,
}

export default function Profile() {
  // Material UI Integral
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);


  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [userShakes, setUserShakes] = useState([])
  const [favoriteShakes, setFavoriteShakes] = useState([])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })
        const { favorite_shakes, shakes_created } = data
        setUserData(data)
        setUserShakes(shakes_created)
        setFavoriteShakes(favorite_shakes)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [userId, userData])

  // TO GET THE USER ID FROM THE TOKEN
  const getUserId = (() => {
    const decoded = jwtDecode(getToken())
    return decoded.user_id
  })
  const currentUserId = getUserId()




  return (
    <Box className='profile-holder'>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          mx: 0,
          px: 2
        }}>
        <Box className='side-panel'
          sx={{
            width: { xs: '100%', sm: '30%' },
            mb: { xs: 2, sm: 0 },
            mr: { sm: 2 }
          }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: 'center',
            mb: 2
          }}>
            <Avatar sx={{
              width: 100,
              height: 100,
              mb: 2,
              mr: { xs: 2, sm: 0 }
            }}
              src={userData.image} />
            <Typography variant="h6">{userData.username}</Typography>
          </Box>
          <Tabs
            orientation={isSmallScreen ? 'horizontal' : 'vertical'}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="User profile tabs"
            sx={{ borderRight: { sm: 1 }, borderBottom: { xs: 1, sm: 0 }, borderColor: 'divider' }}
          >

            <Tab label="Posts" {...a11yProps(0)} />
            <Tab label="Favourites" {...a11yProps(1)} />
            {userId == currentUserId && (
              <Button variant="contained" color="success">
                <Link className="link" to='/addshake'>
                  <strong>Add Shake</strong>
                </Link>
              </Button>
            )}
          </Tabs>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '90%' } }}>
          <TabPanel value={value} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <ProfileShakeView
                shakes={userShakes}
                currentUserId={currentUserId}
                title={'Posts'}
                singleView={false}
                ownerId={userData.id}
                showProfileCard={false} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {favoriteShakes ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ProfileShakeView
                  shakes={favoriteShakes}
                  currentUserId={currentUserId}
                  title={'Favourites'}
                  singleView={false}
                  showProfileCard={true} />
              </Box>
            ) : (
              <CircularProgress />
            )}
          </TabPanel>
        </Box>
      </Container>
    </Box>
  )
}
