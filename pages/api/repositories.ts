import type { NextApiRequest, NextApiResponse } from "next";
import getUserRepositories from "../../lib/github/getUserRepositories";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = request.query;

  if (!username || Array.isArray(username)) {
    return res.status(400).json({ error: "Invalid or missing username" });
  }

  try {
    const repositories = await getUserRepositories(username);
    res.status(200).json(repositories);
  } catch (error) {
    res.status(500).json({
      error: `Error fetching repositories: ${(error as Error).message}`,
    });
  }
}
