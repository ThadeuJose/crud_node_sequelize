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

// TODO: Tirar no final
function disconnect(db) {
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Closed database');
	});
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

exports.deleteQuote = function(id) {
	let db = connect();
	const delete_query = 'DELETE FROM quote WHERE id=?';
	db.run(delete_query, id, function(err) {
	  if (err) {
	    return console.log(err.message);
	  }
	  console.log(`Row(s) deleted ${this.changes}`);
 });
 disconnect(db);
};

exports.updateQuote = async function(id,newquote) {
  await Quote.update(newquote, {
    where: {
      id: id
    }
  });
};
