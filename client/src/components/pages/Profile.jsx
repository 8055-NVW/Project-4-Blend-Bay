import { useNavigate , useParams} from "react-router-dom"
import { useState, useEffect } from 'react'
import { getToken } from '../../lib/auth'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

// Material ui imports
import { Container, Box, Typography,Rating, Avatar, Tabs, Tab, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Custom Components
import ButtonBox from "../subcomponents/ButtonBox"


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
  );
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

// Placeholder component for uploaded shakes
function UploadedShakes() {
  return (
    <Box>
      <Typography variant="h5">Uploaded Shakes</Typography>
      {/* Add more complex content here */}
      <Box sx={{ mt: 2 }}>
        <Typography>Shake 1</Typography>
        <Typography>Shake 2</Typography>
        <Typography>Shake 3</Typography>
        {/* Add more shakes or complex content */}
      </Box>
    </Box>
  );
}








// Component for favorited shakes
function ProfileShakeView({ shakes, currentUserId , singleView, title }) {
  return (
    <Box>
      <Typography variant="h5">Your {title} shakes</Typography>
      <Box sx={{ mt: 2 }}>
        {shakes.length > 0 ? (
          shakes.map((shake) => (
            <Box key={shake.id} sx={{ boxShadow: 3, borderRadius: 5, pt: 1, my: 3 }}>
              <Typography variant='h5' sx={{ mb: 2 }}>{shake.name}</Typography>
              <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box>
                  <Box className='shake-image' component='img' alt={name} src={shake.image} />
                    <Typography variant='h6' sx={{ m: 3 }}>
                        {shake.average_rating ? <Rating value={shake.average_rating} readOnly size="large" /> : 'No Ratings Yet'}
                    </Typography>
                </Box>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5' sx={{ my: 2 }}>
                      Categories: {shake.categories.map((category) =>
                                    <Typography key={category.id}>{category.name}</Typography>
                                )}
                    </Typography>
                    <Typography variant='h5' sx={{ my: 2 }}>
                                Calories: {shake.calories}
                    </Typography>
                    <Box sx={{ pb: { xs: 4, sm: 8 } }}>
                      <ButtonBox 
                        id={shake.id} 
                        singleView={singleView} 
                        userId={currentUserId} 
                        ownerId={shake.owner.id} 
                        favourites={shake.favourites} />
                    </Box>
                  </Box>
                </Container>
              </Container>
              {/* Render additional shake details here */}
            </Box>
          ))
        ) : (
          <Typography>No favorite shakes found.</Typography>
        )}
      </Box>
    </Box>
  );
}

ProfileShakeView.propTypes = {
  shakes: PropTypes.array.isRequired,
  currentUserId: PropTypes.number.isRequired,
  singleView: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default function Profile() {
  // Material UI Stuff
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true)




  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const [userShakes, setUserShakes] = useState([])
  const [favoriteShakes, setFavoriteShakes] = useState([])
  const [reviews, setReviews] = useState([])





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
        const { favorite_shakes, reviews_created, shakes_created } = data
        setUserData(data)
        setUserShakes(shakes_created)
        setFavoriteShakes(favorite_shakes)
        setReviews(userData)
        console.log(favoriteShakes)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [userId])


       // TO GET THE USER ID FROM THE TOKEN
       const getUserId = (() => {
        const decoded = jwtDecode(getToken())
        return decoded.user_id
    })
    const currentUserId = getUserId()

  return (
    <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 4 }}>
      <Box sx={{ width: { xs: '100%', sm: '30%' }, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 64, height: 64, mr: { xs: 2, sm: 0 } }} src={userData.image} />
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
          <Tab label="Shared" {...a11yProps(0)} />
          <Tab label="Favourited" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{ width: { xs: '100%', sm: '90%' } }}>
        <TabPanel value={value} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ProfileShakeView shakes={userShakes} currentUserId={currentUserId} title={'Shared'} singleView={true}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {favoriteShakes ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ProfileShakeView shakes={favoriteShakes} currentUserId={currentUserId} title={'Favourite'} singleView={true}/>
            </Box>
          ) : (
              <CircularProgress />
          )}
        </TabPanel>
      </Box>
    </Container>
  );
}
