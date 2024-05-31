import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import { useNavigate } from "react-router-dom"


import { Container, Typography, Box, Button } from '@mui/material'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import EditIcon from '@mui/icons-material/Edit'

export default function Home() {

  const navigate = useNavigate('')
  const [error, setError] = useState('')
  const [shakeData, setShakeData] = useState([])

  useEffect(() => {
    async function getShakeData() {
      try {
        const { data } = await axios.get('/api/shakes/')
        setShakeData(data)
        // data.map((shake) => {
        //   const { categories } = shake
        //   categories.map((category) => {
        //     console.log(category.id)
        //   })
        // })
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    getShakeData()
  }, [])

  return (
    <Container sx={{ textAlign: 'center', height: '100%' }}>
      <Typography variant='h3' sx={{ mt: 2 }}>
        Shakes
      </Typography>
      {shakeData.map((shake) => {
        const { id, name, categories, calories, image, average_rating, owner } = shake

        return (      
            <Box key={id} sx={{ boxShadow: 3, borderRadius: 5, pt: 1, my: 3 }}>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {name}
              </Typography>
              <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box>
                  <Box className='shake-image' component='img' alt={name} src={image} />
                  <Typography variant='h5' sx={{ m: 2 }}>
                    Rating: {average_rating || 'No Ratings Yet'}
                  </Typography>
                </Box>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5' sx={{ my: 2 }}>
                      Categories: {categories.map((category) =>
                        <Typography key={category.id}>{category.name}</Typography>
                      )}
                    </Typography>
                    <Typography variant='h5' sx={{ my: 2 }}>
                      Calories: {calories}
                    </Typography>
                  </Box>
                  {/* This box is dynamic */}
                  <Box sx={{ pb: { xs: 4, sm: 8 } }}>
                    <Button sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', pb: 4 }}
                      onClick={() => navigate('/profile')}>
                      <Box className='profile-image' id='home'
                        sx={{ borderRadius: '50%' }}
                        component='img'
                        alt='user.image'
                        src={owner.image} />
                      <Typography>
                        {owner.username}
                      </Typography>
                    </Button>
                    <Container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <Button variant='contained' onClick={() => navigate(`/updateshake/${id}`)}><EditIcon /></Button>
                      <Button variant='contained' onClick={() => navigate(`/shake/${id}`)}><OpenInFullIcon /></Button>
                    </Container>
                  </Box>
                </Container>
              </Container>
            </Box>
        )
      })}
    </Container>
  )
}