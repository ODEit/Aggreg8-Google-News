import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, sourced, getSource } from '../store'
import Slider from 'react-slick'

import Article from './Article'
import Footer from  './footer'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      searchCheck : []
    }
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
  const { children, handleClick, isLoggedIn, news, handleSourcing, handleSourced, searched, handleQuery,  } = this.props
  var checker;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div id = "Main-frame" >
      <div className='Main-center'>
        <h1  >News of the day!</h1>
        <div className = 'main-filter-box' >
        <input id = 'main-filter' name = "selector" type = 'text' onChange = {(e)=> e.target.value.length ? this.setState({searchCheck:  news.filter(name => name.indexOf(e.target.value)=== 0)}) : this.setState({searchCheck: []})}></input>
        {this.state.searchCheck && this.state.searchCheck.map((name,id) => {
          return(
            <span onClick = {handleSourced.bind(this)} className = 'main-options' key = {id} >{name}</span>
          )
        })}
        </div>
        <select onChange = {handleSourced.bind(this)}>
        <option >default</option>
        {news && news.map((name,id) => {
          return(
            <option  key = {id} value = {name}>{name}</option>
          )
        })}
      </select>
      <form className = 'search-form' onSubmit={handleQuery} >
        <input className='search-source' onChange={handleSourcing} name='q' type='text' placeholder='anything'></input>
        <button type='submit'>anything</button>
      </form>
      </div>
      <hr/>
     <div className = 'slider-fix'>
      <div className = 'slider-flex'>
      <button className='button' onClick={this.previous}>Prev</button>
      <button className='button' onClick={this.next}>Next</button>
      </div> 
      <Slider ref={c => this.slider = c } {...settings}>
      
        {Array.isArray(searched) && searched.map((article, key) => {
          return (
          <div key = {key}><Article article = {article}/></div>
          )
        })   
        }
      </Slider>
      </div>
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
    handleSourced (event)  {
      let value = event.target.value || event.target.innerHTML

      event.preventDefault()
      document.getElementById('main-filter').value = ''
      this.setState( {searchCheck :[]} )
      dispatch(sourced(value, 'sources'))
    },
    handleQuery(event) {
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
