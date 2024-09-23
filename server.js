import express from "express";
import pool from "./db.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user_query = await pool.query(
      `Select users.username, users.password, roles.role_name
      from users
      left join user_roles on users.user_id = user_roles.user_id
      left join roles on user_roles.role_id = roles.role_id
      where users.username = $1`,
      [username]
    );

    if (user_query.rows.length > 0) {
      const user = user_query.rows[0];

      console.log("Ne Geldim Bakim ->", user);
      const password_match = await bcrypt.compare(password, user.password);

      if (password_match) {
        const token = jwt.sign(
          {
            user_id: user.user_id,
            username: user.username,
            role: user.role_name,
          },
          JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        // token bilgilerini front a gönder
        res.json({ status: "success", token });

        // if (user.role_name === "admin") {
        //   res.json({ status: "success", roles: "admin", username: user.username });
        // } else {
        //   res.json({ status: "success", roles: "user", username: user.username });
        // }
      } else {
        res.status(401).json({ message: "Şifre Geçeriz." });
      }
    } else {
      res.status(401).json({ message: "Kullanıcı Mevcut Değil." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Hatası. " });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Username ve password gerekli" });
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = await pool.query(
      `INSERT INTO users(username, password)
      VALUES ($1, $2) RETURNING *`,
      [username, hashed_password]
    );

    const user_id = new_user.rows[0].user_id;

    const roles_user_query = await pool.query(`SELECT role_id FROM roles WHERE role_name = $1`, ["user"]);

    const user_role_id = roles_user_query.rows[0].role_id;

    await pool.query(
      `
      INSERT INTO user_roles (user_id, role_id)
      VALUES ($1, $2)
      `,
      [user_id, user_role_id]
    );

    res.json(new_user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Hatası. " });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
