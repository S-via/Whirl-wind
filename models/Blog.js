const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        destination: {
            type: DatatTypes.STRING,
            allowNull: false,
        },
        trip_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            }
        },
        budget: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        lodging: {
            type: DatatTypes.STRING,
            allowNull: false,
        },
        activities: {
            type: DatatTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DatatTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
    }
);

module.exports = Blog;