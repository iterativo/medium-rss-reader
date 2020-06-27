import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import * as PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
    history: {
        backgroundColor: theme.palette.secondary,
        color: '#000000',
        padding: 10,
        marginLeft: 273,
    },
    historyLink: {
        cursor: 'pointer',
    },
})

const SearchHistory = props => {
    const onItemClick = (e, feedName) => {
        e.preventDefault()
        props.onItemClick(feedName)
    }

    return (
        <Grid className={ props.classes.history }>
            <Typography variant={ 'overline' }>Recent Searches</Typography>
            <List disablePadding={ true }>
                {
                    props.history.map(feedName => (
                        <ListItem key={ feedName }>
                            <ListItemIcon>
                                <RssFeedIcon
                                    className={ props.classes.historyLink }
                                    color={ 'action' }
                                    onClick={ e => onItemClick(e, feedName) }
                                />
                            </ListItemIcon>
                            <ListItemText primary={ feedName } />
                        </ListItem>
                    ))
                }
            </List>
        </Grid>
    )
}

SearchHistory.propTypes = {
    classes: PropTypes.any,
    history: PropTypes.arrayOf(PropTypes.any),
    onItemClick: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(SearchHistory)
