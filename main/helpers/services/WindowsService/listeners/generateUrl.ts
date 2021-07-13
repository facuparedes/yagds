import config from "../../../config";

/**
 * Generate an url with an `string` according to the enviroment.
 *
 * @param htmlFilename string
 */
export default (htmlFilename: string) => (config.SERVER.ENV === "production" ? `app://./${htmlFilename}.html` : `http://localhost:${process.argv[2]}/${htmlFilename}`);
