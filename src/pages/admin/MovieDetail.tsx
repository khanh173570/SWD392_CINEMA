import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieDetailData {
  id: number;
  name: string;
  image: string;
  director: string;
  cast: string;
  releaseDate: string;
  duration: number;
  language: string;
  ageRated: number;
  description: string;
  trailer: string;
  genre: string;
  active: boolean;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/movies/${id}`);
        setMovie(res.data.metadata);
      } catch (err) {
        setError("Không thể tải dữ liệu phim.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Không tìm thấy phim.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <div className="flex gap-6">
        <img src={movie.image} alt={movie.name} className="w-48 h-64 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{movie.name}</h1>
          <p><strong>Đạo diễn:</strong> {movie.director}</p>
          <p><strong>Diễn viên:</strong> {movie.cast}</p>
          <p><strong>Khởi chiếu:</strong> {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}</p>
          <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
          <p><strong>Ngôn ngữ:</strong> {movie.language}</p>
          <p><strong>Độ tuổi:</strong> {movie.ageRated}</p>
          <p><strong>Thể loại:</strong> {movie.genre}</p>
          <p><strong>Trạng thái:</strong> {movie.active ? "Đang chiếu" : "Ngừng chiếu"}</p>
          <p className="mt-2"><strong>Trailer:</strong> {movie.trailer ? <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Xem trailer</a> : "Chưa có trailer"}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold mb-1">Mô tả</h2>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
