var app = module.exports = {

    check: function(app, model) {
        var Powerups = app.models.Powerups;
        var Quests = app.models.Quests;
        var Goals = app.models.Goals;
        var state = {}; //this needs to be from the economy!!!
        if(model instanceof Powerups) {
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
        if(model instanceof Quests) {
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
        if(model instanceof Goals) {
            var threshold = 1;  //only a single goal for now
            if(model.name === 'Yeah!') {
                //reset the states and start all over
                state = {};
            }
        }
    }

};
