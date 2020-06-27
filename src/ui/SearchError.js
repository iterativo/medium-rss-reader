import { withStyles } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import React from 'react'

const styles = {
    root: {
        background: '#d21313',
        color: '#ffffff',
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
    },
}

const SearchError = props =>
    <Fade in>
        <Grid className={ props.classes.root }>
            <Typography>Oops! Check the feed name and try again.</Typography>
        </Grid>
    </Fade>

SearchError.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(SearchError)
