import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(
    ((env) => {
      switch (env) {
        case 'development':
          return '.development.env';
        default:
          return '';
      }
    })(process.env.NODE_ENV),
  ),
});
