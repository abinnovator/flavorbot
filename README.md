# 🍗 Flavorbot

A Discord bot for interacting with the [Flavortown](https://flavortown.hackclub.com) API — Hack Club's project shipping platform.

## Commands

| Command | Description |
|---|---|
| `/get-project <projectid>` | Fetch a Flavortown project by its ID |
| `/create-project <project-title> <ftapi> [options]` | Create a new Flavortown project |
| `/get-user <user-id>` | Look up a Flavortown user by their ID |

### `/create-project` Options

| Option | Required | Description |
|---|---|---|
| `project-title` | ✅ | The title of your project |
| `ftapi` | ✅ | Your Flavortown API key |
| `project-description` | ❌ | A short description of your project |
| `repo-url` | ❌ | Link to your GitHub repository |
| `demo-url` | ❌ | Link to a live demo or video |
| `ai-decl` | ❌ | Declaration of AI tools used |

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A Discord bot token
- A Flavortown API key (find it in your [account settings](https://flavortown.hackclub.com))

### Installation

```bash
git clone https://github.com/abinnovator/flavorbot
cd flavorbot
npm install
```

### Configuration

Create a `config.json` file in the root directory:

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN"
}
```

### Running

```bash
node index.js
```

## Env format
API-KEY=Your flavortown api key


## Getting Your Flavortown API Key

1. Go to [flavortown.hackclub.com](https://flavortown.hackclub.com)
2. Open your account settings
3. Copy your API key

> ⚠️ Keep your API key private — don't share it or commit it to git.

## Tech Stack

- [discord.js](https://discord.js.org/) — Discord API wrapper
- [Flavortown API](https://flavortown.hackclub.com/api/v1/docs) — Hack Club's project platform