import twilio from "twilio";
import { Config } from "./config";

export default twilio(Config.TWILIO.ACCOUNT_SID, Config.TWILIO.AUTH_TOKEN);
