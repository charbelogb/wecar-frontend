import { NextResponse } from 'next/server';

export function middleware() {
  // No protected routes in the MVP — all pages are publicly accessible.
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
