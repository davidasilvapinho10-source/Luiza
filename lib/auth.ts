import { cookies } from 'next/headers';
import { createHmac } from 'crypto';

const COOKIE_NAME = 'luiza_admin_session';

function sign(payload: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function createSession(adminId: number) {
  const payload = JSON.stringify({ adminId, exp: Date.now() + 1000 * 60 * 60 * 12 });
  const token = Buffer.from(payload).toString('base64url');
  const sig = sign(token);
  return `${token}.${sig}`;
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export function getSessionAdminId() {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw || !raw.includes('.')) return null;
  const [token, sig] = raw.split('.');
  if (sign(token) !== sig) return null;
  const parsed = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as {
    adminId: number;
    exp: number;
  };
  if (Date.now() > parsed.exp) return null;
  return parsed.adminId;
}
