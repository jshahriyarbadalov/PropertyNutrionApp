import { dataRecipe } from '../../Translate/RecipeTranslate';
import { ADD_CART } from '../action/recipes';

const dtRecipes = dataRecipe();
const initialState = {
    meals: dtRecipes,
    cartedMeals: [],
};

const cartrecipeReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART:
            const existingIndex = state.cartedMeals.findIndex(meal => meal.number === action.foodId);
            if (existingIndex >= 0) {
                const updatedCartMeals = [...state.cartedMeals];
                updatedCartMeals.splice(existingIndex, 1);
                return { ...state, cartedMeals: updatedCartMeals };
            } else {
                const meal = state.meals.find(meal => meal.number === action.foodId);
                return { ...state, cartedMeals: state.cartedMeals.concat(meal) };
            }
        default:
            return state;
    }

}

export default cartrecipeReducers;