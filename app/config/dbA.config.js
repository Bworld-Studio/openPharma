module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "metal",
	DB: "dbA",
	dialect: "mariadb",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};