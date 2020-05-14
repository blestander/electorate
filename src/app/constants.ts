// OAuth 2.0 constants
export const DISCORD_AUTH_URL = "https://discordapp.com/api/oauth2/authorize"
export const DISCORD_SCOPE = encodeURI("identify guilds");
export const DISCORD_CLIENT_ID = "701436517754863738";

// Backend URL constants
const CLOUD_BACKEND_PREFIX = "https://us-central1-electorate-274912.cloudfunctions.net";
const BACKEND_PREFIX = "http://localhost:8080"
export const TOKEN_OBTAIN_URL = `${BACKEND_PREFIX}/obtainToken`;
export const GET_POLL_URL = `${BACKEND_PREFIX}/getPoll`;
export const CAST_VOTE_URL = `${BACKEND_PREFIX}/castVote`;
export const FINISH_POLL_URL = `${BACKEND_PREFIX}/finishPoll`;
