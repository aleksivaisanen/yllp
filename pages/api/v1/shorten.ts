import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database";
import Url, { IUrl } from "models/url";

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUrl | Message>
) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed!" });
      return;
    }

    await connectToDatabase();

    const { url } = req?.body || {};

    if (!url) {
      res.status(400).send({ message: "url missing from request body!" });
      return;
    }

    // Try 5 times to create shortened url in case of unique slug collisions
    for (let i = 0; i < 5; i++) {
      try {
        const shortenedUrl = await Url.create({ originalUrl: url });
        res.status(200).json(shortenedUrl);
        return;
      } catch (error) {
        console.error(error);
      }
    }

    throw new Error("URL could not be created.")
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .send({ message: "Internal server error, please try again" });
  }
};

export default handler;
