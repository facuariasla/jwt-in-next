import { verify } from "jsonwebtoken";
export default function (req, res) {
  const { myTokenName } = req.cookies;

  try {
    const user = verify(myTokenName, "secret");
    console.log(user);
    return res.json({ email: user.email, username: user.username });
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
}
