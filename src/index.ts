import app from "./server/server";
// parseInt(process.env.PORT, 10) ||

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
app.on("error", (err) => {
  console.error(err);
});
