# GitHub Profile Analyzer

A backend service that analyzes GitHub profiles using the GitHub API and stores insights in a MySQL database.

## Tech Stack

* Node.js
* Express.js
* MySQL (Railway)
* GitHub API
* Axios

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/abhaypratapsinghmmmut/github-profile-analyzer.git
cd github-profile-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

```env
PORT=5000

DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database

GITHUB_TOKEN=your_github_token
```

### 4. Run Project

```bash
npm run dev
```

Server runs at:

```text
http://localhost:5000
```

## API Endpoints

### Analyze Profile

```http
POST /api/github/analyze/:username
```

### Get All Profiles

```http
GET /api/github/profiles
```

### Get Single Profile

```http
GET /api/github/profiles/:username
```

## Insights Stored

* Public Repositories
* Followers
* Following
* Total Stars
* Account Age
* Top Languages
* Most Popular Repository
* Repository Engagement Score
