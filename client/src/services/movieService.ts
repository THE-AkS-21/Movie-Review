import { Movie } from '../types';
import api from "../api/axiosConfig";

export const getMovies = async (): Promise<Movie[]> => {
    const response = await api.get("/api/v1/movies");
    return response.data;
};

export const getMovie = async (id: string): Promise<Movie> => {
    const response = await api.get(`/api/v1/movies/${id}`);
    return response.data;
};