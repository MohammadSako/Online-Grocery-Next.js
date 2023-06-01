import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("next-auth.session-token");
  let url = req.url;

  if (!verify && url.includes("/new-product")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (verify && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

//   if (verify && url === "/login") {
//     return NextResponse.redirect("http://localhost:3000/");
//   }
}
