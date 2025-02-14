// COOKING
// 'xp', 'container', and 'time' are optional fields
[ // cooking recipes
    {
        ingredients: [
            'kubejs:lesser_ender_eye',
            'alexsmobs:blood_sac',
            'kubejs:hemolymph_pustules'
        ],
        result: 'minecraft:ender_eye',
        id: 'minecraft:ender_eye'
    },
    {
        ingredients: [
            'minecraft:honeycomb',
            'minecraft:honeycomb',
            'verdure:clover',
            '#forge:salad_ingredients/cabbage',
            'create:experience_nugget',
        ],
        result: 'thermal:xp_stew',
        container: 'minecraft:bowl',
        xp: 0.75,
        id: 'thermal:xp_stew'
    },
    {
        ingredients: [
            '#forge:crops/corn',
            'minecraft:sweet_berries',
            '#forge:salad_ingredients/cabbage',
            '#forge:salad_ingredients/cabbage',
            'minecraft:rabbit_foot'
        ],
        result: 'thermal:spring_salad',
        container: 'minecraft:bowl',
        id: 'thermal:spring_salad'
    },
    {
        ingredients: [
            'farmersrespite:rose_hips',
            'farmersrespite:rose_hips',
            'minecraft:carrot',
            'farmersdelight:onion',
            'minecraft:golden_apple',
            '#minecraft:flowers'
        ],
        result: 'thermal:hearty_stew',
        container: 'minecraft:bowl'
    },
    {
        ingredients: [
            'windswept:goat',
            'minecraft:potato',
            'minecraft:carrot',
            'minecraft:brown_mushroom'
        ],
        result: 'windswept:goat_stew',
        container: 'minecraft:bowl',
        id: 'windswept:goat_stew'
    },
    {
        ingredients: [
            '#desideri:brown_mushrooms',
            'minecraft:red_mushroom'
        ],
        result: 'minecraft:mushroom_stew',
        container: 'minecraft:bowl',
        id: 'farmersdelight:cooking/mushroom_stew'
    }
].forEach(recipe => {
    // because ingredients must be in json format
    let ingredientArray = []
    recipe.ingredients.forEach(item => {
        ingredientArray.push(Ingredient.of(item))
    })
    let recipeObj = {
        type: 'farmersdelight:cooking',
        ingredients: ingredientArray,
        result: Item.of(recipe.result),
        experience: 0.2,
        time: 200,
    }

    if (recipe.xp != undefined) recipeObj.experience = recipe.xp
    if (recipe.container != undefined) recipeObj.container = Item.of(recipe.container)
    if (recipe.time != undefined) recipeObj.time = recipe.time

    onEvent('recipes', event => {
        recipe.id
            ? event.custom(recipeObj).id(recipe.id)
            : event.custom(recipeObj)
    })
})


// CUTTING
// tools: axe_dig, axe_strip, and any tool tag

let cuttingRecipes = [
    /*
    {
        ingredients: ['minecraft:dirt'],
        tool: 'forge:tools/knives',
        result: ['2x minecraft:diamond'],
        id: 'kubejs:test',
    },*/
]

// for every type of wood
constructedWoodTypes.forEach(type => {
    [ // log blocks & wood block recipe
        { input: type.logBlock, output: type.logBlockStripped },
        { input: type.woodBlock, output: type.woodBlockStripped }
    ].forEach(logRecipe => {
        let result = logRecipe.output
        if (type?.bark == undefined) result = [logRecipe.output, type.woodBark]
        cuttingRecipes.push({
            ingredients: [logRecipe.input],
            tool: 'axe_strip',
            result: result
        })

        onEvent('recipes', event => {
            event.remove({ type: 'farmersdelight:cutting', output: logRecipe.output })
        })
    })
})

cuttingRecipes.forEach(recipe => {
    let output = recipe.result
    let input = recipe.ingredients
    let given_tool = recipe.tool
    let ingredientArray = []
    let resultArray = []
    let tool = {}

    if (Array.isArray(input)) {
        input.forEach(item => ingredientArray.push(Ingredient.of(item)))
    } else {
        ingredientArray = [Ingredient.of(input)]
    }

    if (Array.isArray(output)) {
        output.forEach(result => resultArray.push(Item.of(result).toResultJson()))
    } else {
        resultArray = [Item.of(output).toResultJson()]
    }

    if (given_tool == 'axe_dig' || given_tool == 'axe_strip') {
        tool.type = 'farmersdelight:tool_action',
        tool.action = given_tool
        
    } else {
        tool.tag = given_tool
    }

    let recipeObj = {
        type: 'farmersdelight:cutting',
        ingredients: ingredientArray,
        tool: tool,
        result: resultArray
    }
    if (recipe.sound != undefined) recipeObj.sound = recipe.sound
    if (given_tool == 'axe_strip') recipeObj.sound = 'minecraft:item.axe.strip'


    onEvent('recipes', (event) => {
        recipe.id
            ? event.custom(recipeObj).id(recipe.id)
            : event.custom(recipeObj)
    })
})