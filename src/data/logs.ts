export interface SystemLog {
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARNING" | "MILESTONE" | "TARGET";
  category: "SYSTEM" | "EDUCATION" | "SKILL" | "CERTIFICATION" | "MILESTONE" | "GOAL";
  message: string;
  details: string;
}

export const systemLogs: SystemLog[] = [
  {
    timestamp: "NEXT???",
    level: "TARGET",
    category: "GOAL",
    message: "Seeking Internships & Entry-Level Roles",
    details: "Actively looking for professional internship opportunities or entry-level cloud, DevOps, or data engineering roles to apply my building skills, collaborate with senior engineers, and grow as a professional builder."
  },
  {
    timestamp: "2026-05",
    level: "SUCCESS",
    category: "EDUCATION",
    message: "Completed M.Sc. in Computer Applications (M.Sc. CA)",
    details: "Graduated from Symbiosis Institute of Computer Studies and Research, Pune, with a specialization in Data Science, achieving an overall score of 8.49 CGPA (2024 - 2026). Developed specialized skills in Machine Learning, Data Analytics, and AI integrations."
  },
  {
    timestamp: "2024-05",
    level: "SUCCESS",
    category: "EDUCATION",
    message: "Graduated in Bachelors in Computer Applications (BCA)",
    details: "Completed undergraduate degree at Ebenezer Group of Institutions, Bangalore, graduating with a score of 8.78 CGPA (2021 - 2024). Core studies included Software Engineering, Database Systems, and Web Application layouts."
  },
  {
    timestamp: "2024-04",
    level: "SUCCESS",
    category: "MILESTONE",
    message: "Data Science Intern at HOPE Foundation",
    details: "Collected, cleaned, and preprocessed image datasets for facial recognition applications, performing exploratory data analysis (EDA) and documenting findings to support model performance improvements."
  },
  {
    timestamp: "2023-09",
    level: "SUCCESS",
    category: "SKILL",
    message: "Acquired Containerization & Docker Competency",
    details: "Learned how to construct optimized Docker layers, run container network routes locally, and handle microservice orchestration layouts."
  },
  {
    timestamp: "2022-06",
    level: "SUCCESS",
    category: "MILESTONE",
    message: "Operations Intern at Expert Callers (ECPL)",
    details: "Partnered with cross-functional operational teams in Bangalore, resolving customer queries and handling service-related issues through structured communication while maintaining accurate records."
  },
  {
    timestamp: "2021-05",
    level: "SUCCESS",
    category: "EDUCATION",
    message: "Completed 12th Grade (Higher Secondary)",
    details: "Completed higher secondary education in the Science stream, graduating with an overall score of 82%."
  },
  {
    timestamp: "2019-05",
    level: "SUCCESS",
    category: "EDUCATION",
    message: "Completed 10th Grade (Secondary School)",
    details: "Graduated secondary school education with an overall score of 92.4%."
  },
  {
    timestamp: "2003-10",
    level: "INFO",
    category: "SYSTEM",
    message: "System Initialization: Born on 22/10/2003",
    details: "Initial build deployment. Core engine online."
  }
];
