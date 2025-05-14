import db from '../models/index.js';
import paginateAndSearch from '../utils/table.js';

async function get(req, res) {
  try {
    const id = req.params.id;
    const result = await db.Role.findByPk(id, {
      include: [
        {
          model: db.Permission,
          as: 'permissions',
          through: { attributes: [] }, // Hide pivot table fields
        }
      ]
    });

    const leftList = [
      'manage_front_cms', 
      'manage_settings', 
      'manage_specialities',
      'manage_doctors', 
      'manage_staff', 
      'manage_doctors_holiday', 
      'manage_doctor_sessions',
    ];

    const rightList = [
      'manage_admin_dashboard',
      'manage_appointments', 
      'manage_patients', 
      'manage_patient_visits',
      'manage_transactions', 
      'manage_medicines', 
      'manage_clinic_service', 
      'manage_report',
    ];

    const permissions = await db.Permission.findAll();
    res.json({
      data: result,
      left_list : permissions.filter(permission => { return leftList.includes(permission.name)}),
      right_list : permissions.filter(permission => { return rightList.includes(permission.name)})
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function create(req, res) {
  try {
    const { display_name, permission_ids } = req.body;

    const count = await db.Role.count({
      where : {
        display_name
      }
    });

    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate role name' });;
    }

    const role = await db.Role.create({ 
      display_name,
      name: display_name
    });
    role.setPermissions(permission_ids);

    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = req.params.id;
    const { display_name, permission_ids } = req.body;

    const count = await db.Role.count({
      where : {
        display_name,
        id : {
          [db.Sequelize.Op.ne] : id
        }
      }
    });
    
    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate email' });;
    }

    const role = await db.Role.findOne({
      where: { id }
    });

    if (role) {
      await role.update({ 
        display_name,
        name: display_name
      });
      role.setPermissions(permission_ids);
    }

    res.status(201).json({ message: 'Update clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const role = await db.Role.findOne({
      where: { id },
    });

    if (role) {
      await role.setPermissions([]);
      await role.destroy();
    }

    res.status(200).json({ message: 'Delete clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function index(req, res) {
  try {
    const result = await paginateAndSearch({
      model: db.Role,
      attributes : [
        'id',
        'display_name',
        'is_default'
      ],
      searchFields: [
        'display_name',
      ],
      filterFields: ['is_default'],
      include: [
        {
          model: db.Permission,
          as: 'permissions',
          through: {attributes:[]}
        },
      ],
      query: {
        is_default: {
          [db.Sequelize.Op.ne] : 2
        },
        ...req.query
      },
      allowedOrderFields: ['display_name'],
      defaultOrderField: 'id',
      defaultOrderDirection: 'ASC',
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  get,
  create,
  update,
  destroy,
  index
}