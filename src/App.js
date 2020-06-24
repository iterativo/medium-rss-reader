import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import axios from 'axios'

const backendBaseUrl = 'http://localhost:3001'

const useStyles = makeStyles(theme => ({
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
    }
}))

function App() {
    const [value, setValue] = React.useState('')
    const [rss, setRss] = React.useState('')
    const classes = useStyles()
    const search = async e => {
        e.preventDefault()
        const resp = await axios.get(`${backendBaseUrl}/feeds/${value}`)
        setRss(resp.data)
    }
    return (
        <div>
            <AppBar position={ 'static' }>
                <Toolbar>
                    <div className={ classes.search }>
                        <IconButton className={ classes.searchIcon }>
                            <SearchIcon />
                        </IconButton>
                        <form onSubmit={ search }>
                            <span>
                                <InputBase
                                    placeholder="Search…"
                                    classes={ {
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    } }
                                    onChange={ (e) => setValue(e.target.value) }
                                    inputProps={ { 'aria-label': 'search' } }
                                    value={value}
                                />
                            </span>
                            <span className={ classes.submitButton }>
                                <Button variant={'contained'} onClick={ search }>Submit</Button>
                            </span>
                        </form>
                    </div>
                </Toolbar>
                <Grid>
                    {rss}
                </Grid>
            </AppBar>
        </div>
    )
}

export default App
