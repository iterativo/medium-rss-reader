import express from 'express'
import axios from 'axios'
import xml from 'xml'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/health', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.get('/feeds/:name', async (req, res) => {
    const { name } = req.params
    const response = await axios.get(`https://medium.com/feed/${name}`)
    res.set('Content-Type', 'text/xml')
    res.send(xml(response.data))
})

app.listen(
    process.env.PORT || 8080,
    () => console.log('Server listening on http://localhost:8080')
)
