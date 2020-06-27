import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import React from 'react'

const styles = {
    error: {
        background: '#d21313',
            color: '#ffffff',
            padding: 5,
            display: 'flex',
            justifyContent: 'center',
    },
}

const SearchError = props =>
    <Grid className={ props.classes.error }>
        <Typography>Oops! Check the feed name and try again.</Typography>
    </Grid>

SearchError.propTypes = {
    classes: PropTypes.any,
}

export default withStyles(styles)(SearchError)
