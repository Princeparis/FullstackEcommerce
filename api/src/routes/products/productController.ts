import {Request, Response} from 'express'

export function listProducts (req: Request, res: Response)  {
    res.send('list of products.....')
}
export function getProductById (req: Request, res: Response)  {
    res.send('Product')
}
export function createProduct (req: Request, res: Response)  {
    console.log(req.body)
    res.send('New Product added')
        }
export function updateProduct (req: Request, res: Response)  {
    res.send('Product updated...')
}
export function deleteProduct (req: Request, res: Response)  {
    res.send('Delete Product')
}