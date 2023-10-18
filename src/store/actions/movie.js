import axios from "axios";
import {
  GET_MOVIES,
  GET_MOVIES_REQUEST,
  SEARCH_MOVIES,
  GET_MOVIE_REQUEST,
  GET_MOVIE,
  GET_SIMILAR_MOVIES_REQUEST,
  GET_SIMILAR_MOVIES,
  GET_MOVIES_TRAKT,
  GET_MOVIES_TRAKT_REQUEST,
  ADD_MOVIES_TRAKT,
  ADD_MOVIES_TRAKT_REQUEST,
} from "../constants/movie";

import { CLIENT_ID, TRAKT_USERNAME } from "../../globalVariables";
import { API_KEY, LANGUAGE, API_URL } from "../../globalVariables";

// Get Movies
export const getMovies = (page, filters, ordem) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_REQUEST });

  let res;

  if (
    !filters.genre &&
    !filters.sort &&
    !filters.vote &&
    !filters.releaseDateGte &&
    !filters.releaseDateLte &&
    !filters.score
  ) {
    res = await axios.get(
      `${API_URL}/movie/${ordem}?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`
    );
  } else {
    let requestString = "";

    requestString += filters.genre ? "&with_genres=" + filters.genre : "";
    requestString += filters.sort ? "&sort_by=" + filters.sort : "";
    requestString += filters.vote ? "&vote_count.gte=" + filters.vote : "";
    requestString += filters.releaseDateLte
      ? "&release_date.lte=" + filters.releaseDateLte
      : "";
    requestString += filters.releaseDateGte
      ? "&release_date.gte=" + filters.releaseDateGte
      : "";
    requestString += filters.score ? "&vote_average.gte=" + filters.score : "";

    res = await axios.get(
      `${API_URL}/discover/movie?api_key=${API_KEY}${requestString}&language=${LANGUAGE}&page=${page}`
    );
  }

  dispatch({
    type: GET_MOVIES,
    payload: {
      movies: res.data.results,
      pages: res.data.total_pages,
      results: res.data.total_results,
    },
  });
};

// Get Single Movie
export const getMovie =
  (id, setMovieDataPT, setMovieDataUS) => async (dispatch) => {
    dispatch({ type: GET_MOVIE_REQUEST });

    const res = await axios.get(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
    );

    dispatch({
      type: GET_MOVIE,
      payload: res.data,
    });

    const resPT = await axios.get(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );

    setMovieDataUS(res.data);
    setMovieDataPT(resPT.data);
  };
