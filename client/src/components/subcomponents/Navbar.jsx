import { useState } from "react"
// Material UI Imports
import { AppBar, Toolbar, Typography, Box } from "@mui/material"
import HomeRounded from "@mui/icons-material/HomeRounded"
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
// import { Box } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import LoginIcon from '@mui/icons-material/Login'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'

// Material UI components

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: '20px',
  marginRight: '20px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))




const goTos = ['Profile', 'Logout']

export default function Navbar() {

  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  };


  return (
    // <h1>Navbar</h1>
    <AppBar position="sticky">
      <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography 
          variant="h6" 
          sx={{
              display:{xs:'none',
              sm:'block'}}}>
          Site Name
        </Typography>
        <HomeRounded 
          sx={{
            display:{xs:'black',  
            sm:'none',
            }}}/>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {/* Login Button / User Profile */}
        <Box>
          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="username" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {goTos.map((goTo) => (
                <MenuItem key={goTo} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{goTo}</Typography>
                </MenuItem>
              ))}
            </Menu>
          {/* <IconButton>
            <LoginIcon />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  )
}