fx_version "cerulean"
game { "gta5" }

author 'snakewiz'
description 'A flexible player customization script for FiveM.'
repository 'https://github.com/pedr0fontoura/fivem-appearance'
version '1.2.2'

lua54 'yes'

shared_scripts {
    '@ox_lib/init.lua',
    'locales/locales.lua',
    'locales/en.lua',
    'locales/ar.lua',
    'locales/bg.lua',
    'locales/cs.lua',
    'locales/de.lua',
    'locales/es-ES.lua',
    'locales/fr.lua',
    'locales/hu.lua',
    'locales/id.lua',
    'locales/it.lua',
    'locales/nl.lua',
    'locales/pt-BR.lua',
    'locales/ro-RO.lua',
    'locales/zh-CN.lua',
    'locales/zh-TW.lua',
    'shared/config.lua',
    'shared/framework/framework.lua',
    'shared/framework/**/util.lua',
    'shared/peds.lua',
    'shared/tattoos.lua',
    'shared/blacklist.lua',
    'shared/theme.lua'
}

client_scripts {
    -- Game scripts must load first (defines 'client' global table)
    'game/constants.lua',
    'game/util.lua',
    'game/customization.lua',
    'game/nui.lua',
    -- Framework scripts
    'client/framework/framework.lua',
    'client/framework/**/main.lua',
    'client/framework/**/compatibility.lua',
    'client/framework/**/migrate.lua',
    -- Client scripts
    'client/common.lua',
    'client/defaults.lua',
    'client/client.lua',
    'client/blips.lua',
    'client/zones.lua',
    'client/outfits.lua',
    'client/props.lua',
    'client/stats.lua',
    'client/target/target.lua',
    'client/target/*.lua',
    'client/radial/radial.lua',
    'client/radial/*.lua',
    'client/management/management.lua',
    'client/management/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/database/database.lua',
    'server/database/*.lua',
    'server/framework/**/main.lua',
    'server/framework/**/callbacks.lua',
    'server/framework/**/management.lua',
    'server/framework/**/migrate.lua',
    'server/util.lua',
    'server/permissions.lua',
    'server/server.lua'
}

files {
    'web/dist/index.html',
    'web/dist/assets/*.js',
    'web/dist/assets/*.css'
}

ui_page 'web/dist/index.html'
