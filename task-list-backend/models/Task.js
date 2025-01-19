const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); 

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});


Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;