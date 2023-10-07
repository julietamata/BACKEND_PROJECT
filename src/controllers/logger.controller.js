import logger from "../utils/logger.js";

export const loggerController = (req, res) => {
    try {
        logger.debug("Debug");
        logger.http("Http");
        logger.info("Info");
        logger.warning("Warning");
        logger.error("Error");
        logger.fatal("Fatal");
        res.json({ status: "success" });
      }  catch (error) {
        res.status(500).json({ status: error.message });
      }
}