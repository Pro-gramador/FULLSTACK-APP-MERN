import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { MovieCard } from "../../Components/MovieCards";
import { PaginationBar } from "../../Components/Pagination";
import SearchBar from "./SearchBar";


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [paginationNum, setPaginationNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

  const getMovies = async (query = "") => {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageNum}`;
    //condición para hacer búsquedas en el searchBar
    if (query) {
      url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${pageNum}`;
    }

  const { data: { results, total_pages } } = await axios.get(url);
    setMovies(results);
    setPaginationNum(total_pages);
  };

  const handleClick = (number) => {
    setPageNum(number);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNum(1);
  };

  useEffect(() => {
    getMovies(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, searchQuery]);

  return (
    <main className="homePage">
      <Container>
        <Row>
          <Col className="col-12">
            <section>
              <h1 className="text-center">
                Latest Movies and TV shows on The Market
              </h1>
              <h4 className="text-center">
                You can watch it now <span className="free">for free!</span>
              </h4>
            </section>
            <div className="hr_container">
              <hr />
            </div>
          </Col>
          <SearchBar handleSearch={handleSearch} />
          {movies && movies.length > 0 ? (
            movies.map((movie) => {
              return <MovieCard key={movie.id} data={movie} />;
            })
          ) : (
            <h3 className="text-center mt-4 ">Loading content, please wait</h3>
          )}

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
      </Container>
    </main>
  );
};

export default HomePage;
