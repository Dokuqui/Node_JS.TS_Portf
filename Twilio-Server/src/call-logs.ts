import { Request, Response } from "express";
import twilio from "twilio";

export const getCallLogs =
  (twilioClient: twilio.Twilio) => async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const page = req.query.page ? parseInt(req.query.page as string) : 0;

      const status = req.query.status as string;
      const to = req.query.to as string;
      const from = req.query.from as string;
      const startTime = req.query.startTime as string;
      const endTime = req.query.endTime as string;

      const filter: any = { limit };
      if (status) filter.status = status;
      if (to) filter.to = to;
      if (from) filter.from = from;
      if (startTime) filter.startTime = new Date(startTime).toISOString();
      if (endTime) filter.endTime = new Date(endTime).toISOString();

      const calls = await twilioClient.calls.list(filter);

      res.json({
        success: true,
        data: calls,
        count: calls.length,
        page: page,
        limit: limit,
      });
    } catch (error) {
      console.error("Error fetching call logs:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch call logs",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
