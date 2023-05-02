import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const auth = getAuth(req);

  res.status(200).json({
    message: `Hello ${auth.userId || "world"}`,
  });
}
