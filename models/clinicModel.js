import db from "../config/database.js";

const getAllClinics = () => {
  return db.query('SELECT * FROM clinics');
};

const getClinicList = async (page = 1, limit = 10, search = '', orderBy = 'clinics.created_at', order = 'desc') => {
  const offset = (page - 1) * limit;
  const filters = [];
  const values = [];

  if (search) {
    filters.push('(clinics.name LIKE ? OR addresses.address1 LIKE ? OR states.name LIKE ? OR clinics.phone LIKE ?)');
    values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  const where = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

  const allowedOrderFields = ['clinics.name', 'dress1', 'states.name', 'clinics.created_at'];
  const allowedOrderDirections = ['asc', 'desc'];

  const safeOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : 'clinics.created_at';
  const safeOrder = allowedOrderDirections.includes(order.toLowerCase()) ? order.toUpperCase() : 'DESC';

  const [countRows] = await db.query(
    `SELECT COUNT(*) as total FROM clinics
    join addresses on addresses.owner_id = clinics.id 
    join states on states.id = addresses.state_id 
    ${where}`,
    values
  );
  const total = countRows[0].total;

  // Fetch data with pagination
  const [rows] = await db.query(
    `SELECT clinics.id, clinics.name, clinics.type, addresses.address1, addresses.postal_code, clinics.region_code, clinics.phone, states.name FROM clinics 
    join addresses on addresses.owner_id = clinics.id 
    join states on states.id = addresses.state_id 
    ${where} ORDER BY ${safeOrderBy} ${safeOrder} LIMIT ? OFFSET ?`,
    [...values, +limit, +offset]
  );

  return {
    data: rows,
    pagination: {
      page: +page,
      limit: +limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getClinicById = (id) => {
  return db.query('SELECT * FROM clinics WHERE id = ?', [id]);
};

const createClinic = (name, address, phone, code, landing_name) => {
  return db.query('INSERT INTO clinics (name, address, phone, code, landing_name) VALUES (?, ?, ?, ?, ?)', 
    [name, address, phone, code, landing_name]
  );
};

const deleteClinic = (id) => {
  return db.query('DELETE FROM clinics WHERE id = ?', [id]);
};

export default  {
  getClinicList,
  getAllClinics,
  getClinicById,
  createClinic,
  deleteClinic
};