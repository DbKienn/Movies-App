import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Browse..css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// --------------- KEY API -------------------
const API_KEY = "7be9132e5315a716dcb696ccdce28127";

// ----------------- GET API LINKS --------------
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
// ------------- BANNER MOVIES -----------------

const Banner = () => {
  // Khởi tạo state để lưu dữ liệu đến từ API
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      const responseData = await response.json();
      setBannerData(
        responseData.results[
          Math.floor(Math.random() * responseData.results.length - 1)
        ]
      );
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>{bannerData.name}</h1>;<h2>{bannerData.first_air_date}</h2>
      <img style={{ width: "100%" }} src={bannerData.poster_path}></img>
    </div>
  );
};

// --------------------- test lay 1 api ------------------------
function Browse() {
  // ---------------btn click search FUNCTION -----------------
  const ButtonClick = () => {
    console.log("loadDataMovies");
  };

  return (
    <div className="app">
      {/* -----------------NAVBAR-------------- */}
      <div className="nav-container">
        <h1>Movie App</h1>
        <button className="btn btn-search" onClick={ButtonClick}>
          <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
        </button>
      </div>
      <Banner />
    </div>
  );
}

export default Browse;
