import express, { NextFunction, Request, Response } from "express";
import productRoutes from "./routes/products";

const app = express();

app.use(express.json());
app.use("/products", productRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
