import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import * as PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
    appBar: {
        color: theme.palette.primary,
    },
    toolbar: {
        display: 'flex',
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
    submitButton: {
        marginLeft: theme.spacing(10),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
})

const Search = props =>
    <AppBar className={ props.classes.appBar } position={ 'static' }>
        <Toolbar className={ props.classes.toolbar }>
            <Typography display={ 'inline' }>Search Medium Feed:</Typography>
            <div className={ props.classes.search }>
                <IconButton className={ props.classes.searchIcon }>
                    <SearchIcon />
                </IconButton>
                <form onSubmit={ props.onSubmit }>
                    <span>
                        <InputBase
                            placeholder={ 'Search…' }
                            classes={ {
                                root: props.classes.inputRoot,
                                input: props.classes.inputInput,
                            } }
                            onChange={ props.onChange }
                            inputProps={ { 'aria-label': 'search' } }
                            value={ props.value }
                        />
                    </span>
                    <span>
                        <Button
                            className={ props.classes.submitButton }
                            variant={ 'contained' }
                            onClick={ props.onSubmit }
                        >
                            Submit
                        </Button>
                    </span>
                </form>
            </div>
        </Toolbar>
    </AppBar>

Search.propTypes = {
    classes: PropTypes.any,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
}

export default withStyles(styles, { withTheme: true })(Search)
