import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../lib/supabase';
import { playClickSound, playHoverSound } from '../components/Header';
import { BookOpen, Search, Calendar, Clock, ArrowLeft, Terminal, Tag } from 'lucide-react';
import { motion as _motion } from 'framer-motion';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  reading_time: string;
  date: string;
  published: boolean;
}

export const BlogView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

  const activeBlogId = searchParams.get('id');

  // Fetch published posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      setAllBlogs((data as Blog[]) || []);
    };
    fetchPosts();
  }, []);

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

  const activeBlog = allBlogs.find((b) => b.id === activeBlogId);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(allBlogs.flatMap((b) => b.tags || []))
  );

  const filteredBlogs = allBlogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || (b.tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });


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
              <span className="hidden sm:inline font-mono text-[9px] text-text/30">LOG_READ: {activeBlog.slug?.toUpperCase()}</span>
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
                  <span className="flex items-center gap-1"><Clock size={10} /> {activeBlog.reading_time}</span>
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
                    <span className="flex items-center gap-1"><Clock size={9} /> {blog.reading_time}</span>
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

    </main>
  );
};
