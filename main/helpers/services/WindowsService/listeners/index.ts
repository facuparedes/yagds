import common from "./common";
import settings from "./common/settings";
import mainWindow from "./mainWindow";
import googleAuthWindow from "./googleAuthWindow";

/**
 * Object that contains listeners to load for common window and for each window
 *
 * @constant
 */
const load = { settings, common, mainWindow, googleAuthWindow };
export default load;
