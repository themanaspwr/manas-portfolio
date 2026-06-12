export interface SkillNode {
  id: string;
  name: string;
  category: 'cloud' | 'datascience' | 'language' | 'genai' | 'system';
  level: number; // 1 to 5
  x: number; // percentage coordinate (10-90)
  y: number; // percentage coordinate (10-90)
  projects: string[];
  notes: string;
}

export interface SkillEdge {
  source: string;
  target: string;
}

export const skillNodes: SkillNode[] = [
  {
    id: "python",
    name: "Python",
    category: "language",
    level: 3,
    x: 25,
    y: 35,
    projects: ["Streamlit CSV Dashboard", "Retail Sales Analytics", "Serverless cleaning pipeline"],
    notes: "Core programming language. Practical experience utilizing Pandas, NumPy, and Scikit-Learn for preprocessing, statistical analysis, and model forecasting."
  },
  {
    id: "sql",
    name: "SQL",
    category: "language",
    level: 3,
    x: 20,
    y: 55,
    projects: ["Retail Sales Analytics"],
    notes: "Proficient in writing database queries, filtering datasets, joining relational tables, and extracting aggregation metrics for analysis."
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "datascience",
    level: 3,
    x: 40,
    y: 30,
    projects: ["Streamlit CSV Dashboard", "Serverless cleaning pipeline", "Retail Sales Analytics"],
    notes: "Primary tool for data manipulation. Handling missing value imputations, duplicate records, filtering dataframes, and data normalization."
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "datascience",
    level: 2,
    x: 45,
    y: 45,
    projects: ["Streamlit CSV Dashboard", "Retail Sales Analytics"],
    notes: "Mathematical array operations, vectorized calculations, and handling multi-dimensional matrices in preprocessing pipelines."
  },
  {
    id: "scikitlearn",
    name: "Scikit-Learn",
    category: "datascience",
    level: 2,
    x: 60,
    y: 25,
    projects: ["Retail Sales Analytics"],
    notes: "Implementing regression and classification algorithms. Experience with model splitting, metric evaluations (R², RMSE), and feature scaling."
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    category: "datascience",
    level: 3,
    x: 60,
    y: 55,
    projects: ["Streamlit CSV Dashboard", "Retail Sales Analytics"],
    notes: "Creating graphs, scatter plots, trend line charts, and Seaborn heatmaps to present exploratory statistics visually."
  },
  {
    id: "powerbi",
    name: "Power BI",
    category: "datascience",
    level: 2,
    x: 75,
    y: 60,
    projects: ["Business Intelligence Projects"],
    notes: "Designing business intelligence reports, aggregating key performance indicators, and building cross-functional visualization dashboards."
  },
  {
    id: "aws",
    name: "AWS Cloud",
    category: "cloud",
    level: 2,
    x: 40,
    y: 65,
    projects: ["Serverless cleaning pipeline"],
    notes: "Deploying data tasks on S3 buckets, triggering Lambda event handlers, managing IAM roles, and configuring EC2 sandboxes."
  },
  {
    id: "gemini",
    name: "GenAI & LLMs",
    category: "genai",
    level: 3,
    x: 75,
    y: 35,
    projects: ["NovaFlow AI Analytics"],
    notes: "Applying prompt engineering configurations, few-shot prompting, and integrating Google Gemini APIs for extracting structured insights from raw communications."
  },
  {
    id: "git",
    name: "Git / GitHub",
    category: "system",
    level: 3,
    x: 50,
    y: 80,
    projects: ["All Project Repositories"],
    notes: "Managing version-controlled code, branching, repository merges, and hosting project codes securely on GitHub."
  }
];

export const skillEdges: SkillEdge[] = [
  { source: "python", target: "pandas" },
  { source: "pandas", target: "numpy" },
  { source: "pandas", target: "scikitlearn" },
  { source: "numpy", target: "scikitlearn" },
  { source: "pandas", target: "matplotlib" },
  { source: "matplotlib", target: "powerbi" },
  { source: "python", target: "sql" },
  { source: "pandas", target: "aws" },
  { source: "python", target: "gemini" },
  { source: "aws", target: "git" },
  { source: "gemini", target: "git" },
  { source: "sql", target: "git" }
];
