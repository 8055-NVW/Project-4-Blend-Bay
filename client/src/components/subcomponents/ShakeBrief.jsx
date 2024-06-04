import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import { getToken } from '../../lib/auth'

// Material UI imports
import { Container, Typography, Box, Rating } from '@mui/material'

// Custom Components
import ProfileCard from '../elements/ProfileCard'
import ButtonBox from './ButtonBox'
import ShakeContent from './ShakeContent'
import ShakeReviews from './ShakeReviews'

export default function ShakeBrief({ request, singleView = false , profileView = false}) {

    const navigate = useNavigate()
    const [shakeData, setShakeData] = useState(singleView ? null : [])

    // TO GET THE USER ID FROM THE TOKEN
    const userId = (() => {
        const decoded = jwtDecode(getToken())
        return decoded.user_id
    })

    const getShakeData = async () => {
        try {
            if (profileView){
                setShakeData(request)
                console.log(shakeData)
            } else {
                const { data } = await request()
                setShakeData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getShakeData()
    }, [request])
    

    // This saves the destructuring and return to a const so we dont have to repeat this code block. 
    // Will try to improve on this as im not sure if having it out of the return is the best way to do it
    const renderShakeDetails = (shake) => {
        const { id, name, categories, calories, image, average_rating, owner, favourites } = shake
        return (
            <Box key={id} sx={{ boxShadow: 3, borderRadius: 5, pt: 1, my: 3 }}>
                <Typography variant='h4' sx={{ mb: 2 }}>
                    {name}
                </Typography>
                <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box>
                        <Box className='shake-image' component='img' alt={name} src={image} />
                        <Typography variant='h6' sx={{ m: 3 }}>
                            {average_rating ? <Rating value={average_rating} readOnly size="large" /> : 'No Ratings Yet'}
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
                        <Box sx={{ pb: { xs: 4, sm: 8 } }}>
                            {/* Profile Card Component */}
                            <ProfileCard owner={owner} userId={userId()} />
                            <ButtonBox id={id} singleView={singleView} userId={userId()} ownerId={owner.id} favourites={favourites} />
                        </Box>
                    </Container>
                </Container>
            </Box>
        )
    }

    return (
        <Container sx={{ textAlign: 'center', height: '100%' }}>
            <Typography variant='h3' sx={{ mt: 2 }}>
                {singleView ? 'Your Shake' : 'All Shakes'}
            </Typography>
            {/* To define a single shake request or index */}
            {singleView ? (
                shakeData && renderShakeDetails(shakeData)
            ) : (
                shakeData.map((shake) => renderShakeDetails(shake))
            )}
            {/* To ensure below only load on single view */}
            {singleView &&
                <>
                    <ShakeContent shakeData={shakeData} />
                    <ShakeReviews shakeData={shakeData} reloadReviewData={getShakeData} userId={userId()} />
                </>
            }
        </Container>
    )
}