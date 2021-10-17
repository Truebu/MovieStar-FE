import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { startLogout } from '../../actions/auth';
import { cartClean } from '../../actions/cart';

import { firebase } from '../../firebase/firebase-config'


export const Navbar = ({setQuerys}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  // Handle Search Peticion
  const [forms, setForms] = useState("")
  const baseUrl = '/search/movie'
  const handleSearchChange = ({target}) => { // Se debe controlar cuando el user no envia nada
    setForms(target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    if (forms === '') {
      console.log('object to Navbar') // Swal for show add you should added elsewhare in your find
    } else {
      setQuerys(newQuerys => ({
        ...newQuerys,
        url: baseUrl,
        querys: {
          query: forms
        }
      }))
    }
  }

  // Handle Logout
  const handleLogout = () => {
    dispatch(startLogout())
    dispatch(cartClean())
  };


  // Handle Cart Redirect
  const [logged, setLogged] = useState("")
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  },[])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (isMounted.current) {        
        if (user?.uid) {
          setLogged("/private/cart")
        } else {
          setLogged("/public/auth/login")
        }
      }
    })
  }, [setLogged])
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="/navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="/">
          Moviestar
        </a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <span className="nav-item">
            <Link
              to={logged}
            >
              Cart
            </Link>
          </span>          
        </ul>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={handleSearch}
        >
          <div className="row">
            <div className="col">
              <input
                className="form-control mr-sm-2"
                placeholder="Search"
                aria-label="Search"
                name="search"
                onChange = { handleSearchChange }
              />
            </div>
            <div className="col">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {
          !(logged === "/private/cart") ||
          <div className="col">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={handleLogout}
            >
              LogOut
            </button>
            <button
              className="btn btn-outline-success my-2 my-sm-0" // Props History para redirigir al componente Mis Peliculas
              onClick={ () => history.push('/private/userMovies')}
            >            
              Your Movies            
            </button>
          </div>
        }
      </div>
    </nav>
  );
};
