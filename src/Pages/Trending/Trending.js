import axios from "axios";
import { useEffect, useState } from "react";

import "./Trending.css";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/Pagination/CustomPagination";

//api key = 6072e56555742bd0feaf1f7249e65a87
const Trending = () => {
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setMovie(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <h1 className="pageTitle">Trending</h1>
      <div className="trending">
        {movie &&
          movie.map((m) => {
            return (
              <Card
                key={m.id}
                id={m.id}
                title={m.title || m.name}
                poster={m.poster_path}
                date={m.first_air_date || m.relese_data}
                type={m.media_type}
                vote={m.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
