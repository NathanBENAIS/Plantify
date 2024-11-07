import React from 'react';
import { Card, CardMedia, CardContent, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.image}
          title={recipe.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.category}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContent}>
          <Typography id="simple-modal-title" variant="h4">
            {recipe.name}
          </Typography>
          <Typography id="simple-modal-description" variant="body1">
            {recipe.description}
          </Typography>
        </div>
      </Modal>
    </>
  );
};

export default RecipeCard;