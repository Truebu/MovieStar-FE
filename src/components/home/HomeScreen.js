import React, { useEffect, useState } from 'react'
// import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { apiMovieAsync, apiReload } from '../../actions/api'
import { MovieModal } from '../movies/MovieModal'
import { MovieScreen } from '../movies/MovieScreen'
import { Navbar } from '../ui/Navbar'
import { NavGenders } from '../ui/NavGenders'

const initialQuery = {
  url: '/movie/popular',
  querys: {}
}

export const HomeScreen = () => {

  const dispatch = useDispatch()
  const [querys, setQuerys] = useState(initialQuery)
  const {loading} = useSelector(state => state.ui)
  const {data} = useSelector(state => state.apiForm.data)
  
  useEffect(() => {
    dispatch( apiMovieAsync( querys.url, querys.querys))
    return () => {
      dispatch( apiReload() )
    }
  }, [dispatch, querys])
  
  
  if (loading) {
    return <div className="lds-hourglass"></div>
  }

  return (
    <div className="home_container">
      <div className="home_navbars">
        <div className="controler_navbar">
          <Navbar setQuerys={setQuerys}/>
        </div>
        <div className="home_Genders">
          <NavGenders setQuerys={setQuerys}/>
        </div>
      </div>
      <div className="home_container_movies">
        {
          (!loading) &&
          (data?.total_results === 0)
          ? <div>
              {/* componentes de Search */}
              Tu resultado no esta en la busqueda
            </div>
          :<>
              {
                data?.results.map(movie => (
                  <MovieScreen
                    key={movie.id}
                    {...movie}
                  />                    
                ))
              }
            </>
        }
      </div>
      <div>
        <MovieModal />
      </div>
    </div>
  )
}
