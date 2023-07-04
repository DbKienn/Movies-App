import { useState, useEffect } from "react";
import "./TaskFormOriginal.css";
import YouTube from "react-youtube";
import { API_KEY } from "../API/getAPI";

const TaskFormOriginal = (props) => {
  //-------------- Movies Detail -------------
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  // ------- getID form data map--------
  const [moviesID, setMoviesID] = useState(null);
  // --------------- get data movies detail-----------
  const [moviesDetail, setMoviesDetail] = useState([]);

  const MovieDetailAPI = `https://api.themoviedb.org/3/movie/${moviesID}/videos?api_key=${API_KEY}`;
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

  // --------------- SHOW DETAIL------------
  const [showDetail, setShowDetail] = useState(false);
  const [movieView, setMovieView] = useState([]);

  function handleClick(data) {
    setShowDetail(!showDetail);
    setMoviesID(data.id.toString());
    setMovieView(data);
    console.log(data);
  }
  // --------------- get API------------

  const [data, setdata] = useState([]);
  const urlAPI = `https://api.themoviedb.org/3${props.requestUrl}`;
  // console.log(urlAPI);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlAPI}`);
        const responseData = await response.json();
        setdata(responseData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [urlAPI]);
  return (
    <div>
      <div className="task-form-grid">
        {data.map((data) => (
          <div className="task-item" key={data.id}>
            <img
              className="img-task-original"
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
      <div className="show-detail-container">
        {showDetail && (
          <div>
            {showDetail && (
              <div className="show-detail-container">
                <div className="show-detail-context">
                  <h2>{movieView.name}</h2>
                  <div className="show-detail-content">
                    <p className="view-detail-content">
                      <strong>Release Date: {movieView.first_air_date}</strong>
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
    </div>
  );
};
export default TaskFormOriginal;
