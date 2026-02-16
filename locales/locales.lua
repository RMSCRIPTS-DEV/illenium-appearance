Locales = {}

function _L(key)
    local lang = GetConvar("illenium-appearance:locale", "en")
    if not Locales[lang] then
        lang = "en"
    end
    local value = Locales[lang]
    if not value then
        print("Locale not loaded: " .. lang)
        return key
    end
    for k in key:gmatch("[^.]+") do
        if type(value) ~= "table" then
            print("Missing locale for: " .. key)
            return key
        end
        value = value[k]
        if value == nil then
            print("Missing locale for: " .. key)
            return key
        end
    end
    return value
end
