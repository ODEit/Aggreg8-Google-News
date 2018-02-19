import React, { Component } from 'react'

const Article = (props) => {

    const {article} = props
    return ( 
        <div>
          <h2 className = 'article-title' >{article.title} </h2>
          {article.author && <h3 className = 'article-author' >{`By : ${article.author}`}</h3>}
          <div className='article-meat'>
            <a className="main-a" href={article.url}>
              {article.urlToImage ? <img className="Main-image" src={article.urlToImage} />:<img className = "Main-image" src = 'NoImage.svg.png'></img> }
            </a>
            <p className='main-p'>{article.description}</p>
          </div>
        </div>
      )
} 

export default Article;

/**
 * article.title
 * article.author
 * article.url
 * article.urlToImage
 * article.description
 */