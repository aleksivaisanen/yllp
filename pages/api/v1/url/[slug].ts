import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database";
import Url, { IUrl } from "models/url";
import Analytics from "models/analytics";

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUrl | Message>
) => {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed!" });
      return;
    }

    await connectToDatabase();

    const { slug, redirect } = req?.query || {};

    if (!slug) {
      res.status(400).send({ message: "slug missing from request query!" });
      return;
    }

    const url = await Url.findOne({ slug });

    if (!url) {
      res.status(404).send({ message: "URL not found!" });
      return;
    }

    if (redirect) {
      // User is using this API to get redirected, create new analytics document
      await Analytics.create({ slug, type: "redirect" });
    }

    res.status(200).json(url);
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error, please try again" });
  }
};

export default handler;
