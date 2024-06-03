
import { Typography, Box, Button } from '@mui/material'

export default function ProfileCard(owner, userId, navigate) {

    return (
        <>
            {owner.id === userId ? (
                <>
                    <Box className='profile-image' id='home'
                        sx={{ borderRadius: '50%' }}
                        component='img'
                        alt='user image'
                        src={owner.image} />
                    <Typography>
                        You
                    </Typography>
                </>
            ) : (
                <>
                    <Button sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', pb: 4 }}
                        onClick={() => navigate('/profile')}>
                        <Box className='profile-image' id='home'
                            sx={{ borderRadius: '50%' }}
                            component='img'
                            alt='user image'
                            src={owner.image} />
                        <Typography>
                            {owner.username}
                        </Typography>
                    </Button>
                </>
            )}
        </>
    )
}