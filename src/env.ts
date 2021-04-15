import 'dotenv/config';

export default {
  PUBLIC_KEY: process.env.PUBLIC_KEY!,
  CLIENT_SECRET: process.env.CLIENT_SECRET!,
  CLIENT_ID: process.env.CLIENT_ID!,
  APPLICATION_ID: process.env.APPLICATION_ID!,
  GUILD_ID: process.env.GUILD_ID!,
  SA_CLIENT_EMAIL: process.env.SA_CLIENT_EMAIL!,
  SA_PROJECT_ID: process.env.SA_PROJECT_ID!,
  SA_PRIVATE_KEY: process.env.SA_PRIVATE_KEY!.replace(/\\n/g, '\n'),
};
