const express = require('express');
const router = express.Router();
const { addCourse, getCourses } = require('../actions/courseActions');

/*
 * Acceso: PUBLICO
 * Ruta: /api/course
 * Tipo: POST
 */
router.post('/', async (req, res) => {
  const response = await addCourse(req.body);
  if (response.error) res.status(301).json(response);
  else res.json(response);
});

/*
 * Acceso: PUBLICO
 * Ruta: /api/course
 * Tipo: GET
 */
router.get('/', async (_, res) => {
  const response = await getCourses();
  if (response.error) res.status(301).json(response);
  else res.json(response);
});

module.exports = router;
