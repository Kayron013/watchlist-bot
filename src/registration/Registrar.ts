import { CommandRequest } from './CommandRequest';
import fetch from 'node-fetch';

export class Registrar {
  private readonly API_ENDPOINT = 'https://discord.com/api/v8';
  private readonly GLOBAL_URL;
  private readonly GUILD_URL;
  private readonly CLIENT_SECRET;
  private readonly CLIENT_ID;

  constructor({ APPLICATION_ID, GUILD_ID, CLIENT_SECRET, CLIENT_ID }: ConstructorProps) {
    this.GLOBAL_URL = `${this.API_ENDPOINT}/applications/${APPLICATION_ID}/commands`;
    this.GUILD_URL = `${this.API_ENDPOINT}/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;
    this.CLIENT_SECRET = CLIENT_SECRET;
    this.CLIENT_ID = CLIENT_ID;
  }

  private async getToken() {
    const tokenURL = `${this.API_ENDPOINT}/oauth2/token`;
    const body = `grant_type=client_credentials&scope=applications.commands.update`;

    const auth = Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64');

    const res = await fetch(tokenURL, {
      headers: {
        authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      method: 'POST',
      body,
    });

    const data = await res.json();
    return data.access_token as string;
  }

  async registerCommand(cmd: CommandRequest, guildOnly = false) {
    const url = guildOnly ? this.GUILD_URL : this.GLOBAL_URL;

    const token = await this.getToken();

    return fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(cmd),
    });
  }

  async deleteCommand(cmdID: string | number, guildOnly = false) {
    const url = `${guildOnly ? this.GUILD_URL : this.GLOBAL_URL}/cmdID`;

    const token = await this.getToken();

    return fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      method: 'DELETE',
    });
  }
}

interface ConstructorProps {
  APPLICATION_ID: string;
  GUILD_ID: string;
  CLIENT_SECRET: string;
  CLIENT_ID: string;
}
