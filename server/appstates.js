// var loopback = require('../server/server.js');

var app = module.exports = {

    check: function(loopback, models, model, next) {
        // console.log(models);
        var Powerups = models.Powerups;
        var Quests = models.Quests;
        var Economy = models.Economy;
        var Goals = models.Goals;
        console.log('Economy -------------------->');
        console.log(Economy);
        console.log('Powerups -------------------->');
        console.log(Powerups);
        console.log('loopback.models.Powerups -------------------->');
        console.log(loopback.models.Powerups);
        console.log('model -------------------->');
        console.log(model);

        if(typeof Economy === 'undefined') {
            next();
            throw "Economy can not be empty or NULL!";
        }
        // Economy.findOne({where: {"owner": model.id}}, function (err, data) {
            // var state = evaluate(data);
            var state = evaluate(Economy);
            next(state);
        // });

        function evaluate(data) {
            var state = data; //this needs to be from the economy!!!
            console.log(model);
            if(model instanceof loopback.models.Powerups) {
                if(model.name === 'Stock the Fridge') {
                    if(model.completed) state.completedCount++; //logic #1
                    state.points = model.weight * 1 + state.points;     //logic #2
                    if(state.completedCount === state.totalCount) state.progress = true; //advance to the next quest!
                } else
                if(model.name === 'Walk it Off') {
                    if(model.completed) state.completedCount++; //logic #1
                    state.points = model.weight * 1 + state.points;     //logic #2
                    if(state.completedCount === state.totalCount) state.progress = true; //advance to the next quest!
                } else
                if(model.name === 'Tell a Friend') {
                    if(model.completed) state.completedCount++; //logic #1
                    state.points = model.weight * 2 + state.points;     //logic #2
                    if(state.completedCount === state.totalCount) state.progress = true; //advance to the next quest!
                }
            } else
            if(model instanceof loopback.models.Quests) {
                var threshold = 1;  //just happened to be the total quests - 1
                if(model.name === 'Get it Started') {
                    if(model.completed) state.completedCount++; //logic #1
                    state.points = model.weight * 1 + state.points;     //logic #2
                    if(state.completedCount === state.totalCount) {
                        state.award = 'rockie';
                        state.awardCount++;
                    }
                    if(state.awardCount > threshold) {
                        state.progress = true; //advance to the goal
                    }
                } else
                if(model.name === 'Walkie Talkie') {
                    if(model.completed) state.completedCount++; //logic #1
                    state.points = model.weight * 1 + state.points;     //logic #2
                    if(state.completedCount === state.totalCount) {
                        state.award = 'senior';
                        state.awardCount++;
                    }
                    if(state.awardCount > threshold) {
                        state.progress = true; //advance to the goal
                    }
                }
            } else
            if(model instanceof loopback.models.Goals) {
                var threshold = 1;  //only a single goal for now
                if(model.name === 'Yeah!') {
                    //reset the states and start all over
                    state = {};
                }
            }

            return state;
        }
    }

};
