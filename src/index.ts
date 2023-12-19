import express from 'express';

const app = express();
const port = 4002;

app.use('/media', express.static('media'));

app.get('/', (req, res) => {
  res.send('vedia service');
});

app.listen(port, () => {
  console.log(`Media server is running`);
});
