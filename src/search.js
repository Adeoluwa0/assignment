import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://www.anapioficeandfire.com/api/characters/`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="search">
        <input
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          Search
        </button>
      </div>

      <div className="trending">
        {content &&
          content.map((book) => {
            <div className="details">
              {book.publisher}
              <p>{book.name}</p>
              <p>{book.isbn} </p>
              <p>{book.authors}</p>
              <p>{book.released.toDateString()}</p>
            </div>;
          })}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
    </div>
  );
};

export default Search;
