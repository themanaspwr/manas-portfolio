import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Award, Compass, Clock, ShieldCheck, ArrowRight, BookOpen, Terminal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { quotes } from '../data/quotes';
import { playClickSound, playHoverSound } from '../components/Header';

export const Home: React.FC = () => {
  const [subtitle, setSubtitle] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visitorCount, setVisitorCount] = useState(1337);

  const roles = [
    "Master's Student",
    "Cloud & DevOps Enthusiast",
    "Project Builder",
    "Technology Explorer"
  ];

  // Typing effect for roles
  useEffect(() => {
    let currentRole = roles[roleIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer: number;

    const tick = () => {
      if (!isDeleting) {
        setSubtitle(currentRole.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timer = setTimeout(tick, 3000); // Hold role
        } else {
          timer = setTimeout(tick, 60);
        }
      } else {
        setSubtitle(currentRole.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 30);
        }
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  // UTC clock update
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const dateStr = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
      const timeStr = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
      setCurrentTime(`${dateStr} ${timeStr} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quotes ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Visitor increment simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + (Math.random() > 0.9 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full min-h-screen pt-32 pb-24 px-4 md:px-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-5xl flex flex-col gap-16">
        
        {/* Row 1: Hero Section & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Authentic Ambitious Hero */}
          <section className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              
              {/* Profile Image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden border border-text/10 bg-secondary/50 flex-shrink-0 shadow-lg"
              >
                <img src="/pfp.png" alt="Manas Pawar" className="w-full h-full object-cover" style={{ objectPosition: '65% 12%' }} />
                <div className="absolute inset-0 border border-accent-lime/20 rounded-xl pointer-events-none" />
              </motion.div>

              {/* Text metadata */}
              <div className="flex-1 flex flex-col gap-4 text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center sm:justify-start gap-2"
                >
                  <span className="text-[10px] text-accent-lime bg-accent-lime/10 px-2.5 py-0.5 rounded-full border border-accent-lime/20 font-mono tracking-wider font-semibold">
                    BUILDER.JOURNAL_LOG
                  </span>
                </motion.div>

                <div className="flex flex-col gap-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text leading-[1.1] uppercase font-heading"
                  >
                    Drafting systems.<br />Learning through building.
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-8 flex items-center justify-center sm:justify-start"
                  >
                    <p className="text-lg sm:text-xl font-semibold text-accent-lime flex items-center font-mono">
                      {subtitle}
                      <span className="animate-pulse ml-1 text-accent-lime">|</span>
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text/75 text-sm sm:text-base leading-relaxed max-w-xl"
            >
              I am a Master's student who enjoys learning through hands-on projects and experimenting with technologies like AWS, Terraform, Kubernetes, Python, and Data Science tools. I treat code systems like mechanical blueprints, documenting my experiments and failures to continuously grow as an engineer. I am actively seeking internship opportunities or entry-level roles in the fields of Data Science and Data Analysis to collaborate with engineering teams and solve real-world problems.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 mt-2"
            >
              <Link
                to="/projects"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="px-5 py-2.5 bg-accent-lime hover:bg-accent-lime/90 text-primary font-semibold text-xs rounded shadow transition-all flex items-center gap-1.5"
              >
                <Cpu size={14} />
                <span>Explore Projects</span>
              </Link>


              <Link
                to="/resume"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="ml-2 text-xs text-text/50 hover:text-accent-lime transition-all flex items-center gap-1 font-mono"
              >
                <span>View Resume</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </section>

          {/* Right Side: Professional Quant Metrics Widget Card */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary/35 border border-text/10 rounded-lg p-6 flex flex-col gap-5 theme-transition shadow-xl"
            >
              {/* Header metadata */}
              <div className="flex items-center justify-between border-b border-text/10 pb-3 font-mono text-[9px] text-text/45">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} className="text-accent-lime" /> {currentTime}
                </span>
                <span>VISIT_ID: #{visitorCount}</span>
              </div>

              {/* Academic Credentials Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold text-accent-lime font-mono tracking-widest flex items-center gap-1">
                  <Award size={12} /> ACADEMIC_CREDENTIALS
                </h3>

                <div className="flex flex-col gap-3">
                  {/* MSc */}
                  <div className="p-3 border border-text/5 bg-primary/25 rounded relative hover:border-accent-lime/10 transition-all">
                    <div className="absolute right-3 top-3">
                      <span className="text-[8px] bg-accent-lime/10 text-accent-lime px-1.5 py-0.5 rounded font-mono font-bold">8.49 CGPA</span>
                    </div>
                    <h4 className="font-semibold text-text text-xs pr-16 leading-tight">M.Sc. Computer Applications</h4>
                    <p className="text-[9px] text-accent-lime font-medium mt-0.5 font-mono">Specialization: Data Science</p>
                    <p className="text-[9px] text-text/40 mt-1">Symbiosis International University (2024 - 2026)</p>
                  </div>

                  {/* BCA */}
                  <div className="p-3 border border-text/5 bg-primary/25 rounded relative hover:border-accent-lime/10 transition-all">
                    <div className="absolute right-3 top-3">
                      <span className="text-[8px] bg-accent-lime/10 text-accent-lime px-1.5 py-0.5 rounded font-mono font-bold">8.78 CGPA</span>
                    </div>
                    <h4 className="font-semibold text-text text-xs pr-16 leading-tight">BCA (Computer Applications)</h4>
                    <p className="text-[9px] text-text/40 mt-1.5">Ebenezer Group of Institutions, Bangalore (2021 - 2024)</p>
                  </div>
                </div>
              </div>

              {/* Rotating Quotes Ticker Panel */}
              <div className="border-t border-text/10 pt-4 mt-1 flex flex-col gap-2 font-mono">
                <div className="flex items-center justify-between text-[8px] text-text/30">
                  <span>JOURNAL_THOUGHT_TICKER</span>
                  <span className="flex items-center gap-1 text-accent-mint"><ShieldCheck size={9} /> SYSTEM_ONLINE</span>
                </div>
                <div className="min-h-[48px] bg-primary/30 rounded p-2.5 border border-text/5 flex items-center">
                  <p className="text-[10px] text-text/75 italic leading-normal">
                    "{quotes[quoteIndex].text}" — {quotes[quoteIndex].author}
                  </p>
                </div>
              </div>

            </motion.div>
          </section>

        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-text/10" />

        {/* Row 2: Currently Building & Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured Spotlight: Active Learning & Focus (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-secondary/35 border border-text/10 rounded-lg p-6 flex flex-col justify-between h-full bg-graph-grid theme-transition shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen size={160} />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-text/10 pb-3">
                  <span className="font-mono text-[9px] text-accent-lime bg-accent-lime/10 px-2 py-0.5 rounded-full border border-accent-lime/20 font-semibold flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                    Active Learning Focus
                  </span>
                  <span className="font-mono text-[8px] text-text/30">MODULE_ID: EDU_TRACKER</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-text uppercase font-heading tracking-tight mb-2">
                  Learning & Growth Tracker
                </h2>
                
                <p className="text-xs text-text/75 leading-relaxed mb-6 max-w-xl">
                  A visual overview of the systems, protocols, and data frameworks I am actively studying and applying to build hands-on prototypes.
                </p>

                {/* Progress bars of active focus */}
                <div className="flex flex-col gap-4 mb-6 max-w-xl">
                  {[
                    { name: 'AWS Cloud Engineering & Architecture', desc: 'Deploying multi-tier networks, IAM structures, and serverless stacks.', progress: 62 },
                    { name: 'Kubernetes & Container Orchestration', desc: 'Understanding cluster networks, persistent volumes, and deployment YAMLs.', progress: 48 },
                    { name: 'Data Science & Machine Learning Pipelines', desc: 'Structuring data cleansing pipelines, exploratory data analysis, and predictive models.', progress: 78 },
                    { name: 'SQL & Query Optimization', desc: 'Writing complex queries, index optimizations, and relational database designs.', progress: 72 },
                    { name: 'Business Analysis & Requirement Engineering', desc: 'Studying user stories, process modeling (BPMN), and requirement gathering techniques.', progress: 15 }
                  ].map((item) => (
                    <div key={item.name} className="flex flex-col gap-1.5 font-mono text-[9px]">
                      <div className="flex justify-between items-end gap-2">
                        <div className="flex flex-col">
                          <span className="font-semibold text-text leading-tight">{item.name}</span>
                          <span className="text-text/40 font-sans mt-0.5 leading-normal">{item.desc}</span>
                        </div>
                        <span className="text-accent-lime font-bold whitespace-nowrap">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-primary/40 rounded overflow-hidden border border-text/5">
                        <div className="h-full bg-accent-lime rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="border-t border-text/10 pt-4 mt-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-text/45 uppercase">Seeking Roles: Data Science / Analysis</span>
                  <Link
                    to="/journey"
                    className="font-mono text-[9px] text-accent-lime hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>View Education Logs</span>
                    <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Explore The Journal Previews (5 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-secondary/35 border border-text/10 rounded-lg p-6 flex flex-col justify-between h-full theme-transition shadow-lg">
              <div>
                <div className="border-b border-text/10 pb-3 mb-4">
                  <span className="font-mono text-[9px] text-text/45 uppercase tracking-widest block font-bold">
                    [EXPLORE.JOURNAL_MAP]
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { title: "Projects Laboratory", desc: "Hands-on cloud & data science repository files.", path: "/projects", icon: Cpu },
                    { title: "Tech Arsenal", desc: "Skills, tools & proficiency across all domains.", path: "/experiments", icon: Compass },
                    { title: "Digital Notebook Blog", desc: "Deep-dives and discoveries cataloged weekly.", path: "/blog", icon: BookOpen },
                    { title: "Learning Journals", desc: "Under-the-hood logs of tools & engineering growth.", path: "/build-logs", icon: Terminal }
                  ].map((sec) => (
                    <Link
                      key={sec.title}
                      to={sec.path}
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="p-3 border border-text/5 bg-primary/25 rounded flex items-center justify-between hover:border-accent-lime/20 hover:bg-primary/45 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-secondary text-text/60 group-hover:text-accent-lime transition-colors">
                          <sec.icon size={13} />
                        </div>
                        <div className="text-left flex flex-col">
                          <span className="font-sans text-[11px] font-bold text-text group-hover:text-accent-lime transition-colors">
                            {sec.title}
                          </span>
                          <span className="font-sans text-[9px] text-text/40">
                            {sec.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={12} className="text-text/30 group-hover:text-accent-lime group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-text/5 pt-4 mt-4 text-left">
                <p className="font-mono text-[9px] text-text/35 leading-relaxed">
                  "I document what I build and share what I discover, measuring progress through functional code and persistent growth."
                </p>
              </div>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
};

export default Home;

