import { ouauth2Client } from "./oauth";
import { scopes } from "./scopes";

export const authorizationUrl = ouauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
});