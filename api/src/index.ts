import express from 'express'
import productRouter from './routes/products'

const PORT = 8080
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/products', productRouter)

const tester = "New"

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})