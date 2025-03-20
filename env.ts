import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(
    ((env) => {
      switch (env) {
        case 'production':
          return '.production.env';
        default:
          return '.development.env';
      }
    })(process.env.NODE_ENV),
  ),
});
export function isCloudflareEnvironment() {
  // Cloudflare Workers 환경에서만 존재하는 전역 객체 확인
  return typeof globalThis.caches !== 'undefined';
}
