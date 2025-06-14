# Creator Platform

A MERN stack application featuring a ChatGPT-style content idea generator and an Instagram analytics dashboard, built as part of a developer assignment. The content idea generator uses mock data to simulate AI-generated responses, while the analytics dashboard displays simulated Instagram metrics.

## Features
- **Content Idea Generator**: Allows users to input a topic and niche (e.g., fashion, fitness, finance) to generate a trending Instagram reel idea, caption, 5 hashtags, and a hook.
- **Instagram Analytics Dashboard**: Displays simulated analytics, including:
  - Follower growth over 7 days (line chart using Recharts).
  - Engagement rates for 5 recent posts (likes and comments).
  - Best time to post (e.g., "Wednesday 7 PM").
- **Content Bank**: Saves generated content ideas to MongoDB for later reuse.
- **Authentication**: JWT-based login/register system to secure access to features.
- **Analytics Upload/Export**: Supports uploading new JSON analytics data and exporting analytics as a downloadable JSON report.

**Note**: The Content Idea Generator uses mock data to simulate OpenAI API responses, as no real `OPENAI_API_KEY` is used for this demo. The implementation is designed to seamlessly integrate with the real OpenAI API by updating the `server/routes/idea.js` file.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Recharts, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local or Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Other**: Axios for API calls, file-saver for report export

## Setup Instructions
Follow these steps to run the project locally:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chetanji028/mern-creator-platform.git 

### Backend Setup 
cd server 
npm install 

Start the backend: npm run dev 

The backend will run on http://localhost:5000

 
### Frontend Setup 
cd client 
npm install 
npm start 

The frontend will run on http://localhost:3000

### Access the application:
Open http://localhost:3000 in your browser.

Register or log in to access features.

Use the Home page to generate content ideas.

Navigate to Analytics to view Instagram analytics.

Visit Content Bank to see saved ideas.

Upload new JSON analytics data or export a report from the Analytics page.



### Mock Data Implementation:
The Content Idea Generator (/api/idea/generate) uses mock data instead of the OpenAI API to avoid requiring an OPENAI_API_KEY. The mock response in server/routes/idea.js mimics the expected format (reel idea, caption, hashtags, hook) and is dynamically generated based on user input (topic and niche).

To integrate the real OpenAI API, update server/routes/idea.js to use the OpenAI client and add OPENAI_API_KEY to .env.


 


   

