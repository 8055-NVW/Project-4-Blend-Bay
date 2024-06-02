import { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom"

// Material UI imports
import { Container, Typography, Box, Button,Rating } from '@mui/material'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import EditIcon from '@mui/icons-material/Edit'

// Custom Components
import ShakeContent from './ShakeContent'
import ShakeReviews from './ShakeReviews'

export default function ShakeBrief({ request, singleView = false }) {

    const navigate = useNavigate('')
    const [shakeData, setShakeData] = useState(singleView ? null : [])


    useEffect(() => {
        async function getShakeData() {
            try {
                const { data } = await request()
                setShakeData(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getShakeData()
    }, [request])

    // This saves the destructuring and return to a const so we dont have to repeat this code block. 
    // Will try to improve on this as im not sure if having it out of the return is the best way to do it
    const renderShakeDetails = (shake) => {
        const { id, name, categories, calories, image, average_rating, owner } = shake
        return (
            <Box key={id} sx={{ boxShadow: 3, borderRadius: 5, pt: 1, my: 3 }}>
                <Typography variant='h4' sx={{ mb: 2 }}>
                    {name}
                </Typography>
                <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box>
                        <Box className='shake-image' component='img' alt={name} src={image} />
                        <Typography variant='h6' sx={{ m: 3 }}>
                           {average_rating? <Rating value={average_rating} readOnly size="large"/> : 'No Ratings Yet'}
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
    }

    return (
        <Container sx={{ textAlign: 'center', height: '100%' }}>
            <Typography variant='h3' sx={{ mt: 2 }}>
                {singleView ? 'Your Shake' : 'All Shakes'}
            </Typography>
            {singleView ? (
                shakeData && renderShakeDetails(shakeData)
            ) : (
                shakeData.map((shake) => renderShakeDetails(shake))
            )}
            <ShakeContent shakeData={shakeData}/>
            <ShakeReviews shakeData={shakeData}/>
        </Container>
    )
}