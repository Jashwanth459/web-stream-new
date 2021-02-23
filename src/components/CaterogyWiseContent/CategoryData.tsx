import React, { useState, useEffect } from 'react';
import { FaCartPlus, FaHeart, FaInfoCircle, FaStream } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import Youtube from 'react-youtube';

import axios from '../../API/data-fetch';
import { IStore } from '../../helpers/types';
import './CategoryData.css';
import { LazyImage } from '../LazyImage' 

export interface ILandings { 
  landings: IStore
}

interface ScreenProps {
    title: string
    fetchUrl: string
    isLargeRow?: boolean
}

const baseImgUrl = 'https://image.tmdb.org/t/p/original';

function CategoryData({ title, fetchUrl, isLargeRow } : ScreenProps) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const dispatch = useDispatch();

  // Options for react-youtube
  // const opts = {
  //   height: '390',
  //   width: '100%',
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie: any) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      console.log('trailer URL', trailerurl)
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  const addToCart = (movie: any) => {
    if (window.confirm('Do you really want to add this item to your Cart..?')) {
      dispatch({type: 'ADD_TO_CART', payload: movie})
    }
  }

  const addTolikedList = (movie: any) => {
    if (window.confirm('Do you really want to add this item to your List...? ')) {
      dispatch({type: 'ADD_TO_LIKED_LIST', payload: movie})
    }
  }

  const getMoreInfo = (movie: any) => {
    console.log('Movie is', movie);
    if (movie && movie.name) {
      const queryString = `${movie.name} Movie`
      window.open('http://google.com/search?q='+queryString);
    }
  }

  return (
    <div className='row'>
      <h2 className='category_title'>{title}</h2>

      <div className='row_posters'>
        {movies.map(
          (movie: any) =>
            movie.backdrop_path !== null && (
                <li className={`row_poster${isLargeRow ? ' row_posterLarge' : ''}`}>
                  <div className={'save_options'}>
                    <button className={`options_switch${isLargeRow ? ' large' : ''}`}><FaStream /></button>
                    <ul className={`poster_options${isLargeRow ? ' large': ''}`}>
                      <li title='Add to Cart' onClick={() => { addToCart(movie) }}><FaCartPlus /> </li>
                      <li title='Add to Liked List' onClick={() => { addTolikedList(movie) }}><FaHeart /> </li>
                      <li title='More Info' onClick={() => { getMoreInfo(movie) }}><FaInfoCircle /> </li>
                    </ul>
                  </div>
                  <div
                    onClick={() => handleClick(movie)}
                  >
                    <LazyImage 
                      className={`row_poster_image${isLargeRow ? ' row_posterLarge_image' : ''}`} 
                      src={`${baseImgUrl}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                      }`}
                      alt={movie.name}
                      key={movie.id}
                      title={movie.name}
                    />
                  </div>
                </li>
            )
        )}
      </div>
      {trailerUrl && <div className='youtube_embed'>
        <span className="youtube_close_button" onClick={() => {setTrailerUrl('')}}>&times;</span>
        <Youtube videoId={trailerUrl}/> 
      </div>}
    </div>
  );
}

export default CategoryData;
