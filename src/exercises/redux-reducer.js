import {createStore} from 'redux';

const incrementCountBy = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy,
});

const decrementCountBy = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy,
});

const setCountBy = ({ count }) => ({
    type: 'SET',
    count,
});

const reset = () => ({
    type: 'SET',
    count: 0,
});
const countReducer = (state = {count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
                // count: state.count - 1
            };
        case 'RESET':
            return {
                count: action.count
            };
        case 'SET': {
            return {
                count: action.count,
            }
        }
        default:
            return state;
    }
};

const store = createStore(countReducer);

store.dispatch(incrementCountBy());

store.dispatch(incrementCountBy({incrementBy: 5}));

store.dispatch(incrementCountBy());
store.dispatch(decrementCountBy());

store.dispatch(reset());

store.dispatch(decrementCountBy({decrementBy: 5}));

store.dispatch(setCountBy({count: 100}));
