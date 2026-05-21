"use client";

import { useAuth } from "@/lib/auth-context";
import { navigateToAppWithSSO } from "@/lib/sso";
import type { ReactNode, MouseEvent, CSSProperties } from "react";

type Props = {
  /** Defaults to https://app.mathiter.com */
  href?: string;
  /** Path on app.mathiter.com to land on after SSO sign-in (e.g. "/ko/study"). */
  nextPath?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Optional click handler — called BEFORE SSO navigation. */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Cross-domain link to app.mathiter.com that carries the current Firebase
 * Auth session.
 *
 * - Logged-in users: fetches a 1-hour custom token from /api/sso/grant-token
 *   and lands on `app.mathiter.com/sso?token=...&next=...` which signs them in
 *   automatically before forwarding to the next path.
 * - Logged-out users: plain redirect — app's own login flow handles them.
 *
 * Always preserve the visual styling of the original <a> by passing the same
 * className/children.
 */
export default function AppLink({
  href = "https://app.mathiter.com",
  nextPath,
  className,
  style,
  children,
  onClick,
}: Props) {
  const { user } = useAuth();

  async function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    console.log("[AppLink] click intercepted", { hasUser: !!user, email: user?.email, href, nextPath });
    onClick?.(e);
    if (e.defaultPrevented) return;
    // 평소 a 태그 동작을 가로채서 SSO 흐름 진입
    e.preventDefault();
    await navigateToAppWithSSO(user, href, nextPath);
  }

  return (
    <a href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}
