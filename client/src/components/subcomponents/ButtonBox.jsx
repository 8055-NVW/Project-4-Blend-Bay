import { useNavigate } from "react-router-dom"

// Material UI imports
import { Container, Typography, Box, Button } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function ButtonBox({ id, singleView, userId, ownerId }) {

    const navigate = useNavigate()
    // console.log(ownerId)
    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {!singleView ? (
                <>
                    {userId !== ownerId ? (
                        <>
                            <Button variant='contained' onClick={() => navigate(`/shake/${id}`)}><FavoriteBorderIcon /></Button>
                            <Button variant='contained' onClick={() => navigate(`/shake/${id}`)}><OpenInFullIcon /></Button>
                        </>
                    ) : (
                        <>
                            <Button variant='contained' onClick={() => navigate(`/updateshake/${id}`)}><EditIcon /></Button>
                            <Button variant='contained' onClick={() => navigate(`/shake/${id}`)}><OpenInFullIcon /></Button>
                        </>
                    )
                    }
                </>
            ) : (
                <>
                    {userId !== ownerId ? (
                        <Box sx={{width: '100%', display: 'block'}}>
                            <Button variant='contained'   onClick={() => navigate(`/shake/${id}`)}><FavoriteBorderIcon /></Button>
                        </Box>
                    ) : (
                        <>
                            <Button variant='contained' onClick={() => navigate(`/updateshake/${id}`)}><EditIcon /></Button>
                            <Button variant='contained' onClick={() => navigate(`/shake/${id}`)}><DeleteIcon /></Button>
                        </>
                    )}
                </>
            )
            }
        </Container >
    )
}