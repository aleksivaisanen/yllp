import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database";
import Analytics from "models/analytics";
import Url from "models/url";
import { yyyymmddValidator as validate } from "utils/functions";

export type AnalyticsResponse = {
  originalUrl: string;
  analytics: {
    _id: {
      date: string;
      slug: string;
    };
    visits: number;
  }[];
};
/**
 * Function for fetching Analytics data from database
 * @param param object containing slug, startDate and endDate
 * @returns Array of Analytics data
 */
export const getAnalyticsData = async ({
  slug,
  startDate,
  endDate,
}: {
  slug: string;
  startDate?: string;
  endDate?: string;
}) => {
  await connectToDatabase();

  const url = await Url.findOne({ slug });

  const today = new Date().toISOString().split("T")[0];

  // Aggregate visit analytics to return visits per day
  const aggregatedAnalytics = await Analytics.aggregate([
    {
      $project: {
        formattedVisitDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$visitDate" },
        },
        slug: {
          $toString: "$slug",
        },
      },
    },
    {
      $match: {
        $and: [
          {
            formattedVisitDate: {
              $gte: startDate ?? "2022-01-02",
              $lte: endDate ?? today,
            },
          },
          { slug: slug },
        ],
      },
    },
    {
      $group: {
        _id: {
          slug: "$slug",
          date: "$formattedVisitDate",
        },
        visits: { $sum: 1 },
      },
    },
  ]);

  return { url, aggregatedAnalytics };
};

/**
 * GET route for analytics
 * @param req
 * @param res
 * @returns Analytics document from database
 */
const getAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse | Message>
) => {
  const { slug, startDate, endDate } = req?.query || {};

  if (!slug) {
    res.status(400).send({ message: "slug missing from request query!" });
    return;
  }

  if (!validate(startDate as string) || !validate(endDate as string)) {
    res
      .status(400)
      .send({ message: "Invalid startDate or endDate in request query!" });
    return;
  }

  const { url, aggregatedAnalytics } = await getAnalyticsData({
    slug: slug as string,
    startDate: startDate as string,
    endDate: endDate as string,
  });

  if (!url) {
    res.status(404).send({ message: "URL not found!" });
    return;
  }

  const response: AnalyticsResponse = {
    originalUrl: url.originalUrl,
    analytics: aggregatedAnalytics,
  };

  res.status(200).json(response);
  return;
};

/**
 * DELETE route for analytics
 * @param req
 * @param res
 * @returns object with message about successful/failed deletion
 */
const deleteAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse<Message>
) => {
  const { slug } = req?.query || {};

  if (!slug) {
    res.status(400).send({ message: "slug missing from request query!" });
    return;
  }

  await connectToDatabase();

  await Url.deleteOne({ slug });
  await Analytics.deleteMany({ slug });

  res.status(200).json({ message: "Success" });
  return;
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse | Message>
) => {
  try {
    if (req.method === "GET") {
      await getAnalytics(req, res);
      return;
    }

    if (req.method === "DELETE") {
      await deleteAnalytics(req, res);
      return;
    }

    res.status(405).send({ message: "Only GET or DELETE requests allowed!" });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error, please try again" });
  }
};

export default handler;
