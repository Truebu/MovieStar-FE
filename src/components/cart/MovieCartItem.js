import React from 'react'
import { useDispatch } from 'react-redux'
import { buyMovieThroughCart } from '../../actions/cart'
import { buyMoviesWithFirebase } from '../../actions/movie'

export const MovieCartItem = ({movie, isBought}) => {

  const dispatch = useDispatch()

  const handleBuyMovie = () => {
    dispatch(buyMoviesWithFirebase(movie))
    dispatch(buyMovieThroughCart(movie.id))
  }

  return (
    <>
      <div className="cart_movie">
        <div>
          <img
            className="cart_image"
            src={`https://image.tmdb.org/t/p/w500${movie.imgPath}`}
            alt={movie.title}
          />
        </div>
        <div>
          {movie.title}
        </div>
        {
          isBought || 
          <button
            className="btn btn-success"
            onClick={handleBuyMovie}
          >
            Buy
          </button>
        }
      </div>
    </>
  )
}
