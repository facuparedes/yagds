import { google } from "googleapis";
import { WindowsService } from "..";
import config from "../../config";

const scopes = ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive"];

const consoleError = (error: string) => console.error("Error:", error);

export const oAuth2Client = new google.auth.OAuth2({ clientId: config.SERVER.OAUTH_CLIENTID, redirectUri: "http://localhost:8080/authorize" });

oAuth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token)
    WindowsService._windows.MAIN_WINDOW.webContents.session.cookies.set({
      url: "http://localhost:8080",
      name: "token",
      value: tokens.refresh_token,
      expirationDate: Number.MAX_SAFE_INTEGER,
      httpOnly: true,
    });

  oAuth2Client.setCredentials(tokens);
});

/**
 * Manage Authentication
 *
 * @class
 */
export default class AuthService {
  /**
   * Get authentication url to login and give permissions to the app.
   *
   * @returns string
   * @static
   */
  static authUrl = oAuth2Client.generateAuthUrl({ scope: scopes });

  /**
   * Get the access token with authorization `code` given.
   *
   * @static
   */
  static getAccessToken = (code: string) => oAuth2Client.getToken(code).catch(consoleError);

  /**
   * Get refresh token from cookies if it is stored.
   *
   * @returns Electron.Cookies
   * @static
   */
  static getStoredRefreshToken = async () =>
    await WindowsService._windows.MAIN_WINDOW.webContents.session.cookies
      .get({ name: "token" })
      .then((token) => token[0])
      .catch(consoleError);

  /**
   * Check if it has already been logged.
   * Also validate stored refresh token
   *
   * @returns boolean
   * @static
   */
  static async isLoggedIn() {
    return await this.getStoredRefreshToken()
      .then(async (storedRefreshToken) => {
        if (storedRefreshToken) {
          oAuth2Client.setCredentials({ refresh_token: storedRefreshToken.value });

          return await oAuth2Client
            .getRequestHeaders()
            .then(() => true)
            .catch(() => false);
        }
        return false;
      })
      .catch(consoleError);
  }
}
