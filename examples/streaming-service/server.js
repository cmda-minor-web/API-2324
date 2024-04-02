import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const engine = new Liquid({
  extname: '.liquid'
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist/assets'))
  .listen(3000);

app.get('/', async (req, res) => {
  const movieData = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${process.env.MOVIEDB_TOKEN}`)
    .then(res => res.json());
  return res.send(renderTemplate('views/index.liquid', { title: 'Movies', movieData }));
});

app.get('/movie/:id/', async (req, res) => {
  const movieId = req.params.id;
  const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_TOKEN}`).then(res => res.json());
  return res.send(renderTemplate('views/detail.liquid', { title: 'Movie', movie }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

