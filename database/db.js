let Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/production.db'
});

var Quote = require('./quote.js')(sequelize);

exports.connect = async function connect(){
	try {
	  await sequelize.authenticate();
	  console.log('Connection has been established successfully.');
	} catch (error) {
	  console.error('Unable to connect to the database:', error);
	}
}

exports.setUpTable = async function() {
	await sequelize.sync({ alter: true })
};

exports.insertQuote = async function(data) {
		let response = await Quote.create(data);
		console.log('Insert with id: ' + response.id);
		return response;
};

exports.readAllQuotes = async function() {
	let response = await Quote.findAll();
	response = response.map((e) => {
		return e.dataValues;
	})
	return response;
};

exports.readQuote = async function(id) {
  const quote = await Quote.findByPk(id);
	return quote;
};

exports.deleteQuote = async function(id) {
  await Quote.destroy({
    where: {
      id: id
    }
  });
};

exports.updateQuote = async function(id,newquote) {
  await Quote.update(newquote, {
    where: {
      id: id
    }
  });
};
