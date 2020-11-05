import { dataRecipe } from '../../Translate/RecipeTranslate';
import { ADD_COOKED } from '../action/recipes';


const dtRecipes = dataRecipe();
const initialState = {
    meals: dtRecipes,
    cookedMeals: [],
};

const cookedrecipeReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COOKED:
            const existingIndex = state.cookedMeals.findIndex(meal => meal.number === action.foodId);
            if (existingIndex >= 0) {
                const updatedCookMeals = [...state.cookedMeals];
                updatedCookMeals.splice(existingIndex, 1);
                return { ...state, cookedMeals: updatedCookMeals };
            } else {
                const meal = state.meals.find(meal => meal.number === action.foodId);
                return { ...state, cookedMeals: state.cookedMeals.concat(meal) };
            }
        default:
            return state;
    }

}

export default cookedrecipeReducers;