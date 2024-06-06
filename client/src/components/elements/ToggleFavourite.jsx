import { useState, useEffect } from 'react'
import { getToken } from '../../lib/auth'
import axios from 'axios'

// MATERIAL UI IMPORTS
import { Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function ToggleFavourite({ shakeId, likedStatus }) {

    const [liked, setLiked] = useState(likedStatus);

    useEffect(() => {
        setLiked(likedStatus)
    }, [likedStatus])

    const toggleFavourite = async () => {
        try {
            const data = await axios.patch(`/api/shakes/${shakeId}/favourite/`,{}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            console.log(data)
            setLiked(!liked)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button
            sx={{ margin: '0.5rem' }}
            variant={liked ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<FavoriteIcon />}
            onClick={toggleFavourite}
        >
            {liked ? 'Liked' : 'LIKE'}
        </Button>
    )
}
