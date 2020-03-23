import * as actionTypes from '../actions/actionTypes';

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    burgerWasBuilt: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.9
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientName] === 0)
                return state;

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                burgerWasBuilt: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                error: true
            };
        case actionTypes.KEEP_BUILT_BURGER:
            return {
                ...state,
                burgerWasBuilt: true
            };
        default:
            return state;
    }
};

export default reducer;
