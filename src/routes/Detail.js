import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data);
    setDetail(json.data);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{detail.movie.title}</h1>
          <ul>
            {detail.movie.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <p>{detail.movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
