import _ from 'lodash'

export const toViewModel = (feed) => ({
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
