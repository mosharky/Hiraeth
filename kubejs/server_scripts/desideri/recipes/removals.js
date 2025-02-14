// priority: 500

// Removes inputs and outputs & hides from JEI, basically completely removing completely from the game
global.fullRemovals.push(
    'quark:rope',
    'supplementaries:rope',
    'darkerdepths:rope',
    'farmersdelight:wheat_dough',
    'biomesoplenty:spanish_moss',
    //'createaddition:electric_motor',
    'alloyed:steel_fishing_rod',
    'sprout:sweet_berry_jam',
    'sprout:pbj',
    'thermal:stuffed_pepper',
    'thermal:chocolate_cake',
    'thermal:spice_cake',
    'sprout:sweet_berry_pie',
    'sprout:apple_pie',
    'thermal:compost',
    'farmersdelight:tree_bark',
    'biomesoplenty:clover',
    'sprout:sprouts',
    'everycomp:msw/valhelsia_structures/fallen_lapidified_jungle_log',
    'immersive_weathering:biomesoplenty/maple_leaf_pile',
    'farmersdelight:milk_bottle',
    'darkerdepths:resin'
)

// fullRemovals but for regex inputs
regexFullRemovals.push(
    /supplementaries:(flax|flax_seeds|flax_block|wild_flax)/,
    /refinedstorage:(1k.*|4k.*|16k.*|64k.*|256.*|1024k.*|4096k.*)/,
    /refinedstorage:(fortune.*|silk_touch_upgrade|.*disk_manipulator|.*disk_drive)/,
    /enigmaticlegacy:(enigmatic_item|ocean_stone|magma_heart|eye_of_nebula|enigmatic_amulet|forbidden_axe|etherium.*|astral_breaker|enchantment_transposer|fabulous_scroll|void_pearl|golem_heart|angel_blessing|escape_scroll|monster_charm|mining_charm|mega_sponge|ender_rod|infinimeal|unwitnessed_amulet|ascension_amulet|soul_compass|enigmatic_elytra|architect_eye|magnet_ring|super_magnet_ring)/,
    /quark:(backpack|potato_crate|carrot_crate|beetroot_crate|chute|gravisand|abacus|dragon_scale|.*limestone.*|.*_rune|.*corundum.*)/,
    /quark:(granite|andesite|diorite|calcite|dripstone|tuff)_pillar/,
    /biomesoplenty:(.*black_sand.*|.*autumn.*|.*mud.*|.*maple.*)/,
    /(biomesoplenty|everycomp|supplementaries|snowyspirit|immersive_weathering):(.*magic.*|.*umbran.*|.*palm.*|.*cherry.*|.*origin.*|.*quark.*azalea.*)/,
    /thermal:(.*tomato.*|.*rice.*|.*corn.*|.*flax.*|.*onion.*|.*coffee.*|.*tea.*|.*amaranth.*|.*hops.*|.*barley.*|.*radish.*|.*sadiroot.*|.*spinach.*|.*bell_pepper.*|.*eggplant.*|.*green_bean.*|.*strawberry.*)/,
    /thermal:(beetroot|apple|carrot|potato)_block/,
    /thermal:.*rockwool/,
    /sprout:.*peanut.*/,
    /verdure:(.*daises|wildflowers|.*_leaves)/,
    /quark:(?!purpur|nether_brick|prismarine|blossom|iron).*_(chest|trapped_chest|bookshelf|ladder)/,
    /(autumnity|woodworks|upgrade_aquatic|windswept):.(.*leaf_pile|.*leaf_carpet)/
)

regexFullRemovals.forEach(removal => {
    let itemList = []
    itemList.push(Ingredient.of(removal).itemIds) // Ingredient.of(removal).itemIds is a list of items matching the given regex, "removal"
    itemList.forEach(nestedItemList => { // because fullRemovals cant interpret a nested list, only itemId strings
        nestedItemList.forEach(item => global.fullRemovals.push(item))
    })
})

// Removes by recipe ID
idRemovals.push(
    'supplementaries:strings',
    'farmersdelight:raw_pasta_from_eggs',
    'corn_delight:integration/create/mixing/raw_tortilla_from_mixing',
    'corn_delight:integration/create/mixing/raw_tortilla_wheat_from_mixing',
    'comforts:rope_and_nail',
    'windswept:snow_boots',
    'farmersdelight:paper_from_tree_bark',
    /(minecraft|biomesoplenty|ecologics):.*rabbit_stew.*/,
    'abnormals_delight:neapolitan/adzuki_curry',
    'quark:building/crafting/oak_bookshelf',
    'quark:building/crafting/oak_ladder'
)
// Removes by recipe type
typeRemovals.push(
)

onEvent('recipes', (event) => {
    // Removes inputs and outputs from global array fullRemoval
    global.fullRemovals.forEach((removal) => {
        event.remove({ input: removal })
        event.remove({ output: removal })
    })
    // Removes by recipe ID
    idRemovals.forEach((removal) => {
        event.remove({ id: removal })
    })
    // Removes by recipe type
    typeRemovals.forEach((removal) => {
        event.remove({ type: removal })
    })
})