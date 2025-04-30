export default (sequelize, DataTypes) => {
    const TranslationInvoice = sequelize.define('TranslationInvoice', 
    {
        doctor_id: {
            type: DataTypes.BIGINT(20),
        },
        user_id: {
            type: DataTypes.BIGINT(20),
        },
        invoice_number : {
            type: DataTypes.STRING,
            allowNull: false
        },
        important_notes : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tax : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        total : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        net_amount : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        discount : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        discount : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_type : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            default: 1
        },
        note : {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_note : {
            type: DataTypes.STRING,
            allowNull: false
        },
        bill_date : {
            type: DataTypes.DATE,
            allowNull: false
        },
        visit_id: {
            type: DataTypes.BIGINT(20)
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'transaction_invoices',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return TranslationInvoice;
};