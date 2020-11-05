import Recipe from '../models/Recipe';
import Calorie from '../models/Calorie';


export const dataRecipe = () => {

    let loadedRecipes = []
    try {
        let recipeen = require('./recipeen.json');
        let resData = JSON.parse(JSON.stringify(recipeen));
        for (let key in resData.Recipes) {
            loadedRecipes.push(
                new Recipe(
                    resData.Recipes[key].number,
                    resData.Recipes[key].category,
                    resData.Recipes[key].meal,
                    resData.Recipes[key].title,
                    resData.Recipes[key].ingredients,
                    resData.Recipes[key].direction
                )
            );
        }

    } catch (err) {
        throw err;
    }
    return loadedRecipes;
};
export const dataRecipeRu = () => {

    let loadedRecipesRu = []
    try {
        let reciperu = require('./reciperu.json');
        let resData = JSON.parse(JSON.stringify(reciperu));
        for (let key in resData.Recipes) {
            loadedRecipesRu.push(
                new Recipe(
                    resData.Recipes[key].number,
                    resData.Recipes[key].category,
                    resData.Recipes[key].meal,
                    resData.Recipes[key].kcal,
                    resData.Recipes[key].title,
                    resData.Recipes[key].ingredients,
                    resData.Recipes[key].direction
                )
            );
        }

    } catch (err) {
        throw err;
    }
    return loadedRecipesRu;
};


export const dataCalorie = () => {
    let loadedCalories = []
    try {
        //let kcaltaben = require('./kcaltaben.json');
        let resData = JSON.parse(JSON.stringify(kcaltaben));
        for (let key in resData.KcalTab) {
            loadedCalories.push(
                new Calorie(
                    resData.KcalTab[key].name,
                    resData.KcalTab[key].protein,
                    resData.KcalTab[key].fat,
                    resData.KcalTab[key].carbo,
                    resData.KcalTab[key].kcal
                )
            );
        }

    } catch (err) {
        throw err;
    }

    return loadedCalories;
};

export const dataCalorieRu = () => {
    let loadedCaloriesRu = []
    try {
        let kcaltaben = require('./kcaltabru.json');
        let resData = JSON.parse(JSON.stringify(kcaltaben));
        for (let key in resData.KcalTab) {
            loadedCaloriesRu.push(
                new Calorie(
                    resData.KcalTab[key].name,
                    resData.KcalTab[key].protein,
                    resData.KcalTab[key].fat,
                    resData.KcalTab[key].carbo,
                    resData.KcalTab[key].kcal
                )
            );
        }

    } catch (err) {
        throw err;
    }
    return loadedCaloriesRu;
};


