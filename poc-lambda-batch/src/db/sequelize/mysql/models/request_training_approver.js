'use strict';

module.exports = (sequelize, DataTypes) => {
    const RequestTrainingApprover = sequelize.define('request_training_approver', {
        user_id: {
            type: DataTypes.STRING
        },
        manager_id: {
            type: DataTypes.STRING
        },
        class_code: {
            type: DataTypes.STRING
        },
        class_name: {
            type: DataTypes.STRING
        },
        class_date: {
            type: DataTypes.DATEONLY
        },
        class_type: {
            type: DataTypes.STRING
        },
        class_registation_date: {
            type: DataTypes.DATEONLY
        },
        approver_status: {
            type: DataTypes.STRING
        },
        approver_date: {
            type: DataTypes.DATE
        },
        enabled: {
            type: DataTypes.BOOLEAN
        },
        created_at: {
            type: DataTypes.DATE
        },
        created_by: {
            type: DataTypes.STRING
        },
        updated_at: {
            type: DataTypes.DATE
        },
        updated_by: {
            type: DataTypes.STRING
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleted_at: {
            type: DataTypes.DATE
        },
        deleted_by: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: false
    });

    RequestTrainingApprover.associate = function (models) {

    };

    return RequestTrainingApprover;
};