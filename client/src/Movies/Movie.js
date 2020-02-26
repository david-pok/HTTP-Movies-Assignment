import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Movie(props) {
  console.log('movie props', props)
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => {
        console.log('delete res', res);
        props.setMovieList(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Button>
        <Link to={`/update-movie/${match.params.id}`}>Update</Link>
      </Button>
      <Button onClick={deleteMovie}>Delete</Button>
    </div>
  );
}

export default Movie;
