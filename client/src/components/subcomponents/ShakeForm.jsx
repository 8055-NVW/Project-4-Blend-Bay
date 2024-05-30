import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Material UI Imports
import { TextField, Button, Typography, Container, Box, Input } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { styled } from '@mui/material/styles'

const FormContainer = styled('div')({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})


export default function ShakeForm(title, request, onLoad, variant) {

    const navigate = useNavigate()
    const { shakeId} = useParams()
  
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        calories: '',
        ingredients: '',
        instructions: '',
        categories: []
      })
      const [errors, setErrors] = useState()

      useEffect(() => {
        async function getShakeData(){
          try {
            const { data } = await axios.get(`/api/shakes/${shakeId}/`)
            setFormData(data)
          } catch (error) {
            console.log(error)
            setErrors(error.response.data)
          }
        }
        if(onLoad){
          getShakeData()
        }
      }, [shakeId])
      
      function handleInputChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
      }

      async function handleSubmit(e){
        e.preventDefault()
        try {
          const {data:{id}} = await request(formData)
          navigate(`shake/${id}`)
        } catch (error) {
          console.log(error)
          setErrors(error.response.data)
        }
      }

    return (
        <FormContainer>
            <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 'sm',
                    boxShadow: 3,
                    borderRadius: 4,
                }}>
                        <form onSubmit={handleSubmit}>
            {/*Title of page */}

            {/* name */}
            {/* image */}
            {/* calories */}
            {/* ingredients */}
            {/* instructions */}
            {/* categories...Dropdown */}
            {/* errors */}
            {/* button to cancel */}
            {/* button to add/ submit */}
        </form>
            </Container>
        </FormContainer>

    )
}