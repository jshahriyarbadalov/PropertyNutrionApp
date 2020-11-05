import { dataRecipe } from '../../Translate/RecipeTranslate';
import { STAR_COUNT } from '../action/rates';


const dtRecipes = dataRecipe();
const initialState = {
    meals: dtRecipes,
    rateMeals: [],
}

const rateReducers = (state = initialState, action) => {
    switch (action.type) {
        case STAR_COUNT:
            const existingIndex = state.rateMeals.findIndex(meal => meal.number === action.foodId);
            if (existingIndex >= 0) {
                const updatedRateMeals = [...state.rateMeals];
                updatedRateMeals.splice(existingIndex, 1);
                return { ...state, rateMeals: updatedRateMeals };
            } else {
                const meal = state.meals.find(meal => meal.number === action.foodId);
                return { ...state, rateMeals: state.rateMeals.concat(meal) };
            }
        default:
            return state;
    }
}
export default rateReducers;