import { TextField, IconButton, Box , Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export default function IngredientInput({ ingredients, setIngredients }) {
  const handleAdd = () => {
    setIngredients([...ingredients, ''])
  }
  
  const handleRemove = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }
  
  const handleChange = (index, value) => {
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? value : ingredient
    )
    setIngredients(updatedIngredients)
  }

  return (
    <Box label='Something'>
                <TextField
          id="standard-read-only-input"
          label="Ingredients"
          defaultValue="eg. 1 Scoop - Invisible Ice Cream"
          fullWidth
          disabled     
          variant="standard"
        />
      {ingredients.map((ingredient, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            type="text"
            label={`Ingredient ${index + 1}`}
            variant="standard"
            value={ingredient}
            onChange={(e) => handleChange(index, e.target.value)}
            fullWidth
          />
          <IconButton onClick={() => handleRemove(index)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}