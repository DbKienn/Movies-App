import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

import "./Banner.css";
const API_KEY = "7be9132e5315a716dcb696ccdce28127";
// ---------------btn click search FUNCTION -----------------

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
      // console.log(response);
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <div
        className="nav-banner-container"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgb(29, 29, 29),
            rgba(199, 198, 197, 0)
          ),url(https://image.tmdb.org/t/p/w1280/${bannerData.backdrop_path})`,
          height: "500px",
          width: "100%",
        }}
      >
        {/* -------------- NAV-------------- */}
        <Navbar />

        {/* ------------banner---------------- */}
        <div className="banner-container">
          <div className="banner-grid-container">
            <div className="banner-container-content">
              <h1 className="banner-content">{bannerData.name}</h1>

              <div className="banner-content">
                <button className="btn btn-banner ">Play</button>
                <button className="btn btn-banner"> My List</button>
              </div>
              <p>{bannerData.overview}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
