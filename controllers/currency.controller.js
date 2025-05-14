import db from '../models/index.js';
import paginateAndSearch from '../utils/table.js';

async function get(req, res) {
  try {
    const id = req.params.id;
    const result = await db.Currency.findByPk(id);

    if (!result) {
      return res.json({
        data : null,
      });
    }

    res.json({
      data: result,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function create(req, res) {
  try {
    const { currency_name, currency_icon, currency_code } = req.body;

    const count = await db.Currency.count({
      where : {
        currency_name
      }
    });

    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate currency name' });;
    }

    await db.Currency.create({ 
      currency_name, currency_icon, currency_code
    });

    res.status(201).json({ message: 'Create clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function update(req, res) {
  try {
    const id = req.params.id;
    const { currency_name, currency_icon, currency_code } = req.body;

    const count = await db.Currency.count({
      where : {
        currency_name,
        id : {
          [db.Sequelize.Op.ne] : id
        }
      }
    });
    
    if (count > 0) {
      return res.status(400).json({ error: 'Duplicate email' });;
    }

    const currency = await db.Currency.findOne({
      where: { id }
    });

    if (currency) {
      await currency.update({ 
        currency_name, currency_icon, currency_code
      });
    }

    res.status(201).json({ message: 'Update clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const currency = await db.Currency.findOne({
      where: { id },
    });

    if (currency) {
      await currency.destroy();
    }

    res.status(200).json({ message: 'Delete clinic successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function index(req, res) {
  try {
    const result = await paginateAndSearch({
      model: db.Currency,
      attributes : [
        'id',
        'currency_name',
        'currency_icon',
        'currency_code',
      ],
      searchFields: [
        'currency_name',
        'currency_icon',
        'currency_code',
      ],
      filterFields: [],
      include: [
      ],
      query: {
        ...req.query
      },
      allowedOrderFields: ['currency_name', 'currency_icon', 'currency_code'],
      defaultOrderField: 'created_at',
      defaultOrderDirection: 'DESC',
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