import axios from '../../API/data-fetch';
import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import Youtube from 'react-youtube';

import { MainNavigation } from '../../components/MainNavigation'
import { IStore } from '../../helpers/types';
import './Liked.css';
import { NavLink } from 'react-router-dom';

export interface ILandings { 
  landings: IStore
}


function CartPage(props: any) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const dispatch = useDispatch();
  
  const handleClick = async (movie: any) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      console.log('movie is', movie)
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      console.log('liked trailer url', trailerurl)
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
  
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';
  const cartItemCount = useSelector((state: ILandings) => state);
  console.log('cartItem', cartItemCount)
  console.log('props', props)
  const backgroundImage = !cartItemCount.landings.isLightTheme ? 
    `url('http://localhost:3000/statics/white_home_background.jpg')`
    : `url('http://localhost:3000/statics/black_home_background.jpg')`
  const stylesObj = {
    backgroundImage
  }
  const addToCart = (movie: any) => {
    console.log('movies is', movie)
    dispatch({type: 'ADD_TO_CART', payload: movie})
  }

  const removeFromLikedList = (movie: any) => {
    console.log('movie', movie)
    dispatch({type: 'REMOVE_FROM_LIKED_LIST', payload: movie})
  }

  const getMoreInfo = (movie: any) => {
    console.log('Movie is', movie);
    if (movie && movie.name) {
      const queryString = `${movie.name} Movie`
      window.open('http://google.com/search?q='+queryString);
    }
  }


  return (
    <div className='App'>
    <MainNavigation cartItemNumber={cartItemCount.landings} />
    <div className='container' style={stylesObj}>
      {cartItemCount.landings.likedList.length <=0 && <p>No items in the liked list. Add some from   <NavLink to='/' title='Home'>Home</NavLink></p>}
      <ul className='liked_list'>
        {cartItemCount.landings.likedList.map( (item : any)  => (
          <li key={item.id} className='liked_list_item'>
              <img 
                className='liked_img'
                src={`${baseImgUrl}${item.backdrop_path}`}
                alt={item.overview}
                onClick={() => handleClick(item)}
              />
              <div className='listing_card_info'>
                <div className='listing_card_header'>
                  <div className='listing_header_text'><strong>{item.name}</strong> - {item.vote_average}/10 (
                  {item.vote_count} votes)</div>
                  <ul className={`listing_header_options`}>
                      <li className='add_to_cart' title='Add to Cart' onClick={() => { addToCart(item) }}><FaCartPlus /> </li>
                      <li className='remove_from_cart' title='Remove from Liked List' onClick={() => { removeFromLikedList(item) }}><FaTrashAlt /> </li>
                      <li className='more_info' title='More Info' onClick={() => { getMoreInfo(item) }}><FaInfoCircle /> </li>
                  </ul>
                  </div>
                <p className='listing_overview'>{item.overview}</p>
              </div>
          </li>
        )
        )}
      </ul>
      {trailerUrl && <div className='youtube_embed'>
        <span className="youtube_close_button" onClick={() => {setTrailerUrl('')}}>&times;</span>
        <Youtube videoId={trailerUrl}/> 
      </div>}
    </div>
    </div>
  );
}

export default CartPage
