import React from 'react';
import { playClickSound, playHoverSound } from '../components/Header';
import { FileText, Download, Briefcase, GraduationCap, Award, Compass, ExternalLink } from 'lucide-react';

export const ResumeView: React.FC = () => {
  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* Resume Title & download */}
        <section className="border-b border-text/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
              <FileText className="text-accent-lime" /> RESUME / CV
            </h2>
            <p className="font-mono text-xs text-text/50 mt-1">
              M.Sc. Computer Applications student specializing in Data Science, Machine Learning, and Analytics workflows.
            </p>
          </div>
          
          {/* Download button */}
          <a
            href="mailto:manas280704@gmail.com"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-[10px] text-primary bg-accent-lime hover:bg-accent-lime/85 px-4 py-2 rounded flex items-center gap-1.5 font-bold transition-all self-start sm:self-auto shadow-md"
          >
            <Download size={12} />
            <span>REQUEST_RESUME_PDF</span>
          </a>
        </section>

        {/* 1. Core Profile summary */}
        <section className="bg-secondary/45 border border-text/10 rounded-lg p-5 theme-transition font-mono text-xs flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <div className="flex-1">
            <span className="text-accent-lime font-bold block mb-2">[SYS_SUMMARY.LOG]</span>
            <p className="text-text/75 leading-relaxed">
              M.Sc. Computer Applications student with a strong foundation in Data Science, Machine Learning, Data Analytics, and Generative AI. Experienced in data preprocessing, exploratory data analysis (EDA), visualization, and building data-driven applications using Python, SQL, and cloud technologies. Hands-on experience with machine learning concepts, prompt engineering, and AI-powered solutions. Proficient in Python (Pandas, NumPy, Scikit-learn, Matplotlib, Plotly) with a strong analytical mindset and eagerness to solve real-world business problems through data and intelligent systems.
            </p>
          </div>
        </section>

        {/* 2. Two-Column Resume Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Work Experience & Projects (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Experience Group */}
            <div className="bg-secondary/35 border border-text/5 rounded-lg p-5 flex flex-col gap-4">
              <h3 className="font-mono text-sm font-bold text-accent-orange border-b border-text/10 pb-2 mb-1 flex items-center gap-2">
                <Briefcase size={14} className="text-accent-orange" /> [WORK_HISTORY.LOG]
              </h3>

              <div className="space-y-6">
                {/* Internship 1 */}
                <div className="font-mono text-xs relative pl-4 border-l border-text/10">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-accent-orange" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="font-bold text-text">Data Science Intern</h4>
                    <span className="text-[10px] text-accent-lime">Apr 2024 — May 2024</span>
                  </div>
                  <h5 className="text-[10px] text-text/50 mb-2 font-bold">HOPE Foundation, Bangalore</h5>
                  <ul className="list-disc pl-4 space-y-1.5 text-text/75 text-[11px] leading-relaxed">
                    <li>Collected, cleaned, and preprocessed image datasets for facial recognition applications, improving dataset quality and model performance.</li>
                    <li>Performed exploratory analysis on recognition results and system metrics to identify trends and improve prediction accuracy.</li>
                    <li>Documented experiments and communicated findings to stakeholders, supporting data-driven decision making and deployment planning.</li>
                  </ul>
                </div>

                {/* Internship 2 */}
                <div className="font-mono text-xs relative pl-4 border-l border-text/10">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-accent-orange" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="font-bold text-text">Operations Intern</h4>
                    <span className="text-[10px] text-accent-lime">Jun 2022 — Jul 2022</span>
                  </div>
                  <h5 className="text-[10px] text-text/50 mb-2 font-bold">Expert Callers (ECPL), Bangalore</h5>
                  <ul className="list-disc pl-4 space-y-1.5 text-text/75 text-[11px] leading-relaxed">
                    <li>Partnered with cross-functional operational teams, resolving customer queries and handling service-related issues through structured communication.</li>
                    <li>Maintained accurate records and followed standardized workflows, ensuring data quality and operational consistency in service delivery.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects Overview in Resume */}
            <div className="bg-secondary/35 border border-text/5 rounded-lg p-5 flex flex-col gap-4">
              <h3 className="font-mono text-sm font-bold text-accent-lime border-b border-text/10 pb-2 mb-1 flex items-center gap-2">
                <FileText size={14} className="text-accent-lime" /> [DOCKET_PROJECTS.LOG]
              </h3>
              <div className="space-y-4 font-mono text-xs text-text/75">
                <div>
                  <h4 className="font-bold text-text text-[11px]">1. Streamlit CSV Analysis Dashboard</h4>
                  <p className="text-[10px] mt-1 leading-relaxed">Built an interactive dashboard for Exploratory Data Analysis (EDA) enabling real-time data profiling, missing-value analysis, and Matplotlib/Plotly visual charts.</p>
                </div>
                <div>
                  <h4 className="font-bold text-text text-[11px]">2. Serverless CSV Cleaning Pipeline (AWS)</h4>
                  <p className="text-[10px] mt-1 leading-relaxed">Built an AWS S3 + Lambda based data preprocessing pipeline in Python & Pandas to automate duplicate removal and data standardization workflows.</p>
                </div>
                <div>
                  <h4 className="font-bold text-text text-[11px]">3. NovaFlow (AI Workflows & Analytics) <span className="text-[9px] text-accent-orange font-bold">(In Progress)</span></h4>
                  <p className="text-[10px] mt-1 leading-relaxed">Developed a platform integrating Google Gemini APIs for extracting structured metrics from unstructured communications and built analytics dashboards.</p>
                </div>
                <div>
                  <h4 className="font-bold text-text text-[11px]">4. Retail Insight Sales forecasting</h4>
                  <p className="text-[10px] mt-1 leading-relaxed">Cleaned synthetic sales data with Pandas, built EDA correlation heatmaps, and trained a Scikit-Learn Linear Regression model (R² ≈ 0.87) to forecast monthly demands.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Skills, Education, Certs */}
          <div className="flex flex-col gap-6">
            
            {/* Education Group */}
            <div className="bg-secondary/35 border border-text/5 rounded-lg p-5 flex flex-col gap-4 font-mono text-xs">
              <h3 className="font-bold text-accent-mint border-b border-text/10 pb-2 flex items-center gap-2">
                <GraduationCap size={14} className="text-accent-mint" /> [EDUCATION.DAT]
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-text">M.Sc. in Computer Applications</h4>
                  <p className="text-[10px] text-text/50 mt-0.5">Symbiosis Institute of Computer Studies and Research, Pune</p>
                  <p className="text-[10px] text-accent-lime mt-1 font-bold">2024 — 2026 | Specialization: Data Science</p>
                  <p className="text-[9px] text-accent-mint mt-0.5 font-bold">Score: 8.49 CGPA</p>
                  <p className="text-[9px] text-text/60 mt-1">Modules: Data Visualization, Machine Learning, Cloud Computing, Artificial Intelligence</p>
                </div>
                <div className="border-t border-text/5 pt-3">
                  <h4 className="font-bold text-text">Bachelors in Computer Applications</h4>
                  <p className="text-[10px] text-text/50 mt-0.5">Ebenezer Group of Institutions, Bangalore</p>
                  <p className="text-[10px] text-accent-lime mt-1 font-bold">2021 — 2024</p>
                  <p className="text-[9px] text-accent-mint mt-0.5 font-bold">Score: 8.78 CGPA</p>
                  <p className="text-[9px] text-text/60 mt-1">Modules: Core Computer Science</p>
                </div>
              </div>
            </div>

            {/* Certifications Group */}
            <div className="bg-secondary/35 border border-text/5 rounded-lg p-5 flex flex-col gap-4 font-mono text-xs">
              <h3 className="font-bold text-accent-lime border-b border-text/10 pb-2 flex items-center gap-2">
                <Award size={14} className="text-accent-lime" /> [CERTIFICATIONS.LOG]
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Compass size={12} className="text-accent-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-text text-[11px]">AWS Cloud Essentials</h5>
                    <p className="text-[9px] text-text/40">AWS Training & Certification (Jun 2025)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Compass size={12} className="text-accent-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-text text-[11px]">AWS APAC Solutions Architecture</h5>
                    <p className="text-[9px] text-text/40">Virtual Experience Forage (Jun 2025)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Compass size={12} className="text-accent-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-text text-[11px]">IBM IT Fundamentals</h5>
                    <p className="text-[9px] text-text/40">Credential Verification Program</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Languages Group */}
            <div className="bg-secondary/35 border border-text/5 rounded-lg p-5 flex flex-col gap-2.5 font-mono text-xs">
              <h3 className="font-bold text-text/55 border-b border-text/10 pb-2">
                [LANGUAGES_DECLARED]
              </h3>
              <p className="text-[10px] text-text/75 leading-relaxed">
                English, Hindi, Marathi
              </p>
            </div>

            {/* Core Links Group */}
            <div className="bg-secondary/35 border border-text/5 rounded-lg p-5 flex flex-col gap-3 font-mono text-xs">
              <h3 className="font-bold text-text/55 border-b border-text/10 pb-2">
                [SYSTEM_REFERENCES]
              </h3>
              <a
                href="https://github.com/themanaspwr"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="text-[10px] text-accent-lime hover:underline flex items-center gap-1"
              >
                <span>GITHUB_CONTRIBUTIONS</span>
                <ExternalLink size={10} />
              </a>
              <a
                href="https://linkedin.com/in/themanaspwr"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="text-[10px] text-accent-lime hover:underline flex items-center gap-1"
              >
                <span>LINKEDIN_FOOTPRINT</span>
                <ExternalLink size={10} />
              </a>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
};
