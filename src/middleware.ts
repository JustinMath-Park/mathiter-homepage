import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude from i18n middleware:
  //   - _next : Next.js internals
  //   - admin : locale-agnostic admin section (would 404 as /ko/admin)
  //   - api   : JSON API routes (e.g. /api/payment/confirm) — without this,
  //             POST requests get redirected to a localized HTML page,
  //             causing "Unexpected token '<'" JSON parse errors on the
  //             client (see Toss payment confirm flow).
  //   - paths with file extensions (static assets, favicons, etc.)
  matcher: ["/((?!_next|admin|api|.*\\..*).*)"],
};
