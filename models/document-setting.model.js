export default (sequelize, DataTypes) => {
    const DocumentSetting = sequelize.define('DocumentSetting', 
    {
        header: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        transaction_receipt_template: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        medical_certificate_template: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        transaction_invoice_template: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        clinic_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
    },
    {
        tableName: 'clinic_document_setting',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return DocumentSetting;
};