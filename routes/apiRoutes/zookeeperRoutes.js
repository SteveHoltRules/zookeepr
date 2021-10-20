const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");
const router = require("express").Router();

router.get("/zookeepers", (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(req.query);
  res.json(results);
});

router.get("/zookeepers/:id", (req, res) => {
  //What is params? Why is it used?
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
    console.log(result);
  } else {
    res.sendStatus(404);
    console.log("DANGER Will Robinson!");
  }
});

router.post("/zookeepers", (req, res) => {
  //req.body is where our incoming content will be
  console.log("req.body", req.body);
  //set id based on what the next index of the array will be
  req.body.id = zookeepers.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateZookeeper(req.body)) {
    res.status(400).send("The zookeepers is not properly formatted.");
  } else {
    //add zookeepers to JSON file and zookeepers array in this function
    const zookeepers = createNewZookeeper(req.body, zookeepers);
    //this is the response that is seen in Insomnia
    res.json(zookeepers);
  }
});

module.exports = router;