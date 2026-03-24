'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbc_carrito_detalle.init({
    id_carrito:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER(11),
      defaultValue: 1
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbc_carrito_detalle',
  });
  tbc_carrito_detalle.associate = (models) =>{
    tbc_carrito_detalle.belongsTo(models.tbb_carritos, {
        foreignKey: 'id_carrito',
        as:'tbb_carritos'
      });     
  }
  tbc_carrito_detalle.associate = (models) =>{
  tbc_carrito_detalle.belongsTo(models.tbb_productos, {
      foreignKey: 'id_producto',
      as:'tbb_productos'
    });
  }
  return tbc_carrito_detalle;
};