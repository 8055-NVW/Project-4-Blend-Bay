import { useParams } from 'react-router-dom'
import { getToken } from '../../lib/auth'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Custom Components
import ConfirmDelete from '../elements/ConfirmDelete'


// Material UI Imports
import { Container, Box, Typography, Rating } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress'
import ReviewsIcon from '@mui/icons-material/Reviews'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'



export default function ShakeReviews({ shakeData, reloadReviewData , userId}) {

    //FOR  Material UI FORM DIALOGUE
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }
    // console.log(shakeData.reviews)
    // console.log(userId)

    const { shakeId } = useParams()
    const [reviewData, setReviewData] = useState({
        text: '',
        rating: 0,
        shake: shakeId
    })

    function handleChange(e) {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value })
        // console.log(e.target.name,e.target.value)
    }

    const handleSubmit = async () => {
        try {
            await axios.post(`/api/reviews/`, reviewData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            handleClose()
            reloadReviewData()
            setReviewData({text: '',
            rating: 0,
            shake: shakeId})
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <Box sx={{ 
                boxShadow: 3, 
                borderRadius: 1, 
                pt: 0, 
                my: 3, 
                pb: 3 ,
                backgroundColor: 'rgba(254, 254, 254, 0.955)'}}>
            <ReviewsIcon sx={{ fontSize: 60, mt: 1 }} />
            <Container>
                {shakeData ? (
                    shakeData.reviews.length > 0 ? (
                        shakeData.reviews.map((review) => {
                            const { owner, text, created_at, rating, id } = review
                            return (
                                <Box key={id} sx={{ my: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                    <Typography variant="h6">{owner.username}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>{text}</Typography>
                                    {/* converted to .localeDateString() ...new for cleaner format */}
                                    <Typography variant="body2" sx={{ color: 'gray' }}>{new Date(created_at).toLocaleDateString()}</Typography>
                                    <Rating value={rating} readOnly size="medium" />
                                    {/* Custom Component to Delete */}
                                    {owner.id === userId && 
                                    <Box>
                                        <ConfirmDelete id={id} type='review' reloadReviewData={reloadReviewData} />
                                    </Box>
                                    }
                                </Box>
                            )
                        })
                    ) : (
                        <Typography variant="h6">No reviews added yet.</Typography>
                    )
                ) : (
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </Container>
                )}
            </Container>
            {/* NEW */}
            <Container>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add a Review
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleSubmit()
                        }
                    }}
                >
                    <DialogTitle>Add a Review</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your unique shake experience counts. Share your personal taste adventure with us!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="normal"
                            id="name"
                            name="text"
                            label="Shake things up with a review!"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={reviewData.text}
                            onChange={handleChange}
                        />
                        <Box sx={{ '& > legend': { mt: 2 }, }}>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="rating"
                                value={reviewData.rating}
                                onChange={(_, value) => setReviewData({ ...reviewData, rating: value })}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Review</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    )
}

