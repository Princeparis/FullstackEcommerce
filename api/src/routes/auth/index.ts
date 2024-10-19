import { Router } from "express";
import {
  createUsersSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema";
import { validateData } from "../../middleware/validationMiddleware";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(createUsersSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();
    // @ts-ignore
    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      res.status(401).json({ error: "Authentication Failed" });
      return;
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({ error: "Authentication Failed" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
  res.status(200).send("login");
});

export default router;
