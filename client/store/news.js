import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_NEWS = 'GET_NEWS'

/**
 * INITIAL STATE
 */
const defaultNews = []

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
      dispatch(getNews((res.data)))
      console.log(res.data)
      var check = JSON.stringify(res.data)
      console.log("At Check", check)
      console.log('Parsing CHECK ',JSON.parse(check)[0])
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