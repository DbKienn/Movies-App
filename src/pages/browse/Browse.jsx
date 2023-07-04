import "./Browse..css";
import "./default.css";
import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";
function Browse() {
  // ---------------btn click search FUNCTION -----------------
  return (
    <div className="app">
      {/* -----------------NAVBAR-------------- */}
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
