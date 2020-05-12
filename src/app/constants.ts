// OAuth 2.0 constants
export const DISCORD_AUTH_URL = "https://discordapp.com/api/oauth2/authorize"
export const DISCORD_SCOPE = encodeURI("identify guilds");
export const DISCORD_CLIENT_ID = "701436517754863738";

// Backend URL constants
export const TOKEN_OBTAIN_URL = "https://us-central1-electorate-274912.cloudfunctions.net/obtainToken";
export const GET_POLL_URL = "https://us-central1-electorate-274912.cloudfunctions.net/getPoll";
export const CAST_VOTE_URL = "https://us-central1-electorate-274912.cloudfunctions.net/castVote";
