import { Container, Box, Typography, List, ListItem, ListItemText } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress'
import BlenderIcon from '@mui/icons-material/Blender';

export default function ShakeContent({ shakeData }) {
    return (
        <Box sx={{ boxShadow: 3, borderRadius: 5, pt: 1, my: 3 }}>
            {shakeData ? (
                <>
                    <Container>
                        <BlenderIcon sx={{ fontSize: 60 }} />
                        <Typography variant="h5">Ingredients</Typography>
                        <List>
                            {shakeData.ingredients.map((ingredient, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={ingredient} />
                                </ListItem>
                            ))}
                        </List>
                    </Container>
                    <Container sx={{ my: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        <Typography variant="h5">Instructions</Typography>
                        {<Typography variant="body1">{shakeData.instructions}</Typography>}
                    </Container>
                </>
            ) : (
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Container>
            )}
        </Box>
    )
}

