module.exports = function(app) {
	//TODO The relationshos should be configured via codes as the following but it DIDN'T WORK!!!
	var Users = app.models.Users;
	var Usersthreads = app.models.Usersthreads;
	var Quests = app.models.Quests;
	var Achievements = app.models.Achievements;
	var Goals = app.models.Goals;
	var Messages = app.models.Messages;
	var Points = app.models.Points;
	var Powerups = app.models.Powerups;
	var Threads = app.models.Threads;
	var Flags = app.models.Flags;

	// Powerups.belongsTo(Quests, {foreignKey: 'questsId', as: 'quests'});
	// Quests.hasMany(Powerups, {foreignKey: 'questsId', as: 'powerups'});
	// // Users.hasMany(Quests, {foreignKey: 'userId', as: 'quests'});
	// // Quests.belongsTo(Users, {foreignKey: 'userId', as: 'users'});
	// Users.hasAndBelongsToMany(Quests);
	// Quests.hasAndBelongsToMany(Users);

	Users.nestRemoting('quests');
	Quests.nestRemoting('powerups');

	if(process.env.inmemory === 'true') {
		var db = app.dataSources.db;
		Users.attachTo(db);
		Usersthreads.attachTo(db);
		Quests.attachTo(db);
		Achievements.attachTo(db);
		Goals.attachTo(db);
		Messages.attachTo(db);
		Points.attachTo(db);
		Powerups.attachTo(db);
		Threads.attachTo(db);
		Flags.attachTo(db);

		console.log('In-memory persistence only!');
	}

};
