import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, sourced, getSource } from '../store'
import Slider from 'react-slick'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor() {
    super();
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }
  
render(){
  const { children, handleClick, isLoggedIn, news, handleSourcing, handleSourced, searched, handleQuery } = this.props
  var checker;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <div className='Main-center'>
        <h1  >News of the day!</h1>
        <select onChange = {handleSourced}>
        {news && news.map((name,id) => {
          return(
            <option key = {id} value = {name}>{name}</option>
          )
        })}
      </select>
      <form className = 'search-form' onSubmit={handleQuery} >
        <input className='search-source' onChange={handleSourcing} name='q' type='text' placeholder='anything'></input>
        <button type='submit'>things</button>
      </form>
      </div>
      <hr/>
     
      <div className = 'slider-flex'>
      <button className='button' onClick={this.previous}>Prev</button>
      <button className='button' onClick={this.next}>Next</button>
      </div> 
      <Slider ref={c => this.slider = c } {...settings}>
      
        {Array.isArray(searched) && searched.map((article, key) => {
          return (
            <div key={key} >
              <h2 className = 'article-title' >{article.title} </h2>
              <h3 className = 'article-author' >{`By : ${article.author}`}</h3>
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
       
      </Slider>
    </div>
  )
}

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
      dispatch(sourced(event.target.value, 'sources'))
    },
    handleQuery(event) {
      console.log('inside sourced', )
      event.preventDefault()
      dispatch(sourced(event.target.q.value, 'q'))
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
