const express = require("express");

const router = express.Router();
const { Jewelry, Location, Client } = require("../models");

/**
 * @openapi
 * /location:
 *   get:
 *     tags:
 *       - Locations
 *     summary: Récupère une liste de tous les location avec des options de tri et de pagination
 *     parameters:
 *       - in: query
 *         name: jewelryId
 *         schema:
 *           type: int
 *         description: Filtre par jewelryId
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: int
 *         description: Filtre par clientId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Champ pour le tri
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ordre de tri (ascendant ou descendant)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite le nombre de résultats retournés
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Nombre de résultats à ignorer au début
 *     responses:
 *       200:
 *         description: Liste des location, triée et paginée
 *       500:
 *         description: Erreur serveur
 */
router.get("/", async (req, res) => {
  try {
    const filterOptions = {};
    if (req.query.clientId) {
      filterOptions.clientId = req.query.clientId;
    }
    if (req.query.jewelryId) {
      filterOptions.jewelryId = req.query.jewelryId;
    }

    const sortOptions = [];
    if (req.query.sortBy) {
      sortOptions.push([req.query.sortBy, req.query.sortOrder || "asc"]);
    }

    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const locations = await Location.findAll({
      where: filterOptions,
      order: sortOptions.length ? sortOptions : undefined,
      limit: limit,
      offset: offset,
      include: [
        {
          model: Client,
          attributes: ["firstName", "lastName"],
        },
        {
          model: Jewelry,
          attributes: ["description", "priceSale", "priceLocation"],
        },
      ],
    });

    res.json(locations);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
