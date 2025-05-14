export default (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        doctor_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        patient_id: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        from_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        from_time_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        to_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        to_time_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        service_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        region_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payable_amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        payment_method: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        appointment_unique_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        patient_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clinic_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        }
    },
    {
        tableName: 'appointments',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Appointment.BOOKED = 1;
    Appointment.CHECK_IN = 2;
    Appointment.CHECK_OUT = 3;
    Appointment.CANCELLED = 4;

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
    };
    
    return Appointment;
};