import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_NEWS = 'GET_NEWS'
const QUERY_SOURCE = 'QUERY_SOURCE'
const GET_SOURCE = 'GET_SOURCE'
/**
 * INITIAL STATE
 */
const defaultNews = {
    default: [],
    search: [],
    source: ''
}

/**
 * ACTION CREATORS
 */
export const getNews = news => ({ type: GET_NEWS, news })
export const getNewsBySource = search => ({ type: QUERY_SOURCE, search })
export const getSource = source => ({ type: GET_SOURCE, source })
/**
 * THUNK CREATORS
 */

export const news = () =>
    dispatch =>
        axios.get(`/api/news`)
            .then(res => {
                let ids = res.data.sources.map( source => source.id)
                dispatch(getNews((ids)))
            })
            .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const sourced = (source, query) =>

    dispatch => {
        if (query === 'sources') {
            (axios.get(`/api/news/sources/${source}`)
                .then(res => {
                    console.log('source', res.data)
                    console.log('hit inside')
                    dispatch(getNewsBySource(res.data))
                })
                .catch(() => console.log('didnt make it')))
        }
        else {  (axios.get(`/api/news/query/${source}`)
                    .then(res => {
                        console.log('source', res.data)
                        console.log('hit inside')
                        dispatch(getNewsBySource(res.data))
                    })
                    .catch(() => console.log('didnt make it'))
                )}
    }
//lets make a banner :)
/**
* REDUCER
*/
export default function (state = defaultNews, action) {
    console.log('inside');
    switch (action.type) {
        case GET_NEWS:
            console.log(action.news)
            return Object.assign({}, state, { default: action.news })
        case GET_SOURCE:
            console.log(action.source)
            return Object.assign({}, state, { source: action.source })
        case QUERY_SOURCE:
            console.log(action.source)
            return Object.assign({}, state, { search: action.search })
        default:
            return state
    }
}