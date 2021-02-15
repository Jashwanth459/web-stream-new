import React from 'react';
import CategoryData from '../../components/CaterogyWiseContent/CategoryData';
import { MainNavigation } from '../../components/MainNavigation';
import requests from '../../API/category-urls';

// import logo from '../../logo.svg';
import './Home.css';
import { useSelector } from 'react-redux';
import { IStore } from '../../helpers/types';

export interface ILandings { 
  landings: IStore
}

function Home(props: any) {
  const cartItemCount = useSelector((state: ILandings) => state);
  const backgroundImage = !cartItemCount.landings.isLightTheme ? 
    `url('http://localhost:3000/statics/white_home_background.jpg')`
    : `url('http://localhost:3000/statics/black_home_background.jpg')`
  const stylesObj = {
    backgroundImage
  }
  console.log('home count', cartItemCount)
  return (
    <div className='App'>
      <MainNavigation cartItemNumber={cartItemCount.landings} />
      <div className='container' style={stylesObj}>
        <CategoryData
          title='WEIRDO ORIGINALS'
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <CategoryData title='Trending Now' fetchUrl={requests.fetchTrending} />
        {/* <CategoryData title='Top Rated' fetchUrl={requests.fetchTopRated} />
        <CategoryData title='Action Movies' fetchUrl={requests.fetchActionMovies} /> */}
        {/* <CategoryData title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
        <CategoryData title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
        <CategoryData title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
        <CategoryData title='Documentaries' fetchUrl={requests.fetchDocumentaries} /> */}
      </div>
    </div>
  );
}

export default Home;
