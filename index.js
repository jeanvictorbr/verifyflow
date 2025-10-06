// index.js
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();
const db = require('./database.js');

// Adicione as Intents necessárias para saber quando um membro entra
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// --- Carregador de Comandos ---
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commandsToDeploy = [];
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        commandsToDeploy.push(command.data.toJSON());
    }
}

// --- Carregador de Handlers ---
client.handlers = new Collection();
const handlersPath = path.join(__dirname, 'handlers');
const handlerTypes = ['buttons', 'modals', 'selects'];
handlerTypes.forEach(handlerType => {
    const handlerDir = path.join(handlersPath, handlerType);
    if (fs.existsSync(handlerDir)) {
        const handlerFiles = fs.readdirSync(handlerDir).filter(file => file.endsWith('.js'));
        for (const file of handlerFiles) {
            const handler = require(path.join(handlerDir, file));
            if (handler.customId && handler.execute) {
                client.handlers.set(handler.customId, handler.execute);
            }
        }
    }
});

// --- Evento de Bot Pronto (ClientReady) ---
client.once(Events.ClientReady, async () => {
    await db.initializeDatabase();
    
    // Registo automático de comandos
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log(`[CMD] Iniciando registo de ${commandsToDeploy.length} comando(s).`);
        if (process.env.DEV_GUILD_ID) {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.DEV_GUILD_ID),
                { body: commandsToDeploy },
            );
            console.log(`[CMD] Comandos registados com sucesso na guild de desenvolvimento.`);
        } else {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commandsToDeploy });
            console.log(`[CMD] Comandos registados globalmente com sucesso.`);
        }
    } catch (error) {
        console.error('[CMD] Erro ao registar comandos:', error);
    }

    console.log(`🚀 Bot online! Logado como ${client.user.tag}`);
});

// --- Listener de Interações ---
client.on(Events.InteractionCreate, async interaction => {
    const handler = interaction.isChatInputCommand() 
        ? client.commands.get(interaction.commandName)
        : client.handlers.get(interaction.customId);

    if (!handler) return;

    try {
        await handler.execute(interaction, client);
    } catch (error) {
        console.error(`Erro ao executar a interação ${interaction.id}:`, error);
    }
});

// --- Listener de Entrada de Membros (GuildMemberAdd) ---
client.on(Events.GuildMemberAdd, async member => {
    // A lógica das boas-vindas virá aqui
    console.log(`Novo membro entrou: ${member.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);