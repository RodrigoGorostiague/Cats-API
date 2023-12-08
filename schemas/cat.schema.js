const Joi = require('joi');

const id = Joi.number()
              .integer()
              .min(0);

const name = Joi.string()
                .min(3)
                .max(30);

const color = Joi.string()
                .min(3)
                .max(30);

const image = Joi.string()
                .uri();


const createCatSchema = Joi.object({
    name: name.required(),
    color: color.required(),
    image: image.required()
});

const updateCatSchema = Joi.object({
    name: name,
    color: color,
    image: image
});

const getCatsSchema = Joi.object({
   id: id.required()
});

module.exports = { createCatSchema, updateCatSchema, getCatsSchema };