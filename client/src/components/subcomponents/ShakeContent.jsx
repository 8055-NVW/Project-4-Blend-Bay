import { Container, Box, Typography, List, ListItem, ListItemText } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress'
import BlenderIcon from '@mui/icons-material/Blender';

export default function ShakeContent({ shakeData }) {
    return (
        <Box sx={{ 
                boxShadow: 3, 
                borderRadius: 1, 
                pt: 1, 
                my: 3 ,
                backgroundColor: 'rgba(254, 254, 254, 0.955)'}}>
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
                    <Container sx={{ my: 2, pt:2, pb:1 ,border: '2px solid #ccc', borderRadius: 1 }}>
                        <Typography variant="h5">Instructions</Typography>
                        {<Typography variant="body1" sx={{my:3}}>{shakeData.instructions}</Typography>}
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

