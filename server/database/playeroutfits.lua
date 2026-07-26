Database.PlayerOutfits = {}

function Database.PlayerOutfits.GetAllByCitizenID(citizenid)
    return MySQL.query.await("SELECT * FROM player_outfits WHERE citizenid = ?", {citizenid})
end

function Database.PlayerOutfits.GetByID(id)
    return MySQL.single.await("SELECT * FROM player_outfits WHERE id = ?", {id})
end

function Database.PlayerOutfits.GetByOutfit(name, citizenid) -- for validate duplicate name before insert
    return MySQL.single.await("SELECT * FROM player_outfits WHERE outfitname = ? AND citizenid = ?", {name, citizenid})
end

function Database.PlayerOutfits.Add(citizenID, outfitName, model, components, props)
    local skinData = json.encode({components = components, props = props})
    return MySQL.insert.await("INSERT INTO player_outfits (citizenid, outfitname, model, components, props, skin) VALUES (?, ?, ?, ?, ?, ?)", {
        citizenID, outfitName, model, components, props, skinData
    })
end


function Database.PlayerOutfits.Update(outfitID, model, components, props)
    return MySQL.update.await("UPDATE player_outfits SET model = ?, components = ?, props = ? WHERE id = ?", {
        model,
        components,
        props,
        outfitID
    })
end

function Database.PlayerOutfits.DeleteByID(id)
    MySQL.query.await("DELETE FROM player_outfits WHERE id = ?", {id})
end


Citizen.CreateThread(function()
    local result = MySQL.query.await("DESCRIBE player_outfits")
    if result then
        local hasComponents, hasProps, outfitIdColumn = false, false, nil
        
        for i=1, #result do
            if result[i].Field == "components" then hasComponents = true end
            if result[i].Field == "props" then hasProps = true end
            if result[i].Field == "outfitId" then outfitIdColumn = result[i] end
        end
        
        -- Fehlende Spalten hinzufügen
        if not hasComponents then
            MySQL.query.await("ALTER TABLE player_outfits ADD COLUMN components LONGTEXT DEFAULT NULL")
        end
        if not hasProps then
            MySQL.query.await("ALTER TABLE player_outfits ADD COLUMN props LONGTEXT DEFAULT NULL")
        end

        -- outfitId reparieren (auf Nullable setzen)
        if outfitIdColumn and outfitIdColumn.Null == "NO" then
            MySQL.query.await("ALTER TABLE player_outfits MODIFY COLUMN outfitId varchar(50) DEFAULT NULL")
        end
    end
end)
