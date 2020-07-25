const { DataTypes } = require('sequelize');

module.exports = function( sequelize ) {

    /** Create the schema */
    return sequelize.define('Quote',
        {
          // Model attributes are defined here
          quote: {
            type: DataTypes.STRING,
            allowNull: false
          },
          author: DataTypes.STRING,
          place:  DataTypes.STRING
        }
    );
};
