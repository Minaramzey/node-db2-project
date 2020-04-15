const express = require('express');
const knex = require('knex');
const knexfile = require('../knexfile.js')
const db = knex(knexfile.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('car-dealer')
        .then(cars => {
            if(cars.length > 0) {
                res.status(200).json(cars);
            } else {
                res.status(404).json({ message: "Cars Not Found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error retrieving cars" });
        });
});

router.get('/:id', (req, res) => {
    db('car-dealer')
        .where({ id: req.params.id })
        .first()
        .then(car => {
            if (car) {
                res.status(200).json(car)
            } else {
                res.status(500).json({ message: "Could not find a car with that ID" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error retrieving car" });
        });
});

router.post('/', (req, res) => {
    const carData = req.body;

    db('car-dealer').insert(carData, "id")
        .then(ids => {
            res.status(201).json({ message: "Car Has Been Added", carData});
        })
        .catch(error => {
            res.status(500).json({ message: "Error adding car" });
        });
});



module.exports = router;