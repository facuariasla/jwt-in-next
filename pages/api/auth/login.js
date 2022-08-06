import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  // check if email and password are valid
  //if email exists
  //if password is correct

  if (email === "admin@local.local" && password === "admin") {
    const token = jwt.sign(
      {
        // token valido por 30 dias en exp:
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: "admin@local.local",
        username: "facu",
      },
      "secret"
    );

    // Es ideal que el token se devuelva 'serializado' (cookie library)
    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      // Si estamos en produccion, necesitamos SSL, sino, no es necesario SSL
      secure: process.env.NODE_ENV === "production",
      // Si voy a comunicarme con un backend externo, uso 'none':
      sameSite: "strict",
      maxAge: 100 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.json("login succesfully");
  }
  return res.status(401).json({ error: "invalid email or password" });
}
 