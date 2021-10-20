const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();

router.get("/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(req.query);
  res.json(results);
});

router.get("/animals/:id", (req, res) => {
  //What is params? Why is it used?
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
    console.log(result);
  } else {
    res.sendStatus(404);
    console.log("DANGER Will Robinson!");
  }
});

router.post("/animals", (req, res) => {
  //req.body is where our incoming content will be
  console.log("req.body", req.body);
  //set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    //add animal to JSON file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    //this is the response that is seen in Insomnia
    res.json(animal);
  }
});

module.exports = router;

