export interface Project {
  id: string;
  title: string;
  category: 'cloud' | 'devops' | 'datascience' | 'automation' | 'personal';
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  architecture: string;
  lessonsLearned: string;
  githubLink: string;
  featured?: boolean;
  inProgress?: boolean;
}

export const projects: Project[] = [
  {
    id: "serverless-cleaning-pipeline",
    title: "Serverless CSV Cleaning Pipeline using AWS",
    category: "cloud",
    overview: "An automated data preprocessing pipeline that triggers Lambda executions upon CSV uploads to S3, cleaning and standardizing datasets using Python and Pandas.",
    problem: "Data scientists and analysts spent excessive time manually cleaning raw CSV files. Duplicate records, missing values, and inconsistent date formats stalled downstream machine learning workflows.",
    solution: "Designed a serverless ingest pipeline. When a user uploads a raw dataset to an S3 bucket, a Lambda trigger initiates a data cleaning handler in Python. The function standardizes categories, handles null values, and saves clean files to a structured target bucket.",
    technologies: ["AWS S3", "AWS Lambda", "Python", "Pandas", "IAM", "Terraform"],
    architecture: "S3 Bucket Upload -> Lambda Event Trigger -> Python Data Processor (Pandas) -> Secure Target S3 Bucket.",
    lessonsLearned: "Lambda has memory and execution time limits. For very large CSV datasets, splitting files into smaller chunks or routing execution to AWS Glue jobs prevents timeout errors.",
    githubLink: "https://github.com/themanaspwr/serverless-csv-cleaner",
    featured: true
  },
  {
    id: "retail-sales-analysis",
    title: "Retail Sales Analysis & Forecasting Dashboard",
    category: "datascience",
    overview: "An end-to-end data analytics system that cleans retail transaction data, conducts exploratory analysis, and implements linear regression models to forecast monthly sales.",
    problem: "Business owners struggled to track margin leakages and seasonal changes in retail transactions, relying on complex spreadsheets with outdated formulas.",
    solution: "Engineered an analytics script in Python to clean transactions and filter outliers. Visualized insights including a 45% Q4 sales surge and profit leakage in furniture categories. Built a linear regression model in scikit-learn to forecast future sales (R² ≈ 0.87).",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn", "Jupyter"],
    architecture: "Synthetic CSV Source -> Pandas EDA Pipeline -> Matplotlib Visualization Charts -> Scikit-Learn Regression -> Jupyter Notebook Report.",
    lessonsLearned: "Using Seaborn correlation heatmaps helped identify highly correlated features. Removing multicollinear variables improved the stability and interpretability of our sales forecasting model.",
    githubLink: "https://github.com/themanaspwr/Retail-Sales-Analysis"
  },
  {
    id: "prompt-opt",
    title: "PromptOpt: LLM Prompt Optimizer",
    category: "datascience",
    overview: "A lightweight automated Prompt Engineering optimizer designed to refine LLM prompts for lower token usage while preserving performance quality.",
    problem: "Large Language Model queries are expensive, and bloated prompts lead to excessive token usage and higher inference costs in production systems.",
    solution: "Built an optimizer system that counts prompt tokens using tiktoken, generates semantic prompt variations, runs LLM-as-a-judge quality evaluations, and outputs efficiency rankings to identify the most cost-effective variant.",
    technologies: ["FastAPI", "SQLite", "Python", "tiktoken", "OpenAI API", "Google Gemini API"],
    architecture: "FastAPI Backend -> Tiktoken Counter -> LLM Variant Generator & Judge -> SQLite History database.",
    lessonsLearned: "Automating evaluation using an LLM-as-a-judge requires clear criteria rubrics and temperature tuning to ensure stable and reproducible quality scoring across variations.",
    githubLink: "https://github.com/themanaspwr/PromptOpt"
  },
  {
    id: "network-metrics-dashboard",
    title: "Real-Time Network Metrics Dashboard",
    category: "devops",
    overview: "A real-time network telemetry web dashboard designed to visualize latency, packet loss, packet gain, and host CPU usage using Flask and Chart.js.",
    problem: "Systems administrators need to identify network anomalies and packet spikes quickly without loading heavy command-line diagnostics or expensive monitoring suites.",
    solution: "Designed a web dashboard that serves live system metrics. Utilizes SQLite database backend to store records and renders real-time updating line, bar, and scatter charts via Chart.js on the client.",
    technologies: ["Python", "Flask", "SQLite", "Chart.js", "HTML/CSS", "JavaScript"],
    architecture: "Flask Web Server -> SQLite Time Series Db -> Chart.js Web Client WebSocket/Polling Updates.",
    lessonsLearned: "Buffering time-series telemetry data on the server prevents SQLite write bottlenecks during high-frequency network monitoring polls.",
    githubLink: "https://github.com/themanaspwr/network-metrics-dashboard"
  },
  {
    id: "file-converter",
    title: "Browser-Based File Converter Web App",
    category: "automation",
    overview: "A lightweight, serverless browser tool to preview, analyze, and convert text, CSV, JSON, and common image formats completely client-side.",
    problem: "Uploading files to online conversion websites poses severe security and data privacy risks for confidential documents.",
    solution: "Built a serverless utility where all file parsing, metadata extraction, and conversions (such as CSV to JSON, or JPG to WebP) are executed locally inside the user's browser.",
    technologies: ["JavaScript", "HTML5", "CSS3", "FileReader API", "Canvas API", "PDF.js"],
    architecture: "Browser FileReader -> Local Buffer Conversion -> Client-Side Blob Download Generator.",
    lessonsLearned: "Utilizing the browser's native Canvas API allows fast, high-quality image transcoding (such as PNG to WebP) entirely on the client, saving network bandwidth.",
    githubLink: "https://github.com/themanaspwr/File-Converter"
  },
  {
    id: "ascend-productivity",
    title: "Ascend: Gamified RPG Productivity System",
    category: "personal",
    overview: "A browser-based RPG productivity app that turns daily tasks, habit building, and goals into a gamified quest system with character level-ups, experience points (XP), skill trees, and rewards.",
    problem: "Traditional to-do lists fail to sustain user motivation over time, leading to procrastination and habit abandonment.",
    solution: "Developed a gamified workspace where users create a character, earn experience points (XP) and gold by completing custom quests, level up specific skills (e.g., coding, fitness), and purchase rewards from a dopamine bank.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    architecture: "Browser-based UI (HTML/CSS) -> State Management Engine (JavaScript) -> Persistence layer (Web Local Storage API).",
    lessonsLearned: "Designing a rewarding feedback loop with visual XP bars and prompt-based character leveling significantly increases user return rates and daily engagement compared to simple checkbox lists.",
    githubLink: "https://github.com/themanaspwr/Ascend-A-Gamified-Task-Based-Productivity-System"
  },
  {
    id: "the-manny-studio",
    title: "The Manny Studio Landing Page Portfolio",
    category: "personal",
    overview: "A high-performance, conversion-optimized landing page designed to turn visitors into design clients, featuring a WhatsApp call-to-action pipeline.",
    problem: "Independent creators and design studios lose potential clients due to complex navigations and lack of clear direct contact links on their web pages.",
    solution: "Engineered a minimalist, premium landing page utilizing modern typography and CSS layout standards, integrating direct WhatsApp messaging triggers and a polished portfolio showcase.",
    technologies: ["HTML5", "CSS3", "Vanilla JS", "WhatsApp API"],
    architecture: "Semantic HTML Layout -> Responsive Grid CSS -> Vanilla JS Menu Toggle & WhatsApp URL builder.",
    lessonsLearned: "Minimizing navigation choices and implementing a clear, sticky CTA (Call to Action) directly increases user conversion and contact rates.",
    githubLink: "https://github.com/themanaspwr/THE-MANNY-STUDIO"
  },
  {
    id: "urban-flex",
    title: "UrbanFlex Fitness Center Landing Page",
    category: "personal",
    overview: "A responsive, high-impact marketing landing page for a premium fitness center, presenting training schedules, class lists, and memberships.",
    problem: "Fitness studios struggle to attract local sign-ups without a responsive web page showing active coaches, training environments, and direct booking.",
    solution: "Created a modern website with custom SVG graphics, skewed section dividers, custom menus, and structured class dossiers to encourage free trial bookings.",
    technologies: ["HTML5", "CSS3", "Oswald Font", "Responsive Design"],
    architecture: "Mobile-First CSS Layout -> CSS Grid Feature Cards -> SVG Icon System -> JavaScript Event Handlers.",
    lessonsLearned: "Using responsive typography and mobile-first media queries ensures the schedule page renders cleanly on mobile devices used by on-the-go gym members.",
    githubLink: "https://github.com/themanaspwr/URBAN-FLEX"
  },
  {
    id: "tech-starter",
    title: "TechStart SaaS Analytics Landing Page",
    category: "personal",
    overview: "A premium marketing and product demo landing page for a SaaS analytics company, featuring responsive layout cards and booking integrations.",
    problem: "SaaS startups fail to convey value propositions when data analytics features are presented using complex text descriptions rather than structured, simple layouts.",
    solution: "Built a conversion-optimized marketing landing page with custom badges, clean pricing tables, client testimonials, and a mock dashboard interface to hook trial sign-ups.",
    technologies: ["HTML5", "CSS3", "Plus Jakarta Sans", "Vanilla JS"],
    architecture: "Semantic HTML -> Modern CSS Flexbox/Grid -> JavaScript Interactive Modal Triggers.",
    lessonsLearned: "Placing key performance numbers and badges above the fold helps capture user interest immediately, lowering the page bounce rate.",
    githubLink: "https://github.com/themanaspwr/Tech-Starter"
  }
];
