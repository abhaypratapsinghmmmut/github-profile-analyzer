import pool from "../config/db.js";

import { fetchGithubData }
from "../services/githubService.js";

import calculateInsights
from "../utils/calculateInsights.js";

export const analyzeProfile = async (
    req,
    res
) => {

    try {

        const { username } = req.params;

        const { user, repos } =
            await fetchGithubData(username);

        const insights =
            calculateInsights(user, repos);

        await pool.query(
            `
            INSERT INTO github_profiles (
                username,
                name,
                bio,
                public_repos,
                followers,
                following,
                total_stars,
                engagement_score,
                top_languages,
                most_popular_repo,
                most_popular_repo_stars,
                account_age_days,
                profile_url,
                avatar_url
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                bio = VALUES(bio),
                public_repos = VALUES(public_repos),
                followers = VALUES(followers),
                following = VALUES(following),
                total_stars = VALUES(total_stars),
                engagement_score = VALUES(engagement_score),
                top_languages = VALUES(top_languages),
                most_popular_repo = VALUES(most_popular_repo),
                most_popular_repo_stars = VALUES(most_popular_repo_stars),
                account_age_days = VALUES(account_age_days)
            `,
            [
                insights.username,
                insights.name,
                insights.bio,
                insights.public_repos,
                insights.followers,
                insights.following,
                insights.total_stars,
                insights.engagement_score,
                insights.top_languages,
                insights.most_popular_repo,
                insights.most_popular_repo_stars,
                insights.account_age_days,
                insights.profile_url,
                insights.avatar_url
            ]
        );

        res.status(200).json({
            message:
                "Profile analyzed successfully",
            data: insights
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllProfiles = async (
    req,
    res
) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM github_profiles"
        );

        res.status(200).json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

export const getSingleProfile = async (
    req,
    res
) => {

    try {

        const { username } = req.params;

        const [rows] = await pool.query(
            `
            SELECT * FROM github_profiles
            WHERE username = ?
            `,
            [username]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};