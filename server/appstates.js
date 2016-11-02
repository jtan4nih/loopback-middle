// var loopback = require('../server/server.js');

var compareObjects = function(o1, o2) {
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
}

// //Quests
// var compareObjects1 = function(o1, o2) {
//     var c1, c2, c3;
//     c1 = o1.title;
//     c2 = o1.threshold;
//     c3 = o1.powerupsRel;
    
//     return c1&&c2&c3;
// }

// //PU
// var compareObjects2 = function(o1, o2) {
//     var c1, c2, c3;
//     c1 = o1.title;
//     c2 = o1.what;
//     c3 = o1.how;
    
//     return c1&&c2&c3;
// }

var app = module.exports = {

    check: function(loopback, models, model) {
        // console.log(models);
        var Powerups = models.Powerups;
        var Quests = models.Quests;
        var Economy = models.Economy;
        var Goals = models.Goals;
        // console.log('Economy -------------------->');
        // console.log(Economy);
        // console.log('Powerups -------------------->');
        // console.log(Powerups);
        // console.log('typeof(Powerups) -------------------->');            
        // console.log(typeof(Powerups));
        // console.log(loopback.models.Powerups);
        // console.log('model -------------------->');
        // console.log(model);

        if(typeof Economy === 'undefined') {
            // next();
            throw "Economy is empty or NULL!";
            // return;
        }
        // Economy.findOne({where: {"owner": model.id}}, function (err, data) {
            // var state = evaluate(data);
            var state = evaluate(model);
            // next(state);
            return state;
        // });

        function evaluate(data) {
            var state = data; //this needs to be from the economy!!!
            console.log(model);
            if(compareObjects(model, Powerups)) {
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
            if(compareObjects(model, Quests)) {
                var threshold = 1;  //just happend to be the total quests - 1
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
            } 
            else
            if(compareObjects(model, Economy)) {
                state = {};
            }
            // else
            // if(compareObjects(model, Goals)) {
            //     var threshold = 1;  //only a single goal for now
            //     if(model.name === 'Yeah!') {
            //         //reset the states and start all over
            //         state = {};
            //     }
            // }

            console.log('-------------------------------------> appstates.js: state begin');
            console.log(state);
            console.log('<------------------------------------- appstates.js: state end');

            return state;
        }
    }

};
