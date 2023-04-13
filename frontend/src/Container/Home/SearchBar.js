import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export const SearchBar = ({ handleSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    handleSearch(searchValue);
  };

  return (
    <div className="search-container">
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search"
        className="mr-2 my-2"
        name="search"
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
    </div>
  );
};

export default SearchBar;