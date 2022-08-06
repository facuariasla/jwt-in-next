import { verify } from "jsonwebtoken";
import cookie, { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    verify(myTokenName, "secret");
    // Es ideal que el token se devuelva 'serializado' (cookie library)
    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      // Si estamos en produccion, necesitamos SSL, sino, no es necesario SSL
      secure: process.env.NODE_ENV === "production",
      // Si voy a comunicarme con un backend externo, uso 'none':
      sameSite: "strict",
      // Tiempo 0, es decir, token expirado, quiero cerrar sesion
      maxAge: 0,
      path: "/",
    });
    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({message: 'logout succesfully'})
  } catch (error) {
    return res.status(401).json({error: 'invalid token'})
  }
}
