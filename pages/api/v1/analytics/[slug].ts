import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database";
import Analytics from "models/analytics";
import Url from "models/url";
import { yyyymmddValidator as validate } from "utils/functions";

type AnalyticsResponse = {
  originalUrl: string;
  analytics: {
    _id: string;
    visits: number;
  }[];
};

export const getAnalyticsData = async ({
  slug,
  startDate,
  endDate,
}: {
  slug: string;
  startDate: string;
  endDate: string;
}) => {
  const url = await Url.findOne({ slug });

  // Aggregate visit analytics to return visits per day
  const aggregatedAnalytics = await Analytics.aggregate([
    {
      $project: {
        formattedVisitDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$visitDate" },
        },
      },
    },
    { $match: { formattedVisitDate: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: "$formattedVisitDate",
        visits: { $sum: 1 },
      },
    },
  ]);

  return { url, aggregatedAnalytics };
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse | Message>
) => {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed!" });
      return;
    }

    await connectToDatabase();

    let startDate, endDate;
    const { slug, startDate: _startDate, endDate: _endDate } = req?.query || {};

    if (!slug) {
      res.status(400).send({ message: "slug missing from request query!" });
      return;
    }

    // Hardcoded fallback values to get all results
    if (!_startDate) startDate = "2022-01-01";
    if (!_endDate) {
      const today = new Date().toISOString().split("T")[0];
      endDate = today;
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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error, please try again" });
  }
};

export default handler;
