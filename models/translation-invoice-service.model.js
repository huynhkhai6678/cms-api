export default (sequelize, DataTypes) => {
    const TranslationInvoiceService = sequelize.define('TranslationInvoiceService', 
    {
        transaction_invoice_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        service_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        type : {
            type: DataTypes.STRING,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        price : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        discount : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        sub_total : {
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        uom : {
            type: DataTypes.STRING,
            allowNull: false
        },
        dosage : {
            type: DataTypes.STRING,
            allowNull: false
        },
        frequency : {
            type: DataTypes.STRING,
            allowNull: false
        },
        administration : {
            type: DataTypes.STRING,
            allowNull: false
        },
        purpose : {
            type: DataTypes.STRING,
            allowNull: false
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return TranslationInvoiceService;
};