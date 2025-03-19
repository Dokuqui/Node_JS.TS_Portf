import { Request, Response } from "express";
import { fetchDepartmentNumber } from "./departementNumber";
import twilio from "twilio";
import VoiceResponse = twilio.twiml.VoiceResponse;

export const handleIVR = (req: Request, res: Response) => {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: "/handle-selection",
    method: "POST",
  });

  gather.say("Press 1 for Sales, Press 2 for Support");

  res.type("text/xml");
  res.send(twiml.toString());
};

export const handleSelection = async (req: Request, res: Response) => {
  const digit = req.body.Digits;
  const twiml = new VoiceResponse();

  let department: "sales" | "support" | null = null;

  switch (digit) {
    case "1":
      department = "sales";
      break;
    case "2":
      department = "support";
      break;
    default:
      twiml.say("Invalid option, please try again.");
      twiml.redirect("/ivr");
      res.type("text/xml");
      res.send(twiml.toString());
      return;
  }

  const forwardNumber = department
    ? await fetchDepartmentNumber(department)
    : null;

  if (!forwardNumber) {
    twiml.say("There was an error. Please try again later.");
    res.type("text/xml");
    res.send(twiml.toString());
    return;
  }

  twiml.say("Redirecting your call.");
  twiml.dial(forwardNumber);

  res.type("text/xml");
  res.send(twiml.toString());
};
