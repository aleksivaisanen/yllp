// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database";

type Data = {
  name: string;
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await connectToDatabase();
  res.status(200).json({ name: "John Doe" });
};

export default handler;
