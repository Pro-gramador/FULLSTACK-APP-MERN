import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { MovieCard } from "../../Components/MovieCards";
import { PaginationBar } from "../../Components/Pagination";
import { ListBar } from "../../Components/ListBarComponent";
import { useGenres } from "../../Hooks/index";


const MoviesContainer = () => {
  const [movies, setMovies] = useState([]);

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [paginationNum, setPaginationNum] = useState(0);

  const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE; 

  const genreforURL = useGenres(selectedGenres);

  const getMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNum}&with_genres=&language=en-US&with_genres=${genreforURL}`
    );
    setMovies(data.results);
    setPaginationNum(data.total_pages);
    console.log(data.results);
  };

  useEffect(() => {
    getMovies();
    //eslint-disable-next-line
  }, [pageNum, genreforURL]);

  const handleClick = (number) => {
    setPageNum(number);
  };

  useEffect(() => {
    console.log("Trending Component did mount");
    getMovies();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMovies();
    //eslint-disable-next-line
  }, [pageNum]);

  return (
    <main className="homePage">
      <Container>
        <Row>
          <Col className="col-12">
            <section>
              <h1 className="text-center">Top Trending Movies</h1>
              <div className="hr_container">
                <hr />
              </div>
            </section>
          </Col>
        </Row>
        <Row>
          <Col className="col-2">
            <ListBar
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              setGenres={setGenres}
              type="movie"
              setPage={setPageNum}
            />
          </Col>
          <Col className="col-10">
            <Row>
              {movies && movies.length > 0
                ? movies.map((movie) => {
                    return (
                      <MovieCard
                        key={movie.id}
                        data={movie}
                        mediaType="movie"
                      />
                    );
                  })
                : "Loading Content, Please Wait"}

              {paginationNum && paginationNum > 1 ? (
                <PaginationBar
                  maxnum={paginationNum}
                  activenum={pageNum}
                  handleClick={handleClick}
                />
              ) : (
                ""
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MoviesContainer;
