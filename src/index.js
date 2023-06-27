// index file serves as a main file entry point
const app = require("./app");

const PORT = process.env.PORT || 4545;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} 🚀`);
});
