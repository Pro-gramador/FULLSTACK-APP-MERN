/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./details.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { img_300, img_not_available } from "../../config";
import axios from "axios";

const DetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [video, setVideo] = useState();
  const titleName =
    movie && movie.name && movie.name !== ""
      ? movie.name
      : movie && movie.title && movie.title !== ""
      ? movie.title
      : "";

  const id = params.movieid;
  const mediatype = params.mediatype; //si no me funciona es porque debo revisar la forma en que nombré mediatype en routes
  const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

  // Promesas al servidor--------------------------------------------------------------
  const fetchMovie = async () => {
    try {
      const { data } = await axios(
        `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(data);
    } catch (error) {
      console.error();
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios(
        `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error();
    }
  };
  //-----------------------------------------------------

  useEffect(() => {
    fetchMovie();
    fetchVideo();
  }, []);

  const Button = () => {
    return (
      <>
        <button type="button" className="buttonSubmit btn btn-primary d-flex ">
          Submit
        </button>
      </>
    );
  };

  const movieDetails = () => {
    const imgURL = movie.poster_path
      ? img_300 + movie.poster_path
      : img_not_available;
    const tagline = movie.tagline;
    const vote_average = parseInt(movie.vote_average);
    const original_language = movie.original_language;
    const adult = !movie.adult ? "10+" : "18+";
    const overview = movie.overview;
    const first_air_date = movie.first_air_date || movie.release_date;
    const genres =
      movie.genres && movie.genres.length > 0
        ? movie.genres.map((item) => <span key={item.id}>{item.name}</span>)
        : "no genres found";
    return (
      <Row>
        <Col className="col-12">
          <h1 className=" mb-5">
            {titleName}
            {tagline && tagline !== "" ? <small>{tagline}</small> : ""}
          </h1>
        </Col>
        <Col className="col-12 col-xl-6">
          <div className="card card--details">
            <div className="card__cover">
              <img src={imgURL} alt="movie img" />
            </div>
            <div className="card__content">
              <div className="card__wrap">
                <span className="card__rate">{vote_average}</span>

                <ul className="card__list">
                  <li>{original_language}</li>
                  <li>{adult}</li>
                </ul>
              </div>
              <ul className="card__meta">
                <li>
                  <span>Genre:</span>
                  <span className="linkTag">{genres}</span>
                </li>
                <li>
                  <span>Type:</span>
                  <span className="linkTag">{mediatype}</span>
                </li>
                <li>
                  <span>Release year:</span>
                  <span className="linkTag">{first_air_date}</span>
                </li>
              </ul>
              <div className="description_readmore_wrapper">
                <span>Description:</span>
                <span className="description">{overview}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-12 col-xl-6">
          <div className="frameSec">
            <iframe
              width="100%"
              height="350px"
              src={`https://www.youtube.com/embed/${video}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
        <Col className="col-6 mt-5 d-xl-flex bg-white m-auto w-100 h-auto">
          <div className=" align-self-auto bg-white w-50 h-100">
            <h1 className="comments">Comment Here</h1>
            <textarea
              className="comentInput"
              type="text"
              placeholder="comment"
            ></textarea>
            <Button />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <main>
      <div className="detailsPage">
        <Container>
          {titleName && titleName !== "" ? (
            movieDetails()
          ) : (
            <p className="text-center">Loading content...</p>
          )}
        </Container>
      </div>
    </main>
  );
};

export default DetailsPage;
