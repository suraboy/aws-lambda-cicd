'use strict';

module.exports = (sequelize, DataTypes) => {
    const BatchEmployeesInfo = sequelize.define('batch_employees_info', {
          status : {
            type: DataTypes.STRING,
            allowNull: true
          },
          user_id : {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: true
          },
          username : {
            type: DataTypes.STRING,
            allowNull: true
          },
          title_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          fullname : {
            type: DataTypes.STRING,
            allowNull: true
          },
          cost_center : {
            type: DataTypes.STRING,
            allowNull: true
          },
          gender : {
            type: DataTypes.STRING,
            allowNull: true
          },
          email : {
            type: DataTypes.STRING,
            allowNull: true
          },
          manager_id : {
            type: DataTypes.STRING,
            allowNull: true
          },
          hr : {
            type: DataTypes.STRING,
            allowNull: true
          },
          employee_unit_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          employee_unit_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          location : {
            type: DataTypes.STRING,
            allowNull: true
          },
          job_code : {
            type: DataTypes.STRING,
            allowNull: true
          },
          company_group : {
            type: DataTypes.STRING,
            allowNull: true
          },
          hiring_date : {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          employee_type : {
            type: DataTypes.STRING,
            allowNull: true
          },
          position : {
            type: DataTypes.STRING,
            allowNull: true
          },
          phone_ext : {
            type: DataTypes.STRING,
            allowNull: true
          },
          job_title_date : {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          title_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          firstname_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          lastname_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          corporate_title : {
            type: DataTypes.STRING,
            allowNull: true
          },
          supervisor_level : {
            type: DataTypes.STRING,
            allowNull: true
          },
          job_title_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          job_title_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          service_start_date : {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          resignation_date : {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          corporate_title_date : {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          org_level_1_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_2_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_2_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_3_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_3_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_4_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_4_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_5_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_5_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_6_en : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_6_th : {
            type: DataTypes.STRING,
            allowNull: true
          },
          org_level_7 : {
            type: DataTypes.STRING,
            allowNull: true
          },
          employee_unit_id : {
            type: DataTypes.STRING,
            allowNull: true
          },
          matrix_manager : {
            type: DataTypes.STRING,
            allowNull: true
          },
          default_locale : {
            type: DataTypes.STRING,
            allowNull: true
          },
          not_used_proxy : {
            type: DataTypes.STRING,
            allowNull: true
          },
          custom_manager : {
            type: DataTypes.STRING,
            allowNull: true
          },
          second_manager : {
            type: DataTypes.STRING,
            allowNull: true
          },
          login_method : {
            type: DataTypes.STRING,
            allowNull: true
          }, 
          enabled: {
              type: DataTypes.BOOLEAN,
              allowNull: true
          },
          created_at: {
              type: DataTypes.DATE,
              allowNull: true
          },
          created_by: {
              type: DataTypes.STRING,
              allowNull: true
          },
          updated_at: {
              type: DataTypes.DATE,
              allowNull: true
          },
          updated_by: {
              type: DataTypes.STRING,
              allowNull: true
          },
          deleted: {
              type: DataTypes.BOOLEAN,
              defaultValue: false,
              allowNull: true
          },
          deleted_at: {
              type: DataTypes.DATE,
              allowNull: true
          },
          deleted_by: {
              type: DataTypes.STRING,
              allowNull: true
          }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: false
    });

    BatchEmployeesInfo.associate = function(models) {

    };

    return BatchEmployeesInfo;
};