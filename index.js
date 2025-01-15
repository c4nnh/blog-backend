const express = require("express");
const app = express();
const port = 30300;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
