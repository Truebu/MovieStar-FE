
export const types = {

  login:  '[auth] login',
  logout: '[auth] logout',
  
  uiSetError: '[UI] uiSetError',
  uiRemoveError: '[UI] uiRemoveError',
  uiStartLoading: '[UI] uiStartLoading',
  uiFinishLoading: '[UI] uiFinhisLoading',
  uiOpenModal: '[UI] OpenModal',
  uiCloseModal: '[UI] CloseModal',

  api: '[API] ImdMovie',
  apiReload: '[API] Reload',

  activeMovie: '[Movie] ActiveMovie',
  inactiveMovie: '[Movie] inactiveMovie',
  buyMovie: '[Movie] Buy Movie',

  cartAddMovie: '[Cart] addCartMovie',
  cartBuyMovie: '[Cart] buyMovie',
  cartBuyAllMovies: '[Cart] buyAllMovies',
  cartClean: '[Cart] cleanCart',
  cartMoviesLoad: '[Cart] Load Movies', // Wait for used

}
