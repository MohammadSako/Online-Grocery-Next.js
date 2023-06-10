import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const Search = (props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      //this timer prevents sending request for every keystrock, but sending only when stop typing.
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://react-revision-b6178-default-rtdb.firebaseio.com/ingredients.json" +
            query,
          "GET"
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }; //this cleans up every a new run, and this cleans up the old timer before it sets a new one.
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  //Search Handler
  const searchHandeler = (e) => {
    setEnteredFilter(e.target.value);
  };

  return (
    <Form className="d-flex">
      <Form.Control
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        ref={inputRef}
        type="text"
        value={enteredFilter}
        onChange={searchHandeler}
      />

      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default Search;
