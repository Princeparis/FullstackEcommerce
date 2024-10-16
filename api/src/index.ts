import express from 'express'

const PORT = 8080
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

const tester = "New"

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})