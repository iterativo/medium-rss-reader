import express from 'express'
import path from 'path'
import Parser from 'rss-parser'

const parser = new Parser()

const app = express()

class History {
    history = []
    maxSize = 5

    push(item) {
        if (this.history.includes(item)) {
            this.history.sort((x, y) => x === item ? -1 : y === item ? 1 : 0)
        } else {
            this.history.unshift(item)
            this.history = this.history.slice(0, this.maxSize)
        }
    }

    get recent() {
        return this.history
    }
}

const history = new History()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/health', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.get('/feeds/:name', async (req, res) => {
    const { name } = req.params
    try {
        const feed = await parser.parseURL(`https://medium.com/feed/${ name }`)
        history.push(name)
        return res.status(200).json({ feed, history: history.recent })
    } catch (e) {
        return res.sendStatus(500)
    }
})

app.get('/history', async (req, res) => {
    res.status(200).json(history.recent)
})

app.listen(
    process.env.PORT || 8080,
    () => console.log('Server listening on http://localhost:8080')
)
