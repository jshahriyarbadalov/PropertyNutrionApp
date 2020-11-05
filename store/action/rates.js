export const STAR_COUNT = 'STAR_COUNT';

export const starCount = (number) => {
    return {
        type: STAR_COUNT,
        foodId: number
    };
};
