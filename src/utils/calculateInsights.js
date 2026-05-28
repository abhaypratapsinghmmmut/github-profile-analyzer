const calculateInsights = (user, repos) => {

    // Total Stars
    const totalStars = repos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
    );

    // Languages
    const languageCount = {};

    repos.forEach((repo) => {
        if (repo.language) {
            languageCount[repo.language] =
                (languageCount[repo.language] || 0) + 1;
        }
    });

    const topLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Most Popular Repo
    const mostPopularRepo = repos.reduce(
        (max, repo) =>
            repo.stargazers_count >
            max.stargazers_count
                ? repo
                : max,
        repos[0]
    );

    // Account Age
    const accountAgeDays = Math.floor(
        (Date.now() -
            new Date(user.created_at)) /
        (1000 * 60 * 60 * 24)
    );

    // Engagement Score
    const engagementScore =
        (user.followers * 3) +
        totalStars +
        (user.public_repos * 2);

    return {
        username: user.login,
        name: user.name,
        bio: user.bio,

        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,

        total_stars: totalStars,
        engagement_score: engagementScore,

        top_languages: JSON.stringify(topLanguages),

        most_popular_repo:
            mostPopularRepo?.name || null,

        most_popular_repo_stars:
            mostPopularRepo?.stargazers_count || 0,

        account_age_days: accountAgeDays,

        profile_url: user.html_url,
        avatar_url: user.avatar_url
    };
};

export default calculateInsights;