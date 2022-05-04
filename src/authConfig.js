// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "ca2af263-a0fa-4992-bf7e-aa1267cf755a",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:8000/",
        postLogoutRedirectUri: "http://localhost:8000/"
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};