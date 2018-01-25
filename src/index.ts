import app from './server';

const port: number = parseInt(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
app.on("error", (err) => {
  console.error(err);
});