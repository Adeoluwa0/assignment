import "./App.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "./search";

function App() {
  const [books, setBooks] = useState(null);
  const [content, setContent] = useState([]);

  const [query, setquery] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      "https://www.anapioficeandfire.com/api/books?page=1&pageSize=10"
    );

    setBooks(response.data);
  };

  const submit = (e) => {
    e.preventDefault();
    //getMovie();
  };
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://www.anapioficeandfire.com/api/characters`
      );
      setContent(data.results);
      // setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/search" component={Search} />
        </Switch>

        <h1>Game of Thrones Books</h1>
        <h2>Fetch a list from an API and display it</h2>
        <form className="app__searchForm">
          <div className="search">
            <input
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setquery(e.target.value)}
            />
            <button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              {/* <SearchIcon fontSize="large" /> */}
            </button>
          </div>
        </form>

        {/* Fetch data from API */}
        <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
          </button>
          <br />
        </div>

        {/* Display data from API */}
        <div className="books">
          {books &&
            books.map((book, index) => {
              const cleanedDate = new Date(book.released).toDateString();

              return (
                <div className="book" key={index}>
                  <h3>Book {index + 1}</h3>
                  <h2>{book.publisher}</h2>

                  <div className="details">
                    <p>{book.name}</p>
                    <p>{book.isbn} </p>
                    <p>{book.authors}</p>
                    <p>{cleanedDate}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
