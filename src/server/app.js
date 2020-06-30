import express from 'express'
import path from 'path'
import Parser from 'rss-parser'
import { History } from './store'
import { toViewModel } from './modelMapper'

const parser = new Parser()

const app = express()

const history = new History()

app.use(express.static(path.join(__dirname, '..', '..', 'build')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.get('/feeds/:name', async (req, res) => {
    const { name } = req.params
    try {
        const feed = await parser.parseURL(`https://medium.com/feed/${ name }`)
        history.push(name)
        return res.status(200).json({
            feed: toViewModel(feed),
            history: history.recent,
        })
    } catch (e) {
        return res.sendStatus(500)
    }
})

app.get('/history', async (req, res) => {
    res.status(200).json(history.recent)
})

const port = process.env.PORT || 8080
app.listen(
    port,
    () => console.log(`Server listening on http://localhost:${ port }`)
)
