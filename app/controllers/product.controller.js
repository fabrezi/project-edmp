const db = require("../models");
const Product = db.products;
const MDA = db.data_agreements.masterDataAgreement;

const Op = db.Sequelize.Op;

exports.rct = async (req, res) => {
  productId = req.body.productId;
  userOrg = req.body.userOrganization;

  const product = await Product.findByPk(productId);
  const prodOrg = product.ownerCompany;

  if (userOrg !== prodOrg) {
    //Check for MDA

    console.log(db.data_agreements[userOrg.toLowerCase() + "DataAgreement"]);
    if (!db.data_agreements[userOrg.toLowerCase() + "DataAgreement"]) {
      res.status(400).send("No such organization!");
      return;
    }

    const mda = await MDA.findOne({
      where: { productId: product.id },
      include: db.data_agreements[userOrg.toLowerCase() + "DataAgreement"]
    });

    const agreements = mda[userOrg.toLowerCase() + "DataAgreement"];

    if (agreements.hasMda !== true) {
      res.send(`Dispatch task to "Data Agreement" Assignment Group`);
      return;
    }

    if (agreements.regulatoryControlNeeded === true) {
      if (agreements.hasDsa !== true) {
        res.send(`Dispatch task to "Data Agreement" Assignment Group`);
        return;
      }
    }
  }

  res.send("End");
};

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    name: req.body.name,
    shortName: req.body.shortName,
    briefDesc: req.body.briefDesc,
    shortDesc: req.body.shortDesc,
    slug: req.body.slug,
    dataType: req.body.dataType,
    classification: req.body.classification,
    steward: req.body.steward,
    poc: req.body.poc,
    intendedUse: req.body.intendedUse,
    dataType: req.body.dataType,
    sku: req.body.sku,
    price: req.body.price,
    compareAtPrice: req.body.compareAtPrice,
    badges: req.body.badges,
    keywords: req.body.keywords,
    searchTags: req.body.searchTags,
    sampleData: req.body.sampleData,
    rating: req.body.rating,
    reviews: req.body.reviews,
    availability: req.body.availability,
    brand: req.body.brand,
    team: req.body.team,
    affiliate: req.body.affiliate,
    categories: req.body.categories,
    attributes: req.body.attributes,
    steward: req.body.steward,
    preorderTMNA: req.body.preorderTMNA ? req.body.preorderTMNA : false,
    preorderTFS: req.body.preorderTFS ? req.body.preorderTFS : false,
    preorderMTMUS: req.body.preorderMTMUS ? req.body.preorderMTMUS : false,
    preorderTMC: req.body.preorderTMC ? req.body.preorderTMC : false,
    preorderTCNA: req.body.preorderTCNA ? req.body.preorderTCNA : false,
    preorderTCI: req.body.preorderTCI ? req.body.preorderTCI : false,
    preorderWovenPlanet: req.body.preorderWovenPlanet ? req.body.preorderWovenPlanet : false,
    isPublished: req.body.isPublished ? req.body.isPublished : false,
    isEndorsed: req.body.isEndorsed ? req.body.isEndorsed : false,
    isPrime: req.body.isPrime ? req.body.isPrime : false,
    isSensitive: req.body.isSensitive ? req.body.isSensitive : false,
    isPII: req.body.isPII ? req.body.isPII : false,
    isFeatured: req.body.isFeatured ? req.body.isFeatured : false,
    isActive: req.body.isActive ? req.body.isActive : false
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// find all published Product
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { isPublished: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};
