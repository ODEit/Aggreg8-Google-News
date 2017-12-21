import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_NEWS = 'GET_NEWS'

/**
 * INITIAL STATE
 */
const defaultNews = {
    news: []
}

/**
 * ACTION CREATORS
 */
const getNews = news => ({type: GET_NEWS, news})

/**
 * THUNK CREATORS
 */

export const news = () =>
dispatch =>
  axios.get(`/api/news`)
    .then(res => {
      dispatch(getNews(res.data.articles))
      console.log(res.data.articles)
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))


/**
* REDUCER
*/
export default function (state = defaultNews, action) {
switch (action.type) {
  case GET_NEWS:
  console.log(action.news)
    return action.news
  default:
    return state
}
}