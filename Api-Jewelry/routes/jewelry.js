const express = require("express");

const router = express.Router();
const { Jewelry, Category } = require("../models");
const { Op } = require("sequelize");

/**
 * @openapi
 * /jewelry:
 *   get:
 *     tags:
 *       - Jewelrys
 *     summary: Récupère une liste de tous les bijoux avec des options de filtrage, de tri et de pagination
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrer par l'ID de la catégorie
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Recherche partielle ou complète dans la description des bijoux
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Terme de recherche pour filtrer dans la description des bijoux
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
 *         description: Liste des bijoux, triée et paginée
 *       500:
 *         description: Erreur du serveur
 */
router.get("/", async (req, res) => {
  try {
    const filterOptions = {};
    if (req.query.categoryId) {
      filterOptions.categoryId = req.query.categoryId;
    }

    if (req.query.description || req.query.search) {
      filterOptions.description = {
        [Op.like]: `%${req.query.description || req.query.search}%`,
      };
    }
    if (req.query.fromDate || req.query.toDate) {
      filterOptions.createdAt = {};
      if (req.query.fromDate) {
        filterOptions.createdAt[Op.gte] = req.query.fromDate;
      }
      if (req.query.toDate) {
        filterOptions.createdAt[Op.lte] = req.query.toDate;
      }
    }

    const sortOptions = req.query.sortBy
      ? [[req.query.sortBy, req.query.sortOrder || "asc"]]
      : [];

    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await Jewelry.findAndCountAll({
      where: filterOptions,
      order: sortOptions,
      limit: limit,
      offset: offset,
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      results: rows,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

/**
 * @openapi
 * /jewelry/{id}:
 *  get:
 *    tags:
 *      - Jewelrys
 *    summary: Récupère un bijoux par son ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Détails de bijoux
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Jewelry'
 *      404:
 *        description: Utilisateur non trouvé
 */
router.get("/:id", async (req, res) => {
  try {
    const jewelry = await Jewelry.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    if (jewelry) {
      res.json(jewelry);
    } else {
      res.status(404).send("Bijoux non trouvé");
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
