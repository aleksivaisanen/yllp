import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database";
import Url, { IUrl } from "models/url";
import Analytics from "models/analytics";

export const getUrlData = async (slug: string, redirect: string) => {
  await connectToDatabase();

  const url = await Url.findOne({ slug });

  if (redirect && url) {
    // User is using this API to get redirected, create new analytics document
    await Analytics.create({ slug, type: "redirect" });
  }

  return url;
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUrl | Message>
) => {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed!" });
      return;
    }

    const { slug, redirect } = req?.query || {};

    if (!slug) {
      res.status(400).send({ message: "slug missing from request query!" });
      return;
    }

    const url = await getUrlData(slug as string, redirect as string);

    if (!url) {
      res.status(404).send({ message: "URL not found!" });
      return;
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
