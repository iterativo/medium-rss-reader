import { MuiThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import Feed from './Feed'
import Search from './Search'
import SearchError from './SearchError'
import theme from './theme'

const App = () => {
    const [feed, setFeed] = React.useState(null)
    const [history, setHistory] = React.useState([])
    const [hasFailed, setHasFailed] = React.useState(false)

    React.useEffect(() => {
        axios.get('/history').then(({ data }) => setHistory(data))
    }, [])

    const fetchFeed = async(value) => {
        try {
            setHasFailed(false)
            const resp = await axios.get(`/feeds/${ value }`)
            if (resp.status !== 200) {
                setHasFailed(true)
                return
            }
            setFeed(resp.data.feed)
            setHistory(resp.data.history)
        } catch (e) {
            setHasFailed(true)
        }
    }

    return (
        <MuiThemeProvider theme={ theme }>
            <Search
                onSubmit={ (feedName) => fetchFeed(feedName) }
                history={ history }
            />
            {
                hasFailed &&
                <SearchError />
            }
            {
                feed &&
                <Feed feed={ feed } />
            }
        </MuiThemeProvider>
    )
}

export default App
