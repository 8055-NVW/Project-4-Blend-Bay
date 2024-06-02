import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Material UI Imports
import { TextField, Button, Typography, Container, Box, Select, MenuItem, Chip } from '@mui/material'
import ImageUpload from '../elements/ImageUpload'
import FormPage from './FormPage.jsx'
import IngredientsInput from './IngredientsInput.jsx'

export default function ShakeForm({ title, request, onLoad }) {
  const navigate = useNavigate()
  const { shakeId } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    image: 'https://res.cloudinary.com/drdpt4mru/image/upload/v1717173388/Project-4%20GA/kibltebecibzdmdac5yf.jpg',
    calories: '',
    ingredients: [],
    instructions: '',
    categories: [],
    owner: ''//using this as im returning the owner as a dictionary not pk(populated)
  });
  const [error, setError] = useState('')
  const [allCategories, setAllCategories] = useState([])


// DYNAMICALLY ADD OR UPDATE SHAKE
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const formDataWithOwner = { ...formData, owner: formData.owner}
      const { data: { id } } = await request(formDataWithOwner)

      navigate(`/shake/${id}`);
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data.message)
    }
  }

  // HANDLE CHANGE IN INPUT FIELDS
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null)
  }

  // DYNAMICALLY ADD OR REMOVE CATEGORIES
  function handleCategoriesChange(e) {
    setFormData({ ...formData, categories: e.target.value })
  }


  // GET ALL CATEGORIES
  useEffect(() => {
    async function getAllCategories() {
      try {
        const { data } = await axios.get('/api/categories/')
        setAllCategories(data)
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllCategories()
  }, [])

  //GET EXISTING SHAKE DATA FOR UPDATE
  useEffect(() => {
    async function getShakeData() {
      try {
        const { data } = await axios.get(`/api/shakes/${shakeId}/`)
        setFormData({...data, 
        categories: data.categories.map(category => category.id)
        ,owner: data.owner.id
        })
      } catch (error) {
        console.log(error)
        setError(error.response.data)
      }
    }
    if (onLoad) {
      getShakeData()
    }
  }, [shakeId])

  return (
    <FormPage>
      <Typography variant='h5'>
        {title} Shake
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
        <ImageUpload formData={formData} setFormData={setFormData} />
        <TextField
          type="number"
          label="Calories"
          name="calories"
          variant="standard"
          value={formData.calories}
          onChange={handleChange}
          fullWidth
          margin="normal" />
        <IngredientsInput
          ingredients={formData.ingredients}
          setIngredients={(ingredients) => setFormData({ ...formData, ingredients })}/>
        <TextField
          type="text"
          label="Instructions"
          name="instructions"
          variant="standard"
          value={formData.instructions}
          onChange={handleChange}
          fullWidth
          margin="normal" />
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
            {title === 'Add' ? 'Add Shake' : 'Update Shake'}
          </Button>
        </Container>
      </form>
    </FormPage>
  )
}