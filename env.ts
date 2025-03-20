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
