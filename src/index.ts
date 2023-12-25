import express from "express";
import useRouter from './images/image.router';

const app = express();
const port = 4002;

app.use(express.json({ limit: '50mb' }));

app.use("/media", express.static("media"));

app.use('/', useRouter);

app.listen(port, () => {
  console.log(`Media server is running`);
});
