import { Segments, Joi } from 'celebrate'

const booksValidators = {
  index: {
    [Segments.QUERY]: {
      page: Joi.number().min(1),
      size: Joi.number().min(1),
    },
  },
  getOne: {
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  },
  create: {
    [Segments.BODY]: {
      title: Joi.string().required(),
      year: Joi.string()
        .length(4)
        .regex(/^[0-9]*$/)
        .required(),
      ISBN: Joi.string().required(),
    },
  },
  update: {
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      year: Joi.string()
        .length(4)
        .regex(/^[0-9]*$/)
        .required(),
      ISBN: Joi.string().required(),
    },
  },
  delete: {
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  },
}

export default booksValidators
