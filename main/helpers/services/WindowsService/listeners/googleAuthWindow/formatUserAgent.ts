import { app } from "electron";

/**
 * Format `userAgent` to bypass Google Auth protection _("This browser or app may not be secure.")_
 *
 * @param userAgent string
 * @returns string
 * @function
 */
export default (userAgent: string) =>
  userAgent
    .replace(new RegExp(`${app.getName()}\/[0-9\.-]*\\s?`), "")
    .replace(/Electron\/[0-9\.-]*\s?/, "")
    .replace(/Chrome\/[0-9\.-]*\s?/, "");
