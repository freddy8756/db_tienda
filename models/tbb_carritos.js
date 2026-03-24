'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_carritos.init({
    id_usuario:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_carritos',
  });
  tbb_carritos.associate = (models) =>{
    tbb_carritos.belongsTo(models.tbc_usuarios, {
      foreignKey: 'id_usuario',
      as:'tbc_usuarios'
    })
     tbb_carritos.hasMany(models.tbc_carrito_detalle, {
      foreignKey: 'id_carrito',
      as:'tbc_carrito_detalle'
    })
  }
  return tbb_carritos;
};