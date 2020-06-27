import { withStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as PropTypes from 'prop-types'
import React from 'react'

const styles = {
    root: {
        background: '#ffffff',
        color: '#000000',
        flexGrow: 1,
        paddingTop: 20,
    },
    feedCard: {
        minWidth: 275,
        marginLeft: 250,
        marginRight: 250,
    },
    feedTitle: {
        fontSize: 14,
    },
    feedItems: {
        marginTop: 10,
    },
}

const Feed = props =>
    <Box
        className={ props.classes.root }
    >
        <Grid item xs={ 12 }>
            <Card className={ props.classes.feedCard } variant={ 'outlined' }>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        { props.feed.title }
                    </Typography>
                    <Typography className={ props.classes.feedTitle } color="textSecondary" gutterBottom>
                        { props.feed.description }
                    </Typography>
                    <div className={ props.classes.feedItems }>
                        {
                            props.feed.items.map(item => (
                                <div key={ item.title.replace(/\s/g, '') }>
                                    <Divider />
                                    <Typography variant={ 'subtitle2' } style={ { marginTop: 10 } }>
                                        By:&nbsp;{ item.creator }
                                    </Typography>
                                    <Typography variant={ 'subtitle2' }>
                                        On:&nbsp;{ item.pubDate }
                                    </Typography>
                                    <Typography style={ { marginTop: 10 } }>{ item.title }</Typography>
                                    <div dangerouslySetInnerHTML={ { __html: item.content } } />
                                </div>
                            ))
                        }
                    </div>
                </CardContent>
            </Card>
        </Grid>
    </Box>

Feed.propTypes = {
    classes: PropTypes.object,
    feed: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.string,
        items: PropTypes.array,
    }),
}

export default withStyles(styles)(Feed)
