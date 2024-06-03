import { useNavigate } from "react-router-dom"

// Material UI imports
import { Container, Box, Button } from '@mui/material'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import EditIcon from '@mui/icons-material/Edit'
import ConfirmDelete from '../elements/ConfirmDelete'
import ToggleFavourite from "../elements/ToggleFavourite";

export default function ButtonBox({ id, singleView, userId, ownerId , favourites}) {

    const navigate = useNavigate()
    // console.log(favourites.includes(userId))
    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {!singleView ? (
                <>
                    {userId !== ownerId ? (
                        <>  
                            <ToggleFavourite shakeId={id} likedStatus={favourites.includes(userId)} />
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
                        <Box sx={{ width: '100%', display: 'block' }}>
                            <ToggleFavourite shakeId={id} likedStatus={favourites.includes(userId)} />
                        </Box>
                    ) : (
                        <>
                            <Button variant='contained' onClick={() => navigate(`/updateshake/${id}`)}><EditIcon /></Button>
                            <ConfirmDelete id={id} type='shake'/>
                        </>
                    )}
                </>
            )
            }
        </Container >
    )
}