export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_COOKED = 'ADD_COOKED';
export const ADD_CART = 'ADD_CART';

export const toggleFavorite = (number) => {
    return {
        type: TOGGLE_FAVORITE,
        foodId: number
    };
};

export const addCooked = (number) => {
    return {
        type: ADD_COOKED,
        foodId: number
    };
};

export const addCart = (number) => {
    return {
        type: ADD_CART,
        foodId: number
    };
};
