import { useState, forwardRef } from 'react';
import { useNavigate } from "react-router-dom"
import { getToken } from '../../lib/auth'
import axios from 'axios';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

//Slide in Transition
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

export default function AlertDialogSlide({id, type, reloadReviewData}) {

    const navigate = useNavigate()

    // DIALOGUE LOGIC
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const endpoint =()  => {
        if (type === 'shake') {
            return `/api/shakes/${id}/`
        }
        if (type === 'review') {
            return `/api/reviews/${id}/`
        }
    }

    // DELETE LOGIC
    async function deleteShake() {
        try {
            await axios.delete(endpoint(), {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            
            handleClose()

            if (type === 'review') {
                reloadReviewData()
            }
            else{
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Are You sure you want to delete this {type} ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteShake}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}