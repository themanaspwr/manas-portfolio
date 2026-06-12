import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, playHoverSound } from '../components/Header';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 1–5
  label: string; // e.g. "Proficient"
  notes: string;
  projects: string[];
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: 'datascience',
    title: 'Data Science & Analysis',
    icon: '📊',
    color: 'accent-lime',
    skills: [
      { name: 'Python', level: 3, label: 'Intermediate', notes: 'Core language for data wrangling, EDA, and ML pipelines using Pandas, NumPy, Scikit-Learn.', projects: ['Retail Sales Dashboard', 'Serverless CSV Pipeline', 'Streamlit App'] },
      { name: 'Pandas', level: 3, label: 'Intermediate', notes: 'Primary tool for data manipulation — missing values, deduplication, filtering, normalization.', projects: ['Retail Sales Dashboard', 'CSV Cleaning Pipeline'] },
      { name: 'NumPy', level: 3, label: 'Intermediate', notes: 'Vectorized array operations and multi-dimensional matrix computations in preprocessing flows.', projects: ['Retail Sales Dashboard'] },
      { name: 'Scikit-Learn', level: 3, label: 'Intermediate', notes: 'Regression & classification models, train/test splits, R² and RMSE metric evaluations.', projects: ['Retail Sales Dashboard'] },
      { name: 'Matplotlib / Seaborn', level: 3, label: 'Intermediate', notes: 'Line charts, scatter plots, heatmaps and statistical visualizations for exploratory analysis.', projects: ['Retail Sales Dashboard', 'Streamlit App'] },
      { name: 'Power BI', level: 3, label: 'Intermediate', notes: 'Business intelligence dashboards, KPI tracking, and cross-functional report building.', projects: ['BI Dashboard Projects'] },
    ],
  },
  {
    id: 'languages',
    title: 'Languages & Databases',
    icon: '💻',
    color: 'accent-orange',
    skills: [
      { name: 'SQL', level: 3, label: 'Intermediate', notes: 'Complex queries, joins, aggregations, and index optimization for relational databases.', projects: ['Retail Sales Dashboard'] },
      { name: 'JavaScript / TypeScript', level: 2, label: 'Familiar', notes: 'Frontend scripting and type-safe React component development.', projects: ['This Portfolio'] },
      { name: 'HTML / CSS', level: 3, label: 'Intermediate', notes: 'Semantic markup and responsive styling for web interfaces.', projects: ['This Portfolio'] },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: '☁️',
    color: 'accent-mint',
    skills: [
      { name: 'AWS (S3, Lambda, EC2, IAM)', level: 2, label: 'Familiar', notes: 'Deploying serverless event-driven pipelines, managing IAM roles, and S3 bucket configurations.', projects: ['Serverless CSV Pipeline'] },
      { name: 'Docker', level: 2, label: 'Familiar', notes: 'Containerizing services, managing layers, and running local microservice stacks.', projects: ['Personal Lab Projects'] },
      { name: 'Git / GitHub', level: 4, label: 'Proficient', notes: 'Version control, branching, pull requests, and repository management across all projects.', projects: ['All Repositories'] },
    ],
  },
  {
    id: 'genai',
    title: 'AI & Emerging Tech',
    icon: '🤖',
    color: 'accent-lime',
    skills: [
      { name: 'GenAI & LLMs (Gemini API)', level: 3, label: 'Intermediate', notes: 'Prompt engineering, few-shot prompting, and integrating Gemini APIs for structured insights from raw data.', projects: ['NovaFlow AI Analytics'] },
      { name: 'Streamlit', level: 3, label: 'Intermediate', notes: 'Building interactive Python dashboards with live filters, charts and file upload UIs.', projects: ['Streamlit CSV Dashboard'] },
    ],
  },
];

const levelLabels = ['', 'Beginner', 'Familiar', 'Intermediate', 'Proficient', 'Advanced'];
const levelColor = (l: number) => {
  if (l >= 4) return 'text-accent-lime border-accent-lime/40 bg-accent-lime/10';
  if (l === 3) return 'text-accent-orange border-accent-orange/40 bg-accent-orange/10';
  return 'text-text/50 border-text/15 bg-primary/30';
};

export const SkillsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const displayedCategories = activeCategory === 'all'
    ? categories
    : categories.filter(c => c.id === activeCategory);

  const totalSkills = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <main className="w-full min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">

        {/* Header */}
        <section className="border-b border-text/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
              <Layers className="text-accent-lime" /> TECH_ARSENAL.DAT
            </h2>
            <p className="font-mono text-xs text-text/50 mt-1">
              {totalSkills} skills indexed across {categories.length} domains. Click any skill to expand details.
            </p>
          </div>
          {/* Stats strip */}
          <div className="flex items-center gap-4 font-mono text-[9px] text-text/40">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-lime inline-block" /> Proficient</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-orange inline-block" /> Intermediate</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-text/30 inline-block" /> Familiar</span>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveCategory('all'); playClickSound(); }}
            onMouseEnter={playHoverSound}
            className={`font-mono text-[9px] px-3 py-1.5 rounded border transition-all ${
              activeCategory === 'all'
                ? 'border-accent-lime bg-accent-lime/10 text-accent-lime font-bold'
                : 'border-text/10 text-text/40 hover:border-text/30 hover:text-text'
            }`}
          >
            [ALL]
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); playClickSound(); }}
              onMouseEnter={playHoverSound}
              className={`font-mono text-[9px] px-3 py-1.5 rounded border transition-all ${
                activeCategory === cat.id
                  ? 'border-accent-lime bg-accent-lime/10 text-accent-lime font-bold'
                  : 'border-text/10 text-text/40 hover:border-text/30 hover:text-text'
              }`}
            >
              {cat.icon} {cat.title.split(' ')[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skill Categories */}
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((cat, ci) => (
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: ci * 0.05 }}
              className="flex flex-col gap-3"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 border-b border-text/10 pb-2">
                <span className="text-base">{cat.icon}</span>
                <h3 className="font-mono text-xs font-bold text-text tracking-wider uppercase">{cat.title}</h3>
                <span className="font-mono text-[8px] text-text/30 ml-auto">{cat.skills.length} skills</span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cat.skills.map((skill) => {
                  const key = `${cat.id}-${skill.name}`;
                  const isExpanded = expandedSkill === key;
                  const barWidth = (skill.level / 5) * 100;

                  return (
                    <motion.div
                      key={key}
                      layout
                      onClick={() => { setExpandedSkill(isExpanded ? null : key); playClickSound(); }}
                      onMouseEnter={playHoverSound}
                      className={`bg-secondary/35 border rounded-lg p-4 cursor-pointer transition-all select-none ${
                        isExpanded
                          ? 'border-accent-lime/30 bg-secondary/55 shadow-lg col-span-1 sm:col-span-2'
                          : 'border-text/5 hover:border-accent-lime/20 hover:bg-secondary/50'
                      }`}
                    >
                      {/* Skill row */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-xs font-bold text-text truncate">{skill.name}</span>
                          <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded border flex-shrink-0 ${levelColor(skill.level)}`}>
                            {levelLabels[skill.level]}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-mono text-[9px] text-text/40">{skill.level}/5</span>
                          {isExpanded ? <ChevronUp size={12} className="text-text/40" /> : <ChevronDown size={12} className="text-text/40" />}
                        </div>
                      </div>

                      {/* Proficiency bar */}
                      <div className="w-full h-1 bg-primary/50 rounded overflow-hidden border border-text/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-full rounded-full ${skill.level >= 4 ? 'bg-accent-lime' : skill.level === 3 ? 'bg-accent-orange' : 'bg-text/30'}`}
                        />
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-3 border-t border-text/10 flex flex-col gap-3">
                              <p className="font-mono text-[10px] text-text/70 leading-relaxed">
                                {skill.notes}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                <span className="font-mono text-[8px] text-text/35 mr-1">Used in:</span>
                                {skill.projects.map(p => (
                                  <span key={p} className="font-mono text-[8px] bg-accent-lime/10 border border-accent-lime/20 text-accent-lime px-1.5 py-0.5 rounded">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

      </div>
    </main>
  );
};

export default SkillsView;
