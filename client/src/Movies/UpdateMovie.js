import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      width: 500,
      margin: "auto"
    }
  },
  formItems: {
    marginTop: 5
  }
}));

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

export default function UpdateMovie(props) {
  console.log("update props", props);
  const classes = useStyles();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();

  useEffect(() => {
    const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, id]);

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
    }
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log("update res", res);
        props.getMovieList();
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          className={classes.formItems}
          value={movie.title}
          label="Title"
          name="title"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={classes.formItems}
          value={movie.director}
          label="Director"
          name="director"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={classes.formItems}
          value={movie.metascore}
          label="Metascore"
          name="metascore"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={classes.formItems}
          value={movie.stars}
          label="Stars"
          name="stars"
          onChange={handleChange}
          multiline
          fullWidth
        />
        <Button
          className={classes.formItems}
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
        >
          Update!
        </Button>
      </form>
    </div>
  );
}
