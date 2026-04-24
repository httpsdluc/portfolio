import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel serverless function: /api/leetcode
 *
 * Fetches LeetCode stats from LeetCode's GraphQL API and returns JSON.
 * Runs on Vercel's servers (no CORS restrictions).
 *
 * Usage from the frontend:
 *   fetch('/api/leetcode?username=dianalucero')
 */

const LEETCODE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username =
    typeof req.query.username === "string" ? req.query.username : "dianalucero";

  // Cache at the edge for 10 minutes
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://leetcode.com/",
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username },
        operationName: "userProfile",
      }),
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `LeetCode returned ${response.status}` });
    }

    const data = (await response.json()) as {
      data?: {
        matchedUser?: {
          profile?: { ranking?: number };
          submitStats?: {
            acSubmissionNum?: Array<{ difficulty: string; count: number }>;
          };
        };
      };
    };

    const user = data?.data?.matchedUser;
    if (!user) {
      return res.status(404).json({ error: "LeetCode user not found" });
    }

    const submitStats = user.submitStats?.acSubmissionNum ?? [];
    const find = (d: string) =>
      submitStats.find((s) => s.difficulty === d)?.count ?? 0;

    return res.status(200).json({
      username,
      totalSolved: find("All"),
      easySolved: find("Easy"),
      mediumSolved: find("Medium"),
      hardSolved: find("Hard"),
      ranking: user.profile?.ranking ?? 0,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch from LeetCode",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}