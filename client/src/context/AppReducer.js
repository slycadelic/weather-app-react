import useTimesCalculator from "../hooks/useTimesCalculator"

// Reducer: a functional component that specifies the application state, 
// changes it in response to actions to our context object. 
// These functions to update the state are defined below
const AppReducer = (state, action) => {
    
    
    // imported function to get strings in various formats
    // for time and date based on local and UTC time 
    // additional info like day or night and sunrise/sunset also given
    const times = useTimesCalculator(action.payload);

    // based on action type(id), return the updated state.
    // Default case is to return the state as is (if no match)
    switch(action.type) {
        
        // for get weather method, changes the state by:
        // set loading to false as weather data is now available 
        // and updated to payload from dispatch. times is also
        // set based on weather data using imported function above
        case 'GET_WEATHER':
            return {
                loading: false,
                weather: action.payload,
                times: times
            } 
        case 'GET_WEATHER_ERROR':
            return {
                error: action.payload
            }
        default: 
            return state;
    }
}

export default AppReducer;