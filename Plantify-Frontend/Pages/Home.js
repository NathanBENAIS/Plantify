import React, { useState } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent, Modal, Box, TextField, InputLabel, MenuItem, FormControl, Select, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#e8f5e9', 
    padding: theme.spacing(4),
  },
  card: {
    backgroundColor: '#a5d6a7', 
    boxShadow: 'none',
    borderRadius: 8,
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
  cardMedia: {
    height: 150,
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.1)', 
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)', 
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    maxWidth: 600,
    width: '80%',
    textAlign: 'center',
    position: 'relative',
  },
  popupImage: {
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    marginBottom: theme.spacing(2),
  },
  popupTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    fontSize: '1.5rem',
  },
  popupDescription: {
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    gap: theme.spacing(2), 
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  selectCategory: {
    minWidth: 150,
    backgroundColor: '#e8f5e9',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const recipes = [
  { id: 1, name: 'Recette 1', image: 'image1.jpg', category: 'Maladie', description: 'Description détaillée de la recette 1' },
  { id: 2, name: 'Recette 2', image: 'image2.png', category: 'Beauté', description: 'Description détaillée de la recette 2' },
  { id: 3, name: 'Recette 3', image: 'image3.jpg', category: 'Bien-être', description: 'Description détaillée de la recette 3' },
  { id: 4, name: 'Recette 4', image: 'image4.jpg', category: 'Relaxation', description: 'Description détaillée de la recette 4' },
];

const MedicinalRecipesApp = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || recipe.category === selectedCategory)
  );

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <TextField
          label="Rechercher"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
          className={classes.searchBar}
        />
        <FormControl variant="outlined" size="small" className={classes.selectCategory}>
          <InputLabel id="category-select-label">Catégorie</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Catégorie"
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="Maladie">Maladie</MenuItem>
            <MenuItem value="Beauté">Beauté</MenuItem>
            <MenuItem value="Bien-être">Bien-être</MenuItem>
            <MenuItem value="Relaxation">Relaxation</MenuItem>
            <MenuItem value="Constipation">Constipation</MenuItem>
            <MenuItem value="Pousse cheveux">Pousse cheveux</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={3} key={recipe.id}>
            <Card className={classes.card} onClick={() => handleOpen(recipe)}>
              <CardMedia
                component="img"
                src={`../images-provisoire/${recipe.image}`}
                title={recipe.name}
                className={classes.cardMedia}
              />
              <CardContent>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2" color="textSecondary">{recipe.category}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
      >
        <Box className={classes.modalContent}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {selectedRecipe && (
            <>
              <img
                src={`images-provisoire/${selectedRecipe.image}`}
                alt={selectedRecipe.name}
                className={classes.popupImage}
              />
              <Typography id="popup-title" className={classes.popupTitle}>{selectedRecipe.name}</Typography>
              <Typography id="popup-description" className={classes.popupDescription}>{selectedRecipe.description}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MedicinalRecipesApp;
