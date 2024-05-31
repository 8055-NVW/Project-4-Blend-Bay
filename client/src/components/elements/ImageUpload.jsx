import { useState } from 'react'
import axios from 'axios'

import {Button, Input, Box} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'


export default function ImageUpload({ formData, setFormData , profile}){

  const [error, setError] = useState('')

  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
  const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL

  async function handleUpload(e){
    const form = new FormData() // Creates empty for to append rows to
    form.append('file', e.target.files[0]) // This appends a key value pair to the form, called file, adding the file we uploaded to the field
    form.append('upload_preset', uploadPreset)
    try {
      const { data } = await axios.post(uploadUrl, form)
      setFormData({ ...formData, image: data.secure_url })
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <>
        { formData.image && <Box sx={{textAlign:'center'}}><img className={profile ? 'profile-image':'shake-image'} src={formData.image} alt="Uploaded image" /></Box>}
        <Button
            variant="contained"
            component="label"
            fullWidth
            startIcon={<PhotoCamera />}>
                Add a Picture
            <Input
                type="file"
                name="image"
                onChange={handleUpload}
                hidden
                inputProps={{ accept: 'image/*' }}
                sx={{ display: 'none' }} />
        </Button>
        {error && <p className='text-danger'>{ error }</p>}

      {/* { formData.image && <img src={formData.image} alt="Uploaded image" />}
      <label hidden htmlFor="image">Image</label>
      <input type="file" name="image" id="image" onChange={handleUpload} />
      {error && <p className='text-danger'>{ error }</p>} */}
    </>
  )
}