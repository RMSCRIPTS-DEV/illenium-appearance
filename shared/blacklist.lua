--[[
    Blacklist format - add entries to restrict clothes, hair, and props.
    Each entry can have:
      drawables = {1, 2, 3}     -- IDs to blacklist for everyone
      textures = {0, 1}        -- (optional) specific texture IDs when drawable matches current
      jobs = {"police"}        -- (optional) only blacklist for players WITHOUT this job
      gangs = {"ballas"}       -- (optional) only blacklist for players WITHOUT this gang
      aces = {"admin"}         -- (optional) only blacklist for players WITHOUT these ACEs
      citizenids = {"ABC123"}  -- (optional) only blacklist for players without these IDs

    Example:
        masks = {
            { drawables = {10, 11, 12} },
            { drawables = {14}, textures = {5, 7} },
            { drawables = {25, 30}, jobs = {"police"} }
        }
]]
Config.Blacklist = {
    male = {
        hair = {},
        components = {
            masks = {},
            upperBody = {},
            lowerBody = {},
            bags = {},
            shoes = {},
            scarfAndChains = {},
            shirts = {},
            bodyArmor = {},
            decals = {},
            jackets = {}
        },
        props = {
            hats = {},
            glasses = {},
            ear = {},
            watches = {},
            bracelets = {}
        }
    },
    female = {
        hair = {},
        components = {
            masks = {},
            upperBody = {},
            lowerBody = {},
            bags = {},
            shoes = {},
            scarfAndChains = {},
            shirts = {},
            bodyArmor = {},
            decals = {},
            jackets = {}
        },
        props = {
            hats = {},
            glasses = {},
            ear = {},
            watches = {},
            bracelets = {}
        }
    }
}
