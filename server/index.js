const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "460631e215a8ebf35f7720d3020ee700286552d09bce9e4e41c78b07c23c210c";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;
  // TODO: prove that a name is in the list
  let isInTheList = verifyProof(proof, name, MERKLE_ROOT) ? true : false;

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
