import { MuiThemeProvider } from '@material-ui/core'
import axios from 'axios'
import _ from 'lodash'
import React from 'react'
import Feed from './Feed'
import Search from './Search'
import SearchError from './SearchError'
import theme from './theme'

const backendBaseUrl = 'http://localhost:3001'

const toViewModel = (feed) => ({
    title: feed.title,
    description: feed.description,
    link: feed.link,
    items: feed.items.map(x => _.pick(x, [
        'creator',
        'title',
        'content',
        'creator',
        'pubDate',
        'link',
    ])),
})

const App = () => {
    const [feed, setFeed] = React.useState(null)
    const [history, setHistory] = React.useState([])
    const [hasFailed, setHasFailed] = React.useState(false)

    React.useEffect(() => {
        axios.get(`${ backendBaseUrl }/history`).then(({ data }) => setHistory(data))
    }, [])

    const fetch = async(value) => {
        try {
            setHasFailed(false)
            const resp = await axios.get(`${ backendBaseUrl }/feeds/${ value }`)
            if (resp.status !== 200) {
                setHasFailed(true)
                return
            }
            setFeed(toViewModel(resp.data.feed))
            setHistory(resp.data.history)
        } catch (e) {
            setHasFailed(true)
        }
    }

    return (
        <MuiThemeProvider theme={ theme }>
            <Search
                onSubmit={ (feedName) => fetch(feedName) }
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
