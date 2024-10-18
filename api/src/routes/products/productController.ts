import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productSchema";
import { eq } from "drizzle-orm";
import { asyncHandler } from "../../utils/asyncHandler";
import _ from "lodash";
import { createProductSchema } from "../../db/productSchema";

export const listProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json(product);
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updatedData = req.cleanBody;
    const [product] = await db
      .update(productsTable)
      .set(updatedData)
      .where(eq(productsTable.id, id))
      .returning();
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);
