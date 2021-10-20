import { types } from "../types/types"

const initialState = {
  cart: []
}

export const cartReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.cartAddMovie:
      return {        
        cart: [...state.cart, action.payload]
      }
    
    case types.buyMovieThroughCart:
      return {
        ...state,
        cart: state.cart.filter(movie => movie.id !== action.payload)
      }
  
    case types.cartClean:
      return initialState

    default:
      return state
  }
}