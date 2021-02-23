import React from 'react';
import { useSelector } from 'react-redux';

import './Profile.css';
import { MainNavigation } from '../../components/MainNavigation'
import { IStore } from '../../helpers/types';

export interface ILandings { 
  landings: IStore
}

function ProfilePage(props: any) {
  const cartItemCount = useSelector((state: ILandings) => state);
  const backgroundImage = !cartItemCount.landings.isLightTheme ? 
    `url('http://localhost:3000/statics/white_home_background.jpg')`
    : `url('http://localhost:3000/statics/black_home_background.jpg')`
  const stylesObj = {
    backgroundImage
  }
  return (
    <div className='App'>
      <MainNavigation cartItemNumber={cartItemCount.landings} />
      <div className='container' style={stylesObj}>
        <h3>Coming soon...</h3>
      </div>
    </div>
  );
}

export default ProfilePage
