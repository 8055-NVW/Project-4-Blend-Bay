
import axios from 'axios'
import { useState, useContext } from 'react'
import { setToken } from '../../lib/auth'
import { Form, useNavigate } from "react-router-dom"
// import { GoogleLogin } from '@react-oauth/google'
import Cookie from 'js-cookie'

// Custom Components
import ImageUpload from '../elements/ImageUpload'
import FormPage from '../subcomponents/FormPage'

// Material UI Imports
import { TextField, Button, Typography, Container, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

// Material UI
const FormContainer = styled('div')({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

export default function Auth() {

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isSignup, setIsSignUp] = useState(true)

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        image: 'https://res.cloudinary.com/drdpt4mru/image/upload/v1717109451/Project-4%20GA/angj9hllxdsax5nx0tds.png'
    })


    const switchStatus = () => {
        setIsSignUp((previousState) => !previousState)
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (isSignup) {
                await axios.post('/api/auth/register/', formData)
                switchStatus()
            }
            const { data: { access } } = await axios.post('/api/auth/login/', {
                username: formData.username,
                password: formData.password
            })
            setToken(access)
            navigate("/home")
        } catch (error) {
            const err = error.response.data
            const key = Object.keys(err)[0]
            const value = err[key]
            setError(value)
        }
    }

    // TESTING
    // const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

    // const errorMessage = (error) => {
    //     console.log(`Error: ${error}`);
    // };
    // async function handleGoogleLogin(e) {
    //     // e.preventDefault()
    //     // console.log(e)
    //     try {
    //         const response = await axios.post('/api/accounts/google/login/', {
    //             access_token: e.credential,
    //         }, {
    //             headers: {
    //                 'X-CSRFToken': Cookie.get("csrftoken")
    //             }
    //         })
    //         console.log(response.data)
    //         // setToken(access)
    //         // navigate("/")
    //     } catch (error) {
    //         console.log(error.response.data)
    //     }
    // }

    return (
        <FormPage>

            <Typography variant="h3" sx={{ my: 3 }}>
                {isSignup ? 'Sign Up' : 'Sign In'}
            </Typography>
            {/* Google Login */}
            {/* <Box sx={{ display: 'flex', marginTop: 7, width: 'auto' }}>
                <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    onSuccess={handleGoogleLogin}
                    onError={errorMessage}
                />
            </Box> */}
            <form className='form' onSubmit={handleSubmit}>
                {isSignup && (
                    <>
                        <TextField
                            type="email"
                            label="Email"
                            name="email"
                            variant="standard"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </>
                )}
                <TextField
                    type="text"
                    label="Username"
                    name="username"
                    variant="standard"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    variant="standard"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {isSignup && (
                    <>
                        <TextField
                            type="password"
                            label="Confirm Password"
                            name="password_confirmation"
                            variant="standard"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            fullWidth
                            margin="normal" />
                        <ImageUpload formData={formData} setFormData={setFormData} profile='True' />
                    </>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 4, width: 3/4 }}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Container sx={{ textAlign: 'center', pt: 2 }}>
                    {error && (
                        <Typography variant="body1">
                            {error}
                        </Typography>
                    )}
                    <Box>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={switchStatus}
                            sx={{ my: 3 }}>
                            {isSignup ? 'Already have an account? Sign In' : 'New here ? Create an Account'}
                        </Button>
                    </Box>
                </Container>
            </form>
           
        </FormPage>
    )
}