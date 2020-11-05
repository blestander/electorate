import { environment } from './../environments/environment';

// OAuth 2.0 constants
export const DISCORD_AUTH_URL = "https://discordapp.com/api/oauth2/authorize"
export const DISCORD_SCOPE = encodeURI("identify guilds");
export const DISCORD_CLIENT_ID = "701436517754863738";

// Backend URL constants
const BACKEND_PREFIX = "/api";
export const TOKEN_OBTAIN_URL = `${BACKEND_PREFIX}/login`;
export const GET_POLL_URL = `${BACKEND_PREFIX}/poll`;
export const CAST_VOTE_URL = `${BACKEND_PREFIX}/poll/{id}/vote`;
export const FINISH_POLL_URL = `${BACKEND_PREFIX}/poll/{id}/finish`;
export const CREATE_POLL_URL = `${BACKEND_PREFIX}/poll/create`;
export const LIST_POLLS_URL = `${BACKEND_PREFIX}/polls`;
export const DELETE_POLL_URL = `${BACKEND_PREFIX}/poll`;
export const LOGOUT_URL = `${BACKEND_PREFIX}/logout`;
export const GET_HISTORY_URL = `${BACKEND_PREFIX}/history`;
export const CHECK_LOGIN_URL = `${BACKEND_PREFIX}/check`;
export const GET_VOTERS_URL = `${BACKEND_PREFIX}/poll/{id}/voters`;
export const GET_GUILDS_URL = `${BACKEND_PREFIX}/guilds`;
export const WEBHOOK_URL = `${BACKEND_PREFIX}/poll/{id}/webhook`;

// Important regex
export const webhookRegex = /https:\/\/discordapp\.com\/api\/webhooks\/([0-9]*)\/([A-Za-z0-9\-_]*)/;
