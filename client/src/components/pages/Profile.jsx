import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import { getToken } from '../../lib/auth'
import ShakeBrief from '../subcomponents/ShakeBrief'

// Material UI imports
import { Container, Typography, Box, Button, Rating } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


// Material ui tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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


export default function Profile() {
  // Material UI
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { userId } = useParams()

  function request(fromData) {
    return axios.get(`/api/profile/`, fromData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' } }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'row', md: 'column' }, 
          p: 2, 
          height: '100%' }}>
        <Box>
          <Typography>Profile Card</Typography>
        </Box>
        <Box
          sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.paper', 
            display: 'flex', 
            flexDirection:'row' }}>
          <Tabs
            orientation={isSmallScreen ? 'horizontal' : 'vertical'}
            value={value}
            onChange={handleChange}
            aria-label="Tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Your Shakes" {...a11yProps(0)} />
            <Tab label="Favourites" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <Box 
        sx={{ 
          height: '100%', 
          flexGrow: '1' }}>
        <ShakeBrief 
          request={request} />
      </Box>
    </Box>
  )
}