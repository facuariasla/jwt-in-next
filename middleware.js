import { NextResponse } from "next/server";
//modulo estandar alternativo a jsonwebtok -> jose
import { jwtVerify } from "jose";

export async function middleware(request) {
  // console.log("middleware");
  // nextUrl, es un formato objeto de todas las url
  // console.log(request.nextUrl);
  // console.log(request.nextUrl.pathname);

  const jwt = request.cookies.get("myTokenName");
  console.log(jwt);
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    // ver que jose, recibe el 'secret' de una forma particular, dentro de un new TextEncoder etc
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Aca van todas las url que no puedo visitar si no estoy logeado
export const config = {
  // manera de marcar todas las rutas de la carpeta /admin -> /admin/:path*
  matcher: ["/dashboard/:path*", '/', '/admin/:path*'],
};
