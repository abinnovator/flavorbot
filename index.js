const {token} = require('./config.json');
const {Client,Events, GatewayIntentBits,SlashCommandBuilder} = require("discord.js");


const BASE_URL = "https://flavortown.hackclub.com/api/v1";
const API_KEY = process.env.API_KEY;

async function api(method, path, body = null, api) {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${api?api:API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  if (body) {
    options.body = new URLSearchParams(body).toString();
  }
  const res = await fetch(`${BASE_URL}${path}`, options);
  return res.json();
}


const client = new Client({intents: []})

    client.once(Events.ClientReady, c=>{
        console.log(`Logged in as ${c.user.username}:`)

        const getProject = new SlashCommandBuilder()
        .setName('get-project')  // must be lowercase
        .setDescription('Get a Flavortown project by ID')
        .addStringOption((option) => option.setName('projectid').setDescription('Add the project id').setRequired(true));

    const createProject = new SlashCommandBuilder()
    .setName('create-project')  // must be lowercase
    .setDescription('Create a Flavortown project.')
    .addStringOption((option) => option.setName('project-title').setDescription('Add the project title').setRequired(true))
    .addStringOption((option) => option.setName('ftapi').setDescription('Give your ft api').setRequired(true))
    .addStringOption((option) => option.setName('project-description').setDescription('Add the project description'))
    .addStringOption((option) => option.setName('repo-url').setDescription('Add the github repos url'))
    .addStringOption((option) => option.setName('demo-url').setDescription('Add the demo videos or websites url'))
    .addStringOption((option) => option.setName('ai-decl').setDescription('Tell what you used ai for in this project.'))
    
    const getUser = new SlashCommandBuilder()
    .setName('get-user')  // must be lowercase
    .setDescription('Get a ft user.')
    .addStringOption((option) => option.setName('user-id').setDescription('the id of the user').setRequired(true))
    client.application.commands.create(getProject)
    client.application.commands.create(createProject)
    client.application.commands.create(getUser)

});
async function getProject(id) {
  return api("GET", `/projects/${id}`);
}

async function createProjectApi({ title, description, repo_url, demo_url, ai_declaration, userApiKey }) {
  return api("POST", "/projects", { title, description, repo_url, demo_url, ai_declaration }, userApiKey);
}
async function getUserApi(id) {
  return api("GET", `/users/${id}`);
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "get-project") {
        const projectId = interaction.options.getString('projectid');
        await interaction.deferReply();
        const project = await getProject(projectId);
        await interaction.editReply(`Project: ${project.title}\n${project.description}`);
    }

    if (interaction.commandName === "create-project") {
        const title = interaction.options.getString('project-title');
        const userApiKey = interaction.options.getString('ftapi');
        const description = interaction.options.getString('project-description');
        const repo_url = interaction.options.getString('repo-url');
        const demo_url = interaction.options.getString('demo-url');
        const ai_declaration = interaction.options.getString('ai-decl');

        await interaction.deferReply();

        const project = await createProjectApi({ title, description, repo_url, demo_url, ai_declaration, userApiKey });

        if (project.error) {
            await interaction.editReply(`❌ Failed to create project: ${project.error}`);
            return;
        }
        console.log(project)
        await interaction.editReply(`✅ Project created!\n**${project.title}**\n${project.description ?? ''}`);
    }
    if (interaction.commandName === "get-user"){
    const user_id = interaction.options.getString("user-id")
    await interaction.deferReply()
    const user = await getUserApi(user_id)  // pass directly, not as object
    
    if (user.error) {
        await interaction.editReply(`❌ User not found: ${user.error}`);
        return;
    }
    console.log(user)

    await interaction.editReply(`**${user.display_name}**\nCookies: ${user.cookies ?? 'hidden'}\nProjects: ${user.project_ids?.length ?? 0}\nSlack_id:${user.slack_id}`);
}
})



client.login(token)