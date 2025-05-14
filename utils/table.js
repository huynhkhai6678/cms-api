import db from '../models/index.js';
const { Sequelize } = db;
const { Op } = Sequelize;

/**
 * Generic pagination and search helper for Sequelize models
 */
async function paginateAndSearch({
  model,
  attributes = [],
  searchFields = [],
  filterFields = [],
  include = [],
  query = {},
  allowedOrderFields = [],
  allowedOrderDirections = ['ASC', 'DESC'],
  defaultOrderField = 'created_at',
  defaultOrderDirection = 'DESC',
}) {
  const {
    search,
    page = 1,
    limit = 10,
    orderBy,
    order,
    ...restFilters
  } = query;

  const offset = (page - 1) * limit;

  // Construct search filters
  const searchFilters = [];
  if (search && searchFields.length) {
    for (const field of searchFields) {
      searchFilters.push({ [field]: { [Op.like]: `%${search}%` } });
    }
  }

  // Construct field-specific filters
  const exactFilters = {};
  for (const field of filterFields) {
    if (restFilters[field] !== undefined && restFilters[field] !== '') {
      exactFilters[field] = restFilters[field];
    }
  }

  // Combine filters
  const where = {
    ...exactFilters,
    ...(searchFilters.length ? { [Op.or]: searchFilters } : {}),
  };

  // Safe ordering
  const safeOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : defaultOrderField;
  const safeOrder = allowedOrderDirections.includes(order?.toUpperCase()) ? order.toUpperCase() : defaultOrderDirection;

  // Execute query
  const { count, rows } = await model.findAndCountAll({
    where,
    include,
    limit: +limit,
    offset: +offset,
    order: [[Sequelize.literal(`\`${safeOrderBy}\``), safeOrder]],
    attributes,
    distinct: true,
  });

  return {
    data: rows,
    pagination: {
      page: +page,
      limit: +limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

export default paginateAndSearch;