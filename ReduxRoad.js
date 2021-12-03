// here we need to define the properties of our state object
const initialWagonState = {
    supplies: 100,
    distance: 0,
    days: 0,
    cash: 200
  }
  
// here we define a reducer which handles changes to our state
const gameReducer = (state = initialWagonState, action) => {        // we connect this reducer to the state here 
    switch (action.type) {                                          // because multiple actions are required we use swtich case to define the state object depending on the action
        case 'gather': {
            return {
                ...state,
                supplies: state.supplies + 15,
                distance: state.distance,
                days: state.days + 1
            }
        }
        case 'travel': {
            if (state.supplies <= 0){
                return {
                    ...state,
                    supplies: 0
                }
            } else {
                return {
                    ...state,
                    supplies: state.supplies - (20 * action.payload),
                    distance: state.distance + (10 * action.payload),
                    days: state.days + action.payload
                }
            }
        }
        case 'sell': {
            // here a player can give away 20 supplies to gain 5 cash
            if (state.supplies < 20) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    supplies: state.supplies - 20,
                    cash: state.cash + 5
                }
            }  
        }
        case 'buy': {
            // Players can gain 25 supplies at the cost of 15 cash
            if (state.cash >= 15) {
                return {
                    ...state,
                    supplies: state.supplies + 25,
                    cash: state.cash - 15
                }
            }
        }
        case 'theft': {
            // Outlaws steal half of the player’s cash
            return {
                ...state,
                cash: state.cash / 2
            }
        }
        case 'tippedWagon': {
            return {
                ...state,
                supplies: state.supplies - 30,
                days: state.days + 1
            }
        }
        default: {
            return state;
        }
    }
}
 
// here we apply changes to the state and print the result to the console
let wagon = gameReducer(undefined, {});
wagon = gameReducer(wagon, {type: 'travel', payload: 1});   
wagon = gameReducer(wagon, {type: 'gather'});              
wagon = gameReducer(wagon, {type: 'tippedWagon'});        
wagon = gameReducer(wagon, {type: 'travel', payload: 3});     
wagon = gameReducer(wagon, {type: 'sell'});   
wagon = gameReducer(wagon, {type: 'buy'});    
wagon = gameReducer(wagon, {type: 'theft'});  


console.log(wagon);