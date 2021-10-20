const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");
jest.mock("fs");

test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper({
    name: "Ryan",
    age: 20,
  }, zookeepers);

  expect(zookeeper.name).toBe("Ryan");
  expect(zookeeper.age).toBe(20);
});

test("filters by query", () => {
  const startingZookeeper = [
    {
      id: "4",
      name: "Ryan",
      age: 20,
      favoriteAnimal: "dog",
    },
    {
      id: "5",
      name: "Alex",
      age: 32,
      favoriteAnimal: "Sloths",
    },
  ];

  const updatedZookeepers = filterByQuery({ name : "Ryan" }, startingZookeeper);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeeper = [
    {
      id: "4",
      name: "Ryan",
      age: 20,
      favoriteAnimal: "dog",
    },
    {
      id: "5",
      name: "Alex",
      age: 32,
      favoriteAnimal: "Sloths",
    },
  ];

  const result = findById("4", startingZookeeper);
  expect(result.name).toBe("Ryan");
});

test("validates personality traits", () => {
  const zookeeper =     
  {
      id: "4",
      name: "Ryan",
      age: 20,
      favoriteAnimal: "dog",
  };

  const invalidZookeeper = 
  {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
