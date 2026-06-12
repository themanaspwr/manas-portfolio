import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogs, type Blog } from '../data/blogs';
import { playClickSound, playHoverSound } from '../components/Header';
import { BookOpen, Search, Calendar, Clock, ArrowLeft, Terminal, Tag, Plus, X, FileCode, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BlogView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  // 1. Session Storage State for Custom Blogs
  const [localBlogs, setLocalBlogs] = useState<Blog[]>(() => {
    const saved = localStorage.getItem('manas-custom-blogs');
    const parsed = saved ? JSON.parse(saved) : [];
    return [...blogs, ...parsed];
  });

  // 2. Editor UI State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorExcerpt, setEditorExcerpt] = useState('');
  const [editorTags, setEditorTags] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorPreviewMode, setEditorPreviewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const activeBlogId = searchParams.get('id');

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!activeBlogId || !articleRef.current) return;
      
      const element = articleRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight === 0) return;

      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeBlogId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = (tag: string | null) => {
    playClickSound();
    setSelectedTag(tag);
  };

  const activeBlog = localBlogs.find((b) => b.id === activeBlogId);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(localBlogs.flatMap((b) => b.tags))
  );

  const filteredBlogs = localBlogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || b.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Handle local session saving
  const handleSaveToSession = () => {
    if (!editorTitle || !editorExcerpt || !editorContent) {
      alert("Validation failed. Title, Excerpt, and Content payloads must be defined.");
      return;
    }

    playClickSound();

    const newBlog: Blog = {
      id: editorTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: editorTitle,
      excerpt: editorExcerpt,
      date: new Date().toISOString().split('T')[0],
      tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean),
      readingTime: `${Math.max(1, Math.ceil(editorContent.length / 800))} min read`,
      content: editorContent,
    };

    const saved = localStorage.getItem('manas-custom-blogs');
    const parsed = saved ? JSON.parse(saved) : [];
    const updated = [...parsed, newBlog];

    localStorage.setItem('manas-custom-blogs', JSON.stringify(updated));
    setLocalBlogs([...blogs, ...updated]);

    // Reset editor
    setEditorTitle('');
    setEditorExcerpt('');
    setEditorTags('');
    setEditorContent('');
    setIsEditorOpen(false);
    alert("LOG TRANSMITTED. Custom post saved to local browser session.");
  };

  // Compile and copy Javascript Node layout
  const handleCopyCodeBlock = () => {
    playClickSound();

    const blogId = editorTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tagArray = editorTags.split(',').map((t) => t.trim()).filter(Boolean);
    const dateStr = new Date().toISOString().split('T')[0];
    const readingTimeStr = `${Math.max(1, Math.ceil(editorContent.length / 800))} min read`;

    const generatedCode = `  {
    id: "${blogId}",
    title: "${editorTitle}",
    excerpt: "${editorExcerpt}",
    date: "${dateStr}",
    tags: ${JSON.stringify(tagArray)},
    readingTime: "${readingTimeStr}",
    content: \`\n${editorContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\n\`
  }`;

    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      {/* Reading Progress Indicator */}
      {activeBlog && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
          <div
            className="h-full bg-accent-lime transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Render Single Blog Post */}
        {activeBlog ? (
          <div ref={articleRef} className="flex flex-col gap-6">
            
            {/* Back button */}
            <div className="flex justify-between items-center border-b border-text/10 pb-4">
              <button
                onClick={() => { setSearchParams({}); playClickSound(); }}
                className="font-mono text-xs text-text/50 hover:text-accent-lime flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft size={13} />
                <span>INDEX_NOTEBOOK</span>
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setIsEditorOpen(true); playClickSound(); }}
                  onMouseEnter={playHoverSound}
                  className="font-mono text-[10px] text-primary bg-accent-lime hover:bg-accent-lime/85 px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-all shadow-md"
                >
                  <Plus size={11} />
                  <span>Share my thoughts</span>
                </button>
                <span className="hidden sm:inline font-mono text-[9px] text-text/30">LOG_READ: {activeBlog.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Notebook margins and binder holes styling */}
            <article className="relative bg-secondary/25 border border-text/10 rounded-lg p-6 sm:p-10 bg-graph-grid-fine theme-transition shadow-md">
              <div className="absolute -left-3 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-6 h-3.5 border-2 border-text bg-secondary rounded-full" />
                ))}
              </div>

              <div className="notebook-margin">
                <div className="flex items-center gap-3 font-mono text-[9px] text-accent-orange mb-3">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {activeBlog.date}</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {activeBlog.readingTime}</span>
                </div>

                <h1 className="font-mono text-xl sm:text-3xl font-bold text-text mb-6 border-b-2 border-dashed border-text/10 pb-3 leading-tight">
                  {activeBlog.title}
                </h1>

                {/* Markdown compiler */}
                <div className="prose prose-invert max-w-none font-mono text-xs text-text/85 leading-relaxed space-y-4 markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <h2 className="text-lg font-bold text-accent-lime border-b border-accent-lime/10 pb-1.5 mt-6 mb-2" {...props} />,
                      h2: ({node, ...props}) => <h3 className="text-sm font-bold text-accent-orange mt-5 mb-1.5" {...props} />,
                      a: ({node, ...props}) => <a className="text-accent-mint hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-primary/80 border border-text/15 rounded p-3 text-[10px] text-accent-mint/90 overflow-x-auto leading-normal my-4" {...props} />,
                      code: ({node, className, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !match ? (
                          <code className="bg-primary/50 text-accent-orange px-1 rounded text-[10px]" {...props} />
                        ) : (
                          <code className="text-accent-mint/95" {...props} />
                        );
                      },
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent-orange/45 pl-3 py-1 italic text-text/60 bg-primary/20 rounded-r my-4" {...props} />,
                    }}
                  >
                    {activeBlog.content}
                  </ReactMarkdown>
                </div>

                {/* Tag footer */}
                <div className="flex gap-2 mt-8 pt-4 border-t border-text/10 flex-wrap">
                  {activeBlog.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[8px] bg-primary/60 border border-text/10 rounded px-1.5 py-0.5 text-text/50 flex items-center gap-1">
                      <Tag size={8} /> #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

          </div>
        ) : (
          /* Render Blog Index Listing */
          <div className="flex flex-col gap-6">
            
            {/* Title */}
            <section className="border-b border-text/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
                  <BookOpen className="text-accent-lime" /> DIGITAL_NOTEBOOK.DAT
                </h2>
                <p className="font-mono text-xs text-text/50 mt-1">
                  A vintage scientific notebook of notes, analytics pipelines, and data investigations.
                </p>
              </div>
              <button
                onClick={() => { setIsEditorOpen(true); playClickSound(); }}
                onMouseEnter={playHoverSound}
                className="font-mono text-[10px] text-primary bg-accent-lime hover:bg-accent-lime/85 px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-all self-start sm:self-auto shadow-md"
              >
                <Plus size={11} />
                <span>Share my thoughts</span>
              </button>
            </section>

            {/* Search and Tags toolbar */}
            <section className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-text/5 pb-4">
              <div className="flex-1 bg-secondary/50 border border-text/10 rounded py-1.5 px-3 flex items-center gap-2 hover:border-accent-lime/30 focus-within:border-accent-lime transition-all max-w-md theme-transition">
                <Search size={14} className="text-text/45" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Query notebooks..."
                  className="bg-transparent border-none outline-none font-mono text-xs text-text placeholder-text/30 flex-1"
                />
              </div>

              {/* Tag filtering pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleTagClick(null)}
                  className={`font-mono text-[9px] px-2 py-1 rounded border transition-all ${
                    !selectedTag
                      ? 'border-accent-lime bg-accent-lime/10 text-accent-lime'
                      : 'border-text/10 text-text/40 hover:border-text/20'
                  }`}
                >
                  [ALL]
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`font-mono text-[9px] px-2 py-1 rounded border transition-all ${
                      selectedTag === tag
                        ? 'border-accent-lime bg-accent-lime/10 text-accent-lime'
                        : 'border-text/10 text-text/40 hover:border-text/20'
                    }`}
                  >
                    [#{tag}]
                  </button>
                ))}
              </div>
            </section>

            {/* List details */}
            <section className="flex flex-col gap-4">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-5 bg-secondary/35 border border-text/5 hover:border-accent-lime/35 rounded-lg transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-text/40 mb-2">
                    <span className="flex items-center gap-1 text-accent-orange font-bold"><Calendar size={9} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={9} /> {blog.readingTime}</span>
                  </div>

                  <h3 className="font-mono text-base font-bold text-text hover:text-accent-lime mb-2 transition-all">
                    <Link to={`/blog?id=${blog.id}`} onClick={playClickSound} onMouseEnter={playHoverSound}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="font-mono text-[10px] text-text/60 leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-text/5 pt-3 mt-1">
                    {/* Tag list */}
                    <div className="flex gap-1.5">
                      {blog.tags.map((t) => (
                        <span key={t} className="font-mono text-[8px] border border-text/10 bg-primary/45 px-1.5 rounded text-text/40">
                          #{t}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      to={`/blog?id=${blog.id}`}
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="font-mono text-[9px] text-primary bg-accent-lime hover:bg-accent-lime/85 px-3 py-1.5 rounded font-bold flex items-center gap-1 transition-all shadow-sm"
                    >
                      <span>READ_POST</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}

              {filteredBlogs.length === 0 && (
                <div className="p-16 text-center font-mono text-xs text-text/30 border border-dashed border-text/10 rounded">
                  <Terminal size={24} className="mx-auto mb-2 text-text/25 animate-pulse" />
                  NO DIGITAL NOTEBOOKS CORRELATING TO QUERY
                </div>
              )}
            </section>

          </div>
        )}
      </div>

      {/* 3. Scientific Markdown Notebook Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="absolute inset-0 bg-primary/90 backdrop-blur-sm"
            />

            {/* Large layout box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-5xl h-[90vh] bg-secondary border border-accent-lime/30 rounded-lg shadow-2xl overflow-hidden flex flex-col theme-transition"
            >
              {/* Header Title bar */}
              <div className="flex items-center justify-between border-b border-text/10 px-4 py-3 bg-primary/40">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-lime">
                  <Terminal size={14} />
                  <span>THOUGHTS_COMPILER.EXE</span>
                </div>

                {/* Mobile/Desktop layout switch buttons */}
                <div className="hidden sm:flex gap-1 border border-text/10 rounded p-0.5">
                  {(['edit', 'split', 'preview'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => { setEditorPreviewMode(mode); playClickSound(); }}
                      className={`font-mono text-[9px] px-2 py-0.5 rounded transition-all ${
                        editorPreviewMode === mode
                          ? 'bg-accent-lime/10 text-accent-lime font-bold'
                          : 'text-text/45 hover:text-text'
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setIsEditorOpen(false); playClickSound(); }}
                  onMouseEnter={playHoverSound}
                  className="p-1 border border-text/10 rounded hover:border-accent-orange text-text/40 hover:text-accent-orange transition-all"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Editor Workspace split layout */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                
                {/* Panel A: Markdown Input Fields */}
                <div 
                  className={`flex-1 overflow-y-auto p-4 border-r border-text/10 flex flex-col gap-3.5 ${
                    editorPreviewMode === 'preview' ? 'hidden' : 'block'
                  }`}
                >
                  {/* Title Input */}
                  <div className="flex flex-col gap-1 font-mono text-[10px]">
                    <label className="text-text/50">THOUGHT_TITLE:</label>
                    <input
                      type="text"
                      value={editorTitle}
                      onChange={(e) => setEditorTitle(e.target.value)}
                      placeholder="e.g. Exploratory Data Profiling in Python"
                      className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all"
                    />
                  </div>

                  {/* Excerpt Input */}
                  <div className="flex flex-col gap-1 font-mono text-[10px]">
                    <label className="text-text/50">SHORT_EXCERPT:</label>
                    <input
                      type="text"
                      value={editorExcerpt}
                      onChange={(e) => setEditorExcerpt(e.target.value)}
                      placeholder="Short summarizing snippet of the analytics details..."
                      className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all"
                    />
                  </div>

                  {/* Tags Input */}
                  <div className="flex flex-col gap-1 font-mono text-[10px]">
                    <label className="text-text/50">TAGS_CSV (COMMA_SEPARATED):</label>
                    <input
                      type="text"
                      value={editorTags}
                      onChange={(e) => setEditorTags(e.target.value)}
                      placeholder="e.g. Python, Streamlit, EDA"
                      className="bg-primary border border-text/10 rounded py-2 px-3 text-text text-xs focus:outline-none focus:border-accent-lime transition-all"
                    />
                  </div>

                  {/* Content Markdown Area */}
                  <div className="flex-1 flex flex-col gap-1 font-mono text-[10px]">
                    <label className="text-text/50">MARKDOWN_PAYLOAD_BODY:</label>
                    <textarea
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      placeholder="# Your thought headers\nWrite markdown details here...\n\nUse standard headers, bold, list ticks, or code blocks."
                      className="flex-1 bg-primary border border-text/10 rounded py-2.5 px-3 text-text text-xs font-mono focus:outline-none focus:border-accent-lime transition-all resize-none min-h-[180px]"
                    />
                  </div>
                </div>

                {/* Panel B: Live Preview Output */}
                <div 
                  className={`flex-1 overflow-y-auto p-6 bg-graph-grid-fine relative ${
                    editorPreviewMode === 'edit' ? 'hidden' : 'block'
                  }`}
                >
                  {/* Spiral rings illustration */}
                  <div className="absolute -left-3 top-6 bottom-6 flex flex-col justify-between pointer-events-none opacity-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-5 h-3 border-2 border-text bg-secondary rounded-full" />
                    ))}
                  </div>

                  <div className="notebook-margin">
                    {/* Header preview data */}
                    <div className="flex items-center gap-2 font-mono text-[8px] text-accent-orange mb-2">
                      <span className="flex items-center gap-0.5"><Calendar size={9} /> {new Date().toISOString().split('T')[0]}</span>
                      <span>|</span>
                      <span className="flex items-center gap-0.5"><Clock size={9} /> {Math.max(1, Math.ceil(editorContent.length / 800))} min read</span>
                    </div>

                    <h1 className="font-mono text-base sm:text-xl font-bold text-text mb-4 border-b border-dashed border-text/10 pb-2">
                      {editorTitle || "Awaiting Thought Title..."}
                    </h1>

                    {/* Markdown rendering preview */}
                    <div className="prose prose-invert max-w-none font-mono text-[10px] text-text/80 space-y-3 leading-relaxed markdown-body">
                      {editorContent ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({node, ...props}) => <h2 className="text-xs font-bold text-accent-lime border-b border-accent-lime/10 pb-1 mt-4 mb-1" {...props} />,
                            h2: ({node, ...props}) => <h3 className="text-[10px] font-bold text-accent-orange mt-3 mb-1" {...props} />,
                            a: ({node, ...props}) => <a className="text-accent-mint hover:underline" {...props} />,
                            pre: ({node, ...props}) => <pre className="bg-primary/70 border border-text/10 rounded p-2 text-[9px] text-accent-mint/90 overflow-x-auto leading-normal my-2" {...props} />,
                            code: ({node, className, ...props}) => {
                              const match = /language-(\w+)/.exec(className || '');
                              return !match ? (
                                <code className="bg-primary/50 text-accent-orange px-1 rounded text-[9px]" {...props} />
                              ) : (
                                <code className="text-accent-mint/95" {...props} />
                              );
                            },
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent-orange/45 pl-2 py-0.5 italic text-text/60 bg-primary/20 rounded-r my-2" {...props} />,
                          }}
                        >
                          {editorContent}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-text/30 italic">Start compiling markdown content to preview live notebook rendering.</p>
                      )}
                    </div>

                    {/* Tags preview */}
                    {editorTags && (
                      <div className="flex gap-1.5 mt-6 pt-3 border-t border-text/10 flex-wrap">
                        {editorTags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                          <span key={tag} className="font-mono text-[8px] bg-primary/60 border border-text/10 rounded px-1.5 py-0.2 text-text/40">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Footer Control Actions */}
              <div className="border-t border-text/10 px-4 py-3 bg-primary/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[9px]">
                <div className="text-text/45">
                  ID: {editorTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'N/A'}
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy code block */}
                  <button
                    onClick={handleCopyCodeBlock}
                    disabled={!editorTitle}
                    className="px-3 py-1.5 border border-text/25 rounded hover:border-accent-lime text-text/75 hover:text-accent-lime flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:hover:text-text/75 disabled:cursor-not-allowed"
                  >
                    {copyFeedback ? <Check size={11} className="text-accent-mint" /> : <FileCode size={11} />}
                    <span>{copyFeedback ? 'BLOCK_COPIED!' : 'COPY_JS_OBJECT'}</span>
                  </button>

                  {/* Save to session */}
                  <button
                    onClick={handleSaveToSession}
                    className="px-4 py-1.5 bg-accent-lime hover:bg-accent-lime/85 text-primary rounded font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Plus size={11} />
                    <span>SAVE_TO_SESSION()</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
