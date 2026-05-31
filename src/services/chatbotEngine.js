/**
 * chatbotEngine.js
 * 
 * Client-side chatbot engine for Aaron's portfolio.
 * Replaces the Python seq-to-seq model with keyword-based intent matching.
 * No server required — runs entirely in the browser.
 */

// ─── Knowledge Base ──────────────────────────────────────────────
// Sourced from data.js, dataSkills.json, dataCertificates.json, dataWork.json
import { data, dataInfo, dataProfile, dataAbout } from '../data/data.js';

const KNOWLEDGE = {
  name: dataInfo[0].name,
  title: dataInfo[0].title,
  email: dataInfo[0].email,
  phone: dataInfo[0].number,
  github: dataInfo[0].github,

  profile: dataProfile[0].shortProfile,

  about: dataAbout[0].shortAbout,

  passion: dataInfo[0].passion,

  experience: data,

  certifications: [
    "Build Chatbots with Python (Codecademy)",
    "Learn React Course (Codecademy)",
    "Intro to PyTorch and Neural Networks (Codecademy)",
    "Scientific Computing with Python (freeCodeCamp)",
    "Career Essentials in Software Development (Microsoft & LinkedIn)",
    "Web Development NC III (Mindtech / TESDA)",
    "Game Design and Development (CIIT College)"
  ],

  projects: [
    {
      name: "Resume Analyzer",
      description: "An LLM-powered tool that evaluates and analyzes resumes using pretrained language models. Supports Ollama and OpenAI models.",
      tech: ["Python", "LLMs", "Ollama", "OpenAI", "HuggingFace", "Gradio"],
      link: "https://github.com/AaronWillsAbordo/ResumeAnalyzer"
    },
    {
      name: "Untitled Game",
      description: "A 3D first-person adventure game built with Unity 3D where players explore a surreal landscape.",
      tech: ["Unity 3D", "C#", "Game Development"],
      link: "https://github.com/AaronWillsAbordo/untitledgame"
    }
  ]
};


// ─── Intent Definitions ──────────────────────────────────────────
// Each intent has keyword patterns and a response generator.

const INTENTS = [
  {
    name: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "sup", "yo", "howdy", "what's up", "whats up"],
    response: () => `Hey there! 👋 I'm Aaron's portfolio assistant. Feel free to ask me about his experience, skills, projects, or anything else! Here are some things you can ask:\n\n• "Who is Aaron?"\n• "What are his skills?"\n• "Tell me about his work experience"\n• "What projects has he built?"\n• "How can I contact him?"`
  },
  {
    name: "ask_about_person",
    keywords: ["who is aaron", "who is he", "about aaron", "tell me about aaron", "describe aaron", "bio", "biography", "introduction", "who exactly", "who the heck", "about him", "about yourself", "who are you", "introduce"],
    response: () => `${KNOWLEDGE.name} is a ${KNOWLEDGE.title}.\n\n${KNOWLEDGE.profile}\n\nHe's passionate about creating impactful solutions and continuously exploring new technologies.`
  },
  {
    name: "passion",
    keywords: ["passion", "passionate", "drives you", "excites you", "what motivates", "motivation", "love doing", "enjoy doing", "interested in"],
    response: () => `${KNOWLEDGE.passion}`
  },
  {
    name: "experience",
    keywords: ["experience", "work history", "career", "job", "employment", "worked at", "company", "companies", "roles", "position", "professional background", "work experience"],
    response: () => {
      const exp = KNOWLEDGE.experience.map(e =>
        e.roles.map(r => `🏢 ${e.company} — \n<strong>${r.title}</strong> \n(${r.date})\n${r.highlights.map(h => `   • ${h}`).join('\n')}`).join('\n\n')
      ).join('\n\n');
      return `Here are Aaron's professional experience:\n\n${exp}`;
    }
  },
  {
    name: "skills",
    keywords: ["skills", "technologies", "tech stack", "tools", "programming languages", "frameworks", "what can he do", "what does he know", "expertise", "proficient", "specializ"],
    response: () => `Aaron's key skills & technologies:\n\n🤖 AI/ML: Python, PyTorch, LightGBM, Pandas, FastAPI\n💻 Web: React, JavaScript, Node.js, .NET Framework\n🧪 Testing: Cypress\n☁️ Cloud & DevOps: Azure, Google Cloud, Git, Linux Server\n🛠️ Other: SQL, C#, UiPath, Three.js, Jira`
  },
  {
    name: "projects",
    keywords: ["projects", "portfolio", "built", "created", "developed", "work samples", "showcase", "side project", "personal project", "work"],
    response: () => {
      const proj = KNOWLEDGE.projects.map(p =>
        `📂 ${p.name}\n   ${p.description}\n   Tech: ${p.tech.join(', ')}\n   🔗 ${p.link}`
      ).join('\n\n');
      return `Here are some of Aaron's projects:\n\n${proj}`;
    }
  },
  {
    name: "certifications",
    keywords: ["certification", "certificate", "certified", "courses", "training", "education", "learning", "credential", "diploma"],
    response: () => {
      const certs = KNOWLEDGE.certifications.map(c => `📜 ${c}`).join('\n');
      return `Aaron's certifications:\n\n${certs}`;
    }
  },
  {
    name: "contact",
    keywords: ["contact", "email", "phone", "reach", "hire", "get in touch", "connect", "message him", "call", "number", "how to reach", "reach out"],
    response: () => `You can reach Aaron through:\n\n📧 Email: ${KNOWLEDGE.email}\n📱 Phone: ${KNOWLEDGE.phone}\n🐙 GitHub: ${KNOWLEDGE.github}\n🌐 Portfolio: ${KNOWLEDGE.portfolio}`
  },
  {
    name: "resume",
    keywords: ["resume", "cv", "curriculum vitae", "download resume"],
    response: () => `For Aaron's full resume, feel free to reach out to him directly at ${KNOWLEDGE.email}. You can also explore this portfolio for a detailed overview of his experience, skills, and projects!`
  },
  {
    name: "thanks",
    keywords: ["thank", "thanks", "ty", "appreciate", "helpful", "great help"],
    response: () => `You're welcome! 😊 Feel free to ask anything else, or reach out to Aaron directly at ${KNOWLEDGE.email}.`
  },
  {
    name: "goodbye",
    keywords: ["bye", "goodbye", "see you", "later", "take care", "ciao", "peace"],
    response: () => `Goodbye! 👋 Thanks for visiting Aaron's portfolio. Feel free to come back anytime!`
  },
  {
    name: "scalableos",
    keywords: ["scalableos", "scalable os", "ai developer role"],
    response: () => {
      const exp = KNOWLEDGE.experience.filter(e => e.company.includes("ScalableOS"))
        .map(e => e.roles.map(r => `🏢 ${e.company} — \n<strong>${r.title}</strong> \n(${r.date})\n${r.highlights.map(h => `   • ${h}`).join('\n')}`).join('\n\n')
        ).join('\n\n');
      return `At ScalableOS Corporation, Aaron worked as:\n\n${exp}`;
    }
  },
  {
    name: "nimbyx",
    keywords: ["nimbyx", "software engineer role", "ml engineer role"],
    response: () => {
      const exp = KNOWLEDGE.experience.filter(e => e.company.includes("Nimbyx"))
        .map(e => e.roles.map(r => `🏢 ${e.company} — \n<strong>${r.title}</strong> \n(${r.date})\n${r.highlights.map(h => `   • ${h}`).join('\n')}`).join('\n\n')
        ).join('\n\n');
      return `At Nimbyx Philippines Inc., Aaron worked as:\n\n${exp}`;
    }
  },
  {
    name: "help",
    keywords: ["help", "what can you do", "what can i ask", "commands", "options", "menu"],
    response: () => `Here are some things you can ask me:\n\n• "Who is Aaron?" — Learn about him\n• "What are his skills?" — Tech stack & expertise\n• "Work experience" — Professional background\n• "Projects" — Portfolio showcase\n• "Certifications" — Courses & credentials\n• "Contact" — How to reach Aaron\n• "What is his passion?" — What drives him`
  }
];


// ─── Intent Matching Engine ──────────────────────────────────────

/**
 * Normalize input text for matching.
 */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Score how well an input matches an intent.
 * Returns a value between 0 and 1.
 */
function scoreIntent(normalizedInput, intent) {
  let bestScore = 0;

  for (const keyword of intent.keywords) {
    const normalizedKeyword = normalize(keyword);

    // Exact match
    if (normalizedInput === normalizedKeyword) {
      return 1.0;
    }

    // Contains full keyword phrase
    if (normalizedInput.includes(normalizedKeyword)) {
      const score = 0.8 + (normalizedKeyword.length / normalizedInput.length) * 0.2;
      bestScore = Math.max(bestScore, Math.min(score, 0.99));
      continue;
    }

    // Word-level partial matching
    const inputWords = normalizedInput.split(' ');
    const keywordWords = normalizedKeyword.split(' ');
    let matchedWords = 0;

    for (const kw of keywordWords) {
      if (inputWords.some(iw => iw === kw || iw.includes(kw) || kw.includes(iw))) {
        matchedWords++;
      }
    }

    if (matchedWords > 0) {
      const score = (matchedWords / keywordWords.length) * 0.7;
      bestScore = Math.max(bestScore, score);
    }
  }

  return bestScore;
}

/**
 * Generate a chatbot response for the given user message.
 * @param {string} userMessage - The user's input text.
 * @returns {string} The bot's response.
 */
export function generateResponse(userMessage) {
  if (!userMessage || !userMessage.trim()) {
    return "Please type a message and I'll do my best to help! 😊";
  }

  const normalizedInput = normalize(userMessage);

  // Score all intents
  let bestIntent = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    const score = scoreIntent(normalizedInput, intent);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  // Confidence threshold
  if (bestIntent && bestScore >= 0.4) {
    return bestIntent.response();
  }

  // Fallback
  return `I'm not sure how to answer that, but I'm here to help! 🤔\n\nTry asking me about:\n• Aaron's background & skills\n• Work experience\n• Projects\n• Certifications\n• Contact info\n\nOr just type "help" to see all options.`;
}

/**
 * Get the initial greeting message shown when the chatbot opens.
 * @returns {string}
 */
export function getGreeting() {
  return `Hi there! 👋 I'm Aaron's portfolio assistant.\n\nI can tell you about his skills, experience, projects, and more. What would you like to know?`;
}
