import express, {json, urlencoded} from 'express'
import productRouter from './routes/products'

const PORT = 8080
const app = express()

app.use(urlencoded({extended: false}))
app.use(json())

app.use('/products', productRouter)


app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
})