import {createStore} from 'redux';

const store = createStore((state = {count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            const incrementBy = action.incrementBy ? action.incrementBy : 1;
            return {
                count: state.count + incrementBy
                // count: state.count + 1
            };
        case 'DECREMENT':
            const decrementBy = action.decrementBy ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
                // count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET': {
            return {
                count: action.count,
            }
        }
        default:
            return state;
    }
});

const unsubscribe  = store.subscribe(() => {
    console.log('Count value is:', store.getState());
})
// console.log('Count value is1:', store.getState());

store.dispatch({
    type: 'INCREMENT',
});

// unsubscribe();
// console.log('Count value is2:', store.getState());

store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5,
});

store.dispatch({
    type: 'INCREMENT',
});
store.dispatch({
    type: 'DECREMENT',
});

store.dispatch({
    type: 'RESET',
});

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10,
});

store.dispatch({
    type: 'SET',
    count: 100,
});

// console.log('Count value is3:', store.getState());