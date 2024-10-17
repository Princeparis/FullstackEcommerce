import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedData = req.body;
    const [product] = await db
      .update(productsTable)
      .set(updatedData)
      .where(eq(productsTable.id, id))
      .returning();
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
