import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude /admin/* from i18n middleware — admin is locale-agnostic
  // and lives outside the [locale] folder. Without this, /admin gets
  // redirected to /ko/admin which 404s.
  matcher: ["/((?!_next|admin|.*\\..*).*)"],
};
