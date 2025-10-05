import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface GeminiInsights {
  motivationalMessage: string;
  projectIdeas: string[];
  learningPath: string;
  nextSteps: string[];
}

// Static fallback insights for different profiles
const DEFAULT_INSIGHTS = {
  frontend: {
    motivationalMessage: "Your frontend skills are awesome! Keep building beautiful user experiences that make people's lives better. 🚀",
    projectIdeas: [
      "Build a responsive portfolio website showcasing your best work",
      "Create a component library with reusable UI elements",
      "Develop an interactive data visualization dashboard",
      "Build a progressive web app with offline functionality",
    ],
    learningPath: "Focus on performance optimization, accessibility standards, and modern state management patterns",
    nextSteps: [
      "Contribute to an open-source UI component library",
      "Build a project using a framework you haven't tried yet",
      "Write about a frontend challenge you recently solved",
    ],
  },
  backend: {
    motivationalMessage: "Your backend expertise is impressive! You're building the foundation that powers amazing applications. Keep pushing! 💪",
    projectIdeas: [
      "Design and implement a RESTful API with authentication",
      "Build a microservices architecture for a real-world problem",
      "Create a real-time data processing pipeline",
      "Develop a CLI tool that automates deployment workflows",
    ],
    learningPath: "Dive deeper into system design, database optimization, and cloud infrastructure",
    nextSteps: [
      "Contribute to a backend framework or library you use",
      "Design and document an API for a project idea",
      "Experiment with a new database technology",
    ],
  },
  fullstack: {
    motivationalMessage: "Your full-stack abilities are remarkable! You can bring ideas to life from start to finish. That's powerful! 🌟",
    projectIdeas: [
      "Build a complete SaaS application from frontend to backend",
      "Create a real-time collaboration tool with WebSockets",
      "Develop a mobile-first web app with offline sync",
      "Build an API gateway with a modern frontend dashboard",
    ],
    learningPath: "Master the end-to-end deployment pipeline, DevOps practices, and scaling strategies",
    nextSteps: [
      "Deploy a full-stack project to production",
      "Contribute to both frontend and backend of an open-source project",
      "Create a tutorial series on full-stack development",
    ],
  },
  mobile: {
    motivationalMessage: "Mobile development is the future! Your skills put amazing apps in people's pockets. Keep innovating! 📱",
    projectIdeas: [
      "Build a cross-platform app with React Native or Flutter",
      "Create a mobile game with smooth animations",
      "Develop a fitness or productivity tracking app",
      "Build an AR-enhanced mobile experience",
    ],
    learningPath: "Focus on mobile performance, native platform features, and app store optimization",
    nextSteps: [
      "Publish your first app to the App Store or Play Store",
      "Contribute to a popular mobile framework",
      "Create a mobile UI/UX case study",
    ],
  },
  devops: {
    motivationalMessage: "DevOps is crucial! You're making deployments faster and systems more reliable. That's impactful work! ⚙️",
    projectIdeas: [
      "Set up a complete CI/CD pipeline from scratch",
      "Build infrastructure-as-code templates for common scenarios",
      "Create a monitoring and alerting system",
      "Develop automation scripts for deployment workflows",
    ],
    learningPath: "Deep dive into Kubernetes, infrastructure as code, and site reliability engineering",
    nextSteps: [
      "Get a cloud certification (AWS/GCP/Azure)",
      "Contribute to DevOps tools and automation projects",
      "Write about a deployment challenge you solved",
    ],
  },
  "ml-ai": {
    motivationalMessage: "Machine learning is transforming the world! Your work on AI is shaping the future. Keep learning! 🤖",
    projectIdeas: [
      "Build and train a model for a real-world problem",
      "Create a recommendation system using collaborative filtering",
      "Develop a computer vision application",
      "Build an NLP-powered chatbot or text analyzer",
    ],
    learningPath: "Focus on deep learning frameworks, model optimization, and MLOps practices",
    nextSteps: [
      "Participate in a Kaggle competition",
      "Contribute to ML libraries or datasets",
      "Create a blog post explaining an ML concept simply",
    ],
  },
  "data-science": {
    motivationalMessage: "Data science is powerful! You're turning data into insights that drive decisions. Amazing work! 📊",
    projectIdeas: [
      "Build an analytics dashboard with interactive visualizations",
      "Create a data pipeline for ETL processes",
      "Develop a predictive model for business metrics",
      "Build a data exploration tool with Jupyter",
    ],
    learningPath: "Master advanced statistics, data engineering, and storytelling with data",
    nextSteps: [
      "Work on a data science project with real-world impact",
      "Contribute to data analysis tools and libraries",
      "Share insights from a data analysis you performed",
    ],
  },
  default: {
    motivationalMessage: "Your diverse skills make you versatile! Every project is a chance to learn and grow. Keep building! 🚀",
    projectIdeas: [
      "Build a personal project that solves a problem you have",
      "Contribute to an open-source project you use regularly",
      "Create a portfolio website showcasing your work",
      "Develop a tool that automates something you do often",
    ],
    learningPath: "Explore new technologies, contribute to open source, and build projects that interest you",
    nextSteps: [
      "Choose one new technology to learn this month",
      "Make your first open-source contribution",
      "Share your knowledge through writing or teaching",
    ],
  },
};

/**
 * Generate personalized insights using Gemini AI (or static fallback)
 * Uses gemini-1.5-flash for efficiency
 */
export async function generateProfileInsights(
  languages: string[],
  interests: string[],
  experienceLevel: string,
  careerPath: string
): Promise<GeminiInsights> {
  // First, try to return static insights based on career path
  const staticInsights = DEFAULT_INSIGHTS[careerPath as keyof typeof DEFAULT_INSIGHTS] || DEFAULT_INSIGHTS.default;
  
  // Use static insights for better performance
  // Only use Gemini for advanced customization if explicitly needed
  const useAI = false; // Set to true if you want AI-generated insights
  
  if (!useAI || !process.env.GEMINI_API_KEY) {
    return staticInsights;
  }

  try {
    // Use gemini-2.0-flash-lite for faster, more efficient responses
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `Be brief and encouraging. Based on: ${languages.slice(0, 3).join(", ")} (${experienceLevel} ${careerPath}), provide in JSON:
{
  "motivationalMessage": "1 sentence, cheerful",
  "projectIdeas": ["3 specific ideas"],
  "learningPath": "1 sentence",
  "nextSteps": ["2 actions"]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const insights = JSON.parse(jsonMatch[0]);
      return insights;
    }

    return staticInsights;
  } catch (error) {
    console.error("Gemini API error, using static insights:", error);
    return staticInsights;
  }
}

/**
 * Generate project recommendations (uses static insights for efficiency)
 */
export async function generateProjectRecommendations(
  languages: string[],
  interests: string[],
  experienceLevel: string
): Promise<string[]> {
  // Return static project ideas - faster and more reliable
  const topLang = languages[0]?.toLowerCase() || "javascript";
  const projects: string[] = [];

  // Language-specific projects
  if (["javascript", "typescript"].includes(topLang)) {
    projects.push(
      "Build a real-time chat application with WebSockets",
      "Create a Chrome extension to boost productivity",
      "Develop a static site generator"
    );
  } else if (topLang === "python") {
    projects.push(
      "Build a web scraper with data visualization",
      "Create a REST API with FastAPI",
      "Develop a machine learning project"
    );
  } else if (["java", "kotlin"].includes(topLang)) {
    projects.push(
      "Build an Android app",
      "Create a Spring Boot microservice",
      "Develop a desktop application with JavaFX"
    );
  } else {
    projects.push(
      `Build a ${topLang} library or framework`,
      "Create a command-line tool",
      "Develop a web application"
    );
  }

  // Experience-based projects
  if (experienceLevel === "beginner") {
    projects.push("Build a personal portfolio website", "Create a to-do list app");
  } else if (experienceLevel === "intermediate") {
    projects.push("Contribute to an open-source project", "Build a full-stack application");
  } else {
    projects.push("Architect a scalable system", "Mentor other developers");
  }

  return projects.slice(0, 5);
}
