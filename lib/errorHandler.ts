import type { NextApiRequest, NextApiResponse } from "next"
import logger from "./logger"

export function errorHandler(err: Error, req: NextApiRequest, res: NextApiResponse) {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
  })

  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Er is een interne serverfout opgetreden." })
  } else {
    res.status(500).json({ error: err.message, stack: err.stack })
  }
}

