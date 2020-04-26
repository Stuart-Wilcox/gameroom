import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as CookieParser from 'cookie-parser';
import Routes from './routes';
import { Session, Authenticate, Authorize } from './auth';
import * as config from './config';

const app = Express();

// enable CORS in development
if (!process.env.PRODUCTION) {
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', config.DEV_FRONTEND_URL);
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'authorization, content-type');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.send('OPTIONS, GET, POST, DELETE, PUT, PATCH');
      return;
    }
    next();
  });
}
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(Session);
app.use('/api', Authenticate);


// everything below this line will be protected
app.use('/api', Authorize);
app.use('/api', Routes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));