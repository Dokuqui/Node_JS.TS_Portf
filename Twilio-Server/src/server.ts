import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import twilio from "twilio";
import { handleIVR, handleSelection } from "./ivr";
import { getCallLogs } from "./call-logs";

dotenv.config();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.post("/", handleIVR);
app.post("/ivr", handleIVR);
app.post("/handle-selection", handleSelection);
app.get("/api/call-logs", getCallLogs(twilioClient));

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`),
);
