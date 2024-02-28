const { Op } = require("sequelize");
const { Product, Stocksize } = require("../db");

const searchBarController = async (typeSearch) => {
    try {
        const searchResults = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${typeSearch}%` } },
                    { type: { [Op.iLike]: `%${typeSearch}%` } },
                    { brand: { [Op.iLike]: `%${typeSearch}%` } },
                ],
            },
            include: [Stocksize] // Incluir información de stock
        });
        return searchResults;
    } catch (error) {
        throw new Error("Error searching products: " + error.message);
    }
};

module.exports = {
    searchBarController,
};