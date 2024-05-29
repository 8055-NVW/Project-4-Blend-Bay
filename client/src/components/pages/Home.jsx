import { useEffect } from 'react'
import axios from 'axios'


import { Container, Typography,Box } from '@mui/material'

export default function Home() {
    useEffect(() => {
        async function getShakeData() {
          try {
            const { data } = await axios.get('/api/shakes/')
            console.log(data)
          } catch (error) {
            console.log(error)
          }
        }
        getShakeData()
      })
      return (
        <Container sx={{bgcolor:'tomato', textAlign:'center', flexGrow:1}}>
          <Typography variant='h1'>Home</Typography>
          <Box></Box>
        </Container>
      )
}