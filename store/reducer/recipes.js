import { dataRecipe } from '../../Translate/RecipeTranslate';
import { TOGGLE_FAVORITE } from '../action/recipes';


const dtRecipes = dataRecipe();
const initialState = {
    meals: dtRecipes,
    favoriteMeals: [],
};

const recipesReducers = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.number === action.foodId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals };
            } else {
                const meal = state.meals.find(meal => meal.number === action.foodId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
            }
        default:
            return state;
    }

}

export default recipesReducers;