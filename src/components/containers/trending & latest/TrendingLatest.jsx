import React from 'react'
import { NavLink } from 'react-router-dom';
import './trendingLatest.css';

function TrendingLatest() {
  return (
    <div className='trendingLatest-container col-xs-10 col-sm-8 col-md-7 col-lg-5'>
      <ul className='nav'>
        <li className='nav-item'><i class="bi bi-fire"></i> <NavLink to='/trending'>Trending</NavLink></li>
        <li className='nav-item'><i class="bi bi-clock"></i><NavLink to='/latest'>Latest</NavLink></li>
        </ul>
    </div>
  )
}

export default TrendingLatest