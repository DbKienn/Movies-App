import { requests } from "../API/getAPI";
import "./MovieList.css";
import TaskFormOriginal from "../TaskFormOriginal/TaskFormOriginal";
import TaskForm from "../TaskForm/TaskForm";
const MovieList = () => {
  return (
    <div className="task-original">
      <h2 className="task-original-content">Original</h2>
      <TaskFormOriginal requestUrl={requests.fetchNetflixOriginals} />
      <h2 className="task-original-content">Trending</h2>
      <TaskForm requestUrl={requests.fetchTrending} />
      <h2 className="task-original-content">Top Rated</h2>
      <TaskForm requestUrl={requests.fetchTopRated} />
      <h2 className="task-original-content">Action Movies</h2>
      <TaskForm requestUrl={requests.fetchActionMovies} />
      <h2 className="task-original-content">Comedy Movies</h2>
      <TaskForm requestUrl={requests.fetchComedyMovies} />
      <h2 className="task-original-content">Horror Movies</h2>
      <TaskForm requestUrl={requests.fetchHorrorMovies} />
      <h2 className="task-original-content">Romance Movies</h2>
      <TaskForm requestUrl={requests.fetchRomanceMovies} />
      <h2 className="task-original-content">Documentaries Movies</h2>
      <TaskForm requestUrl={requests.fetchDocumentaries} />
    </div>
  );
};
export default MovieList;
