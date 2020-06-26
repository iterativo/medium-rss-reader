import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import { fade, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import _ from 'lodash'
import React from 'react'
import axios from 'axios'

const backendBaseUrl = 'http://localhost:3001'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0068B4',
        },
        secondary: {
            main: '#ffffff',
        },
    },
})

const useStyles = makeStyles(theme => ({
    appBar: {
        color: theme.palette.primary,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${ theme.spacing(4) }px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    submitButton: {
        marginLeft: theme.spacing(10),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    feed: {
        background: '#ffffff',
        color: '#000000',
        flexGrow: 1,
    },
    feedCard: {
        padding: theme.spacing(2),
        minWidth: 275,
        marginTop: 10,
        marginLeft: 250,
        marginRight: 250,
    },
    feedTitle: {
        fontSize: 14,
    },
    feedItems: {
        marginTop: 10,
    },
    history: {
        backgroundColor: theme.palette.secondary,
        color: '#000000',
        padding: 10,
        marginLeft: 273,
    },
    historyLink: {
        cursor: 'pointer',
    },
    error: {
        background: '#d21313',
        color: '#ffffff',
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
    },
}))

const toViewModel = (feed) => ({
    title: feed.title,
    description: feed.description,
    link: feed.link,
    items: feed.items.map(x => _.pick(x, ['creator', 'title', 'content', 'creator', 'pubDate', 'link'])),
})

function App() {
    const [value, setValue] = React.useState('')
    const [feed, setFeed] = React.useState(null)
    const [history, setHistory] = React.useState([])
    const [hasFailed, setHasFailed] = React.useState(false)
    const classes = useStyles()
    React.useEffect(() => {
        axios.get(`${backendBaseUrl}/history`).then(({ data }) => setHistory(data))
    }, [])

    const fetch = async (value) => {
        try {
            setHasFailed(false)
            const resp = await axios.get(`${ backendBaseUrl }/feeds/${ value }`)
            if (resp.status !== 200) {
                setHasFailed(true)
                return
            }
            setFeed(toViewModel(resp.data.feed))
            setHistory(resp.data.history)
            setValue('')
        } catch (e) {
            setHasFailed(true)
        }
    }

    const search = e => {
        e.preventDefault()
        fetch(value)
    }

    const handleHistoryLinkClick = (e, feedName) => {
        e.preventDefault()
        fetch(feedName)
    }

    return (
        <MuiThemeProvider theme={ theme }>
            <AppBar className={ classes.appBar } position={ 'static' }>
                <Toolbar className={ classes.toolbar }>
                    <Typography display={ 'inline' }>Search Medium Feed:</Typography>
                    <div className={ classes.search }>
                        <IconButton className={ classes.searchIcon }>
                            <SearchIcon />
                        </IconButton>
                        <form onSubmit={ search }>
                            <span>
                                <InputBase
                                    placeholder={ 'Search…' }
                                    classes={ {
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    } }
                                    onChange={ (e) => setValue(e.target.value) }
                                    inputProps={ { 'aria-label': 'search' } }
                                    value={ value }
                                />
                            </span>
                            <span>
                                <Button
                                    className={ classes.submitButton }
                                    variant={ 'contained' }
                                    onClick={ search }
                                >
                                    Submit
                                </Button>
                            </span>
                        </form>
                    </div>
                </Toolbar>
            </AppBar>
            {
                hasFailed &&
                <Grid className={ classes.error }>
                    <Typography>Oops! Check the feed name and try again.</Typography>
                </Grid>
            }
            {
                !!history &&
                <Grid className={ classes.history }>
                    <Typography variant={ 'overline' }>Recent Searches</Typography>
                    <List disablePadding={ true }>
                    {
                        history.map(feedName => (
                            <ListItem key={ feedName }>
                                <ListItemIcon>
                                    <RssFeedIcon
                                        className={ classes.historyLink }
                                        color={ 'action' }
                                        onClick={ e => handleHistoryLinkClick(e, feedName) }
                                    />
                                </ListItemIcon>
                                <ListItemText primary={ feedName } />
                            </ListItem>
                        ))
                    }
                    </List>
                </Grid>
            }
            {
                feed &&
                <Grid
                    container
                    spacing={ 3 }
                    className={ classes.feed }
                >
                    <Grid item xs={ 12 }>
                        <Card className={ classes.feedCard } variant={ 'outlined' }>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {feed.title}
                                </Typography>
                                <Typography className={ classes.feedTitle } color="textSecondary" gutterBottom>
                                    {feed.description}
                                </Typography>
                                <div className={ classes.feedItems }>
                                {
                                    feed.items.map(i => (
                                        <div key={ i.title.replace(/\s/g, '') }>
                                            <Divider />
                                            <Typography variant={ 'subtitle2' } style={ { marginTop: 10 } }>
                                                By:&nbsp;{i.creator}
                                            </Typography>
                                            <Typography variant={ 'subtitle2' }>
                                                On:&nbsp;{i.pubDate}
                                            </Typography>
                                            <Typography style={ { marginTop: 10 } }>{i.title}</Typography>
                                            <div dangerouslySetInnerHTML={ { __html: i.content } } />
                                        </div>
                                    ))
                                }
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
        </MuiThemeProvider>
    )
}

export default App
