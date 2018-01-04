import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, sourced, getSource } from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, news, handleSourcing, handleSourced, searched, handleQuery } = props
  var checker;
  return (
    <div>
      <h1 className='Main-center' >News of the day!</h1>
      <nav>
        {
          // isLoggedIn
          //   ? <div>
          //     {/* The navbar will show these links after you log in */}
          //     <Link to="/home">Home</Link>
          //     <a href="#" onClick={handleClick}>Logout</a>
          //   </div>
          //   : <div>
          //     {/* The navbar will show these links before you log in */}
          //     <Link to="/login">Login</Link>
          //     <Link to="/signup">Sign Up</Link>
          //   </div>

        }
      </nav>
      <hr />
      <form onSubmit={handleSourced} >
        <input className='search-source' onChange={handleSourcing} name='source' type='text' placeholder='type news outlet ie: bbc-news, the-verge'></input>
        <button type='submit'>things</button>
      </form>
      <form onSubmit={handleQuery} >
        <input className='search-source' onChange={handleSourcing} name='q' type='text' placeholder='anything'></input>
        <button type='submit'>things</button>
      </form>
      <div className='main-articles'>
        {Array.isArray(searched) && searched.map((article, key) => {
          return (
            <div key={key} className="main-article">
              <h2>{article.title} </h2>
              <h3>{`By : ${article.author}`}</h3>
              <div className='article-meat'>
                <a className="main-a" href={article.url}>
                  <img className="Main-image" src={article.urlToImage} />
                </a>
                <p className='main-p'>{article.description}</p>
              </div>
            </div>

          )
        })

        }
        {(
          Array.isArray(news) && news.map((article, key) => {
            return (
              <div key={key} className="main-article"  >
                <h2>{article.title}</h2>
                <h3 >{`By : ${article.author}`}</h3>
                <div className='article-meat'>
                  <a className="main-a" href={article.url}>
                    <img className="Main-image" src={article.urlToImage} />
                  </a>
                  <p className='main-p'>{article.description}</p>
                </div>
              </div>
            )
          }))}
      </div>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    news: state.news.default,
    searched: state.news.search
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    handleSourced(event) {
      console.log('inside sourced', event.target.source)
      event.preventDefault()
      dispatch(sourced(event.target.source.value, 'sources'))
    },
    handleQuery(event) {
      console.log('inside sourced', )
      event.preventDefault()
      dispatch(sourced(event.target.q.value, 'q' ))
    },
    handleSourcing(event) {
      dispatch(getSource(event.target.value))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
