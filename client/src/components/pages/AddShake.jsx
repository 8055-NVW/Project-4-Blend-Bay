import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getToken } from '../../lib/auth.js'
import axios from 'axios'

import ImageUpload from '../elements/ImageUpload'

// Material UI Imports
import {TextField,Button,Typography,Container,Box,Select,MenuItem,Chip} from '@mui/material'
import { styled } from '@mui/material/styles'

const FormContainer = styled('div')({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

export default function ShakeForm() {
    const navigate = useNavigate()
    const { shakeId } = useParams()

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        calories: '',
        ingredients: [],
        instructions: '',
        categories: []
    })
    const [error, setError] = useState('')
    const [allCategories, setAllCategories] = useState([])

    const headers = {headers: {authorization: `Bearer ${getToken()}`}}

    useEffect(() => {
        async function fetchData() {
            try {
                const categoriesResponse = await axios.get('/api/categories/');
                setAllCategories(categoriesResponse.data);

                if (shakeId) {
                    const { data } = await axios.get(`/api/shake/${shakeId}/`);
                    setFormData({
                        ...data,
                        ingredients: data.ingredients.join(', '),
                    });
                }
            } catch (error) {
                console.log(error);
                setError(error.response?.data)
            }
        }
        fetchData();
    }, [shakeId]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError(null)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            
            const { data: { id } } = await axios.post('/api/shakes/', formData, headers)
            console.log(id)
            navigate(`shake/${id}/`)
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    function handleIngredientsChange(e) {
        const ingredientsArray = e.target.value.split(',').map(item => item.trim())
        setFormData({ ...formData, ingredients: ingredientsArray })
    }

    function handleCategoriesChange(e) {
        setFormData({ ...formData, categories: e.target.value })
    }


    return (
        <FormContainer>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 'sm',
                boxShadow: 3,
                borderRadius: 4,
            }}>
                <Typography variant='h5'>
                    {/*Title of page */}
                    Add Shake
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        label="Shake Name"
                        name="name"
                        variant="standard"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal" />
                    <ImageUpload formData={formData} setFormData={setFormData}/>
                    <TextField
                        type="number"
                        label="Calories"
                        name="calories"
                        variant="standard"
                        value={formData.calories}
                        onChange={handleChange}
                        fullWidth
                        margin="normal" />
                    <TextField
                        type="text"
                        label="Ingredients"
                        name="ingredients"
                        variant="standard"
                        value={formData.ingredients.join(', ')}
                        onChange={handleIngredientsChange}
                        fullWidth
                        margin="normal"
                        helperText="Enter ingredients separated by commas" />
                    <TextField
                        type="text"
                        label="Instructions"
                        name="instructions"
                        variant="standard"
                        value={formData.instructions}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"/>
                    <Select
                        multiple
                        value={formData.categories}
                        onChange={handleCategoriesChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={allCategories.find((category) => category.id === value)?.name} />))}
                            </Box>)}
                        fullWidth>
                        {allCategories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>))}
                    </Select>
                    <Container sx={{ textAlign: 'center', pt: 2 }}>
                        <>
                        {error && (
                            <Typography
                                variant="body1">
                                {error}
                            </Typography>
                        )}
                        </>
                        <Button type="button" variant="contained" color='secondary' sx={{ my: 3 }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color='primary' sx={{ my: 3 }}>
                            Add
                        </Button>
                    </Container>
                </form>
            </Container>
        </FormContainer>

    )
}