import React, { useState, useRef, useEffect } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../browse/Navbar/Navbar";
import { API_KEY } from "../browse/API/getAPI";
import YouTube from "react-youtube";

const Search = () => {
  //  ----------------- DETAIL--------------------

  // ----------------- DETAIL MOVIE SEARCH-----------------
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const [moviesIDSearch, setMoviesIDSearch] = useState(null);
  // --------------- get data movies detail-----------

  const [moviesDetail, setMoviesDetail] = useState([]);

  const MovieDetailAPI = `https://api.themoviedb.org/3/movie/${moviesIDSearch}/videos?api_key=${API_KEY}`;
  // console.log(MovieDetailAPI);
  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const responseDetail = await fetch(`${MovieDetailAPI}`);
        const responseDataDetail = await responseDetail.json();
        // setMoviesDetail(responseDataDetail.results);
        setMoviesDetail(
          responseDataDetail.results[
            Math.floor(Math.random() * responseDataDetail.results.length)
          ]
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataDetail();
  }, [MovieDetailAPI]);
  const [movieView, setMovieView] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

  function handleClick(data) {
    setShowDetail(!showDetail);
    setMoviesIDSearch(data.id.toString());
    setMovieView(data);
    console.log(data);
  }

  // ---------------- DATA INPUT FORM--------------
  const [dataInput, setDataInput] = useState("");
  const [moviesTemps, setMoviesTemps] = useState("");
  const [data, setData] = useState([]);
  const DataInput = (event) => {
    event.preventDefault();
    setDataInput(moviesTemps);
  };
  const resetInput = () => {
    setDataInput("");
    setMoviesTemps("");
    setShowDetail(false);
  };

  // ---------------------API SEARCH-------------
  const APISearch = `https://api.themoviedb.org/3/search/movie?query=${dataInput}&api_key=${API_KEY}`;
  // console.log(APISearch);
  useEffect(() => {
    const fetchDataSearch = async () => {
      const dataSearch = await fetch(`${APISearch}`);
      const responseDataSearch = await dataSearch.json();
      setData(responseDataSearch.results);
      // console.log(responseDataSearch.results);
    };
    fetchDataSearch();
  }, [APISearch]);

  return (
    <div className="search-container">
      <Navbar />
      <div className="input-container">
        <div className="form-input-container">
          <input
            type="text"
            className="form-input"
            placeholder="Search here !!!"
            name="input-keywords"
            value={moviesTemps}
            onChange={(event) => setMoviesTemps(event.target.value)}
          ></input>
          <FontAwesomeIcon id="icon-search-input" icon={faMagnifyingGlass} />
        </div>

        <div className="btn-input-container">
          <button className="btn-input" id="btn-reset" onClick={resetInput}>
            RESET
          </button>
          <button className="btn-input" id="btn-search" onClick={DataInput}>
            SEARCH
          </button>
        </div>
      </div>
      <div className="show-detail-container ">
        {showDetail && (
          <div>
            {showDetail && (
              <div className="show-detail-container">
                <div className="show-detail-context">
                  <h2>{movieView.title}</h2>
                  <div className="show-detail-content">
                    <p className="view-detail-content">
                      <strong>Release Date: {movieView.release_date}</strong>
                    </p>
                    <p className="view-detail-content">
                      <strong> Vote: {movieView.vote_average}/10</strong>
                    </p>
                    <p>{movieView.overview}</p>
                  </div>
                </div>
                <div className="show-detail-video">
                  {moviesDetail.key ? (
                    <YouTube videoId={moviesDetail.key} opts={opts} />
                  ) : (
                    <img src={movieView.backdrop_path} alt="Backdrop" />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <h3>Search Results</h3>

      <div className="search-form">
        {data.map((data) => (
          <div className="search-item" key={data.id}>
            <img
              className="img-search"
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w1280/${data.poster_path}`
                  : "../noImg.png"
              }
              alt={data.title}
              onClick={() => handleClick(data)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
