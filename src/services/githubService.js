import axios from "axios";

export const fetchGithubData = async (username) => {

    const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
    );

    const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    return {
        user: userResponse.data,
        repos: reposResponse.data
    };
};