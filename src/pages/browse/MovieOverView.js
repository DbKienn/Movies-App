import React, { useEffect, useState } from "react";

const MovieOverview = () => {
  const [overview, setOverview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=7be9132e5315a716dcb696ccdce28127&language=en-US"
      );
      const data = await response.json();

      // Tìm kiếm phần tử có id trùng với giá trị 238
      const movie = data.results.find((item) => item.id === 238);

      if (movie) {
        setOverview(movie.overview);
      }
    };

    fetchData();
  }, []);

  return <p>{overview}</p>;
};
