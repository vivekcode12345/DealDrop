import { createBrowserClient } from '@supabase/ssr';

const COOKIE_NAME_PREFIX = 'sb-';

function getCookie(name) {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return;
  let cookieString = `${name}=${encodeURIComponent(value)}`;
  if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
  if (options.domain) cookieString += `; Domain=${options.domain}`;
  if (options.path) cookieString += `; Path=${options.path}`;
  if (options.secure) cookieString += '; Secure';
  if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;
  document.cookie = cookieString;
}

function removeCookie(name, options = {}) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Max-Age=0; Path=${options.path || '/'}; ${
    options.domain ? `Domain=${options.domain}; ` : ''
  }`;
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        get(name) {
          return getCookie(name);
        },
        set(name, value, options) {
          setCookie(name, value, options);
        },
        remove(name, options) {
          removeCookie(name, options);
        },
      },
    }
  );
}