import React, {useState} from 'react';
import axios from '../../API/data-fetch';
import { FaTrashAlt, FaInfoCircle, FaRegPaperPlane, FaAngleDoubleRight } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux'
import { MainNavigation } from '../../components/MainNavigation'
import { IStore } from '../../helpers/types';
import './Cart.css';

import ReactNotification from 'react-notifications-component'


import Youtube from 'react-youtube';
import { NavLink } from 'react-router-dom';

export interface ILandings { 
  landings: IStore
}

function FixedFooter(props: any) {
  return(
    <footer className='footer-navigation'>
      <ul className='fixed_footer'>
        <li className='cost_info'>
          Your Cart has {props.cartCount} item(s) with total cost of {'[#] $'}
        </li>
        <li className='check_out' onClick={() => {alert('We appreciate your interest, we still working on this. Keep tuned..!')}}>
          <p>
            Checkout to buy 
            <FaAngleDoubleRight />
          </p>
        </li>
      </ul>
    </footer>
  )
}

function CartPage(props: any) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const dispatch = useDispatch();
  
  const handleClick = async (movie: any) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };
  
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';
  const cartItemCount = useSelector((state: ILandings) => state);
  const backgroundImage = !cartItemCount.landings.isLightTheme ? 
    `url('http://localhost:3000/statics/white_home_background.jpg')`
    : `url('http://localhost:3000/statics/black_home_background.jpg')`
  const stylesObj = {
    backgroundImage
  }

  const removeFromCart = (movie: any) => {
    if (window.confirm('Do you really want to delete item from the Cart..?')) {
      dispatch({type: 'REMOVE_FROM_CART', payload: movie.id})
    }
  }

  const getMoreInfo = (movie: any) => {
    if (movie && movie.name) {
      const queryString = `${movie.name} Movie`
      window.open('http://google.com/search?q='+queryString);
    }
  }


  return (
    <div className='App'>
    <MainNavigation cartItemNumber={cartItemCount.landings} />
    <ReactNotification />
    <div className='container' style={stylesObj}>
      {cartItemCount.landings.cartList.length <=0 && <p>No items in the Cart. Add some from   <NavLink to='/' title='Home'>Home</NavLink></p>}
      <ul className='liked_list'>
        {cartItemCount.landings.cartList.map( (item : any)  => (
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
                      <li className='check_out' title='Checkout to buy' onClick={() => {alert('Thanks for your interest, we still working on this. Keep tuned..!')}}><FaRegPaperPlane /></li>
                      <li className='remove_from_cart' title='Remove from Cart' onClick={() => { removeFromCart(item) }}><FaTrashAlt /> </li>
                      <li className='more_info' title='More Info' onClick={() => { getMoreInfo(item) }}><FaInfoCircle /> </li>
                  </ul>
                  </div>
                <p className='listing_overview'>{item.overview}</p>
              </div>
          </li>
        )
        )}
      </ul>
      {cartItemCount.landings.cartList.length > 0 && <FixedFooter cartCount={cartItemCount.landings.cartList.length} />}
      {trailerUrl && <div className='youtube_embed'>
        <span className="youtube_close_button" onClick={() => {setTrailerUrl('')}}>&times;</span>
        <Youtube videoId={trailerUrl}/> 
      </div>}
    </div>
    </div>
  );
}

export default CartPage

