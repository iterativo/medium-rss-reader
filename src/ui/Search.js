import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'
import * as PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
    root: {
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
    searchForm: {
        display: 'flex',
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
    searchInput: {
        color: 'inherit',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${ theme.spacing(4) }px)`,
    },
    submitButton: {
        padding: theme.spacing(0, 3, 0, 3),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
})

const Search = props => {
    const [feedName, setFeedName] = React.useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        feedName && props.onSubmit(feedName)
    }
    return (
        <AppBar className={ props.classes.root } position={ 'static' }>
            <Toolbar className={ props.classes.toolbar }>
                <Typography display={ 'inline' }>Medium RSS Reader</Typography>
                <div className={ props.classes.search }>
                    <IconButton className={ props.classes.searchIcon }>
                        <SearchIcon />
                    </IconButton>
                    <form
                        className={ props.classes.searchForm }
                        onSubmit={ handleSubmit }
                        noValidate
                        autoComplete={ 'off' }
                    >
                        <Autocomplete
                            options={ props.history }
                            freeSolo
                            disableClearable
                            fullWidth
                            onChange={ (e, v) => setFeedName(v) }
                            renderInput={ (params) => (
                                <TextField
                                    { ...params }
                                    onChange={ (e) => setFeedName(e.target.value) }
                                    placeholder={ 'Search Medium RSS feed ...' }
                                    fullWidth
                                    value={ feedName }
                                    InputProps={ {
                                        ...params.InputProps,
                                        disableUnderline: true,
                                        type: 'search',
                                        className: props.classes.searchInput,
                                        style: {
                                            width: '400px',
                                        },
                                    } }
                                />
                            ) }
                        />
                        <Button
                            className={ props.classes.submitButton }
                            variant={ 'contained' }
                            onClick={ handleSubmit }
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </Toolbar>
        </AppBar>
    )
}

Search.propTypes = {
    classes: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    history: PropTypes.arrayOf(PropTypes.string),
}

export default withStyles(styles, { withTheme: true })(Search)
