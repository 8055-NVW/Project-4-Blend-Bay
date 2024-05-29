
import { useState } from 'react'
import axios from 'axios'
import { setToken } from '../../lib/auth'
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import { TextField, Button, Typography, Container, Box, Input } from '@mui/material'
import { FormControl } from '@mui/base/FormControl'
import { styled } from '@mui/material/styles'

export default function Auth() {
    // Material UI
    const FormContainer = styled('div')({
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })



    const navigate = useNavigate();

    const [error, setError] = useState('')
    const [isSignup, setIsSignUp] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: 'https://placehold.co/400x400'
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
            navigate("/")
        } catch (error) {
            console.log(error.response.data)
        }
    }

    // TESTING
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(`Error: ${error}`);
    };
    // async function handleGoogleLogin(e) {
    //     e.preventDefault()
    //     console.log(e)
    // try {
    //     const data = await axios.post('/api/accounts/google/login/?process=login/', {
    //         access_token: e.credential,
    //     })
    //     console.log(data)
    //     setToken(access)
    //     navigate("/")
    // } catch (error) {
    //     console.log(error.response.data)
    // }
    // }

    return (
        <FormContainer>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: 'sm',
                    boxShadow: 3,
                    borderRadius: 4,
                }}>
                <Typography
                    variant="h3"
                    sx={{ my: 3 }}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                {/* Google Login */}
                <Box
                    sx={{
                        display: 'flex',
                        marginTop: 7,
                        width: 'auto'
                    }}>
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        onSuccess={responseMessage}
                        onError={errorMessage}
                    />
                </Box>
                <FormControl className='form'
                    onSubmit={handleSubmit}>
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
                                margin="normal"
                            />
                        </>
                    )}
                    {/* Image Upload */}
                    {isSignup && (
                        <Box sx={{
                            width: '70%',
                            mt: 3,
                        }}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                startIcon={<PhotoCamera />}
                            >
                                Add a Profile Picture
                                <Input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    hidden
                                    inputProps={{ accept: 'image/*' }}
                                    sx={{
                                        display: 'none',
                                    }}
                                />
                            </Button>
                            {formData.image && (
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    {formData.image.name}
                                </Typography>
                            )}
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 4 }}
                    >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Container
                        sx={{ textAlign: 'center' }}>
                        {error && (
                            <Typography
                                variant="body1"
                                className="text-center mt-3 text-danger">
                                {error.email || error.username || error.message || 'Invalid details. Please please try again'}
                            </Typography>
                        )}
                        <Box>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={switchStatus}
                                sx={{ my: 3 }}>
                                {isSignup ? 'Already have an account? Sign In' : 'New here? Create an Account '}
                            </Button>
                        </Box>
                    </Container>
                </FormControl>
            </Container>
        </FormContainer>
    )
}