import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, type Post } from '../lib/supabase';
import { Lock, PenLine, Send, Trash2, Eye, EyeOff, Plus, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const AdminView: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [view, setView] = useState<'list' | 'write'>('list');
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', tags: '', reading_time: '', published: false,
  });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPwInput('');
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data as Post[]);
  };

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast('Title and content are required.', 'error');
      return;
    }
    setSaving(true);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const payload = {
      title: form.title.trim(),
      slug: slugify(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      reading_time: form.reading_time.trim() || '3 min read',
      date: dateStr,
      published: publish,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from('posts').update(payload).eq('id', editId));
    } else {
      ({ error } = await supabase.from('posts').insert(payload));
    }

    setSaving(false);
    if (error) {
      showToast('Error saving post: ' + error.message, 'error');
    } else {
      showToast(publish ? 'Post published!' : 'Draft saved!', 'success');
      setForm({ title: '', excerpt: '', content: '', tags: '', reading_time: '', published: false });
      setEditId(null);
      setView('list');
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) showToast('Delete failed.', 'error');
    else { showToast('Post deleted.', 'success'); fetchPosts(); }
  };

  const handleEdit = (post: Post) => {
    setForm({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: (post.tags || []).join(', '),
      reading_time: post.reading_time || '',
      published: post.published,
    });
    setEditId(post.id);
    setView('write');
  };

  const handleTogglePublish = async (post: Post) => {
    await supabase.from('posts').update({ published: !post.published }).eq('id', post.id);
    fetchPosts();
  };

  // --- Password Gate ---
  if (!authed) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-secondary/45 border border-text/10 rounded-xl p-8 flex flex-col gap-5 font-mono"
        >
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-accent-lime" />
            <h2 className="text-sm font-bold text-text tracking-widest">ADMIN_ACCESS.EXE</h2>
          </div>
          <p className="text-[10px] text-text/40">Enter password to unlock the editor.</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(false); }}
              placeholder="Enter password..."
              autoFocus
              className={`bg-primary border rounded py-2.5 px-3 text-xs text-text focus:outline-none transition-all ${
                pwError ? 'border-red-500' : 'border-text/10 focus:border-accent-lime'
              }`}
            />
            {pwError && <p className="text-[9px] text-red-400">Incorrect password.</p>}
            <button
              type="submit"
              className="bg-accent-lime text-primary font-bold text-xs py-2.5 rounded hover:bg-accent-lime/85 transition-all"
            >
              UNLOCK →
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  // --- Admin Panel ---
  return (
    <main className="w-full min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs shadow-lg ${
              toast.type === 'success' ? 'bg-accent-lime text-primary' : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Header */}
        <section className="border-b border-text/10 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-xl font-bold text-text flex items-center gap-2">
              <PenLine className="text-accent-lime" size={20} /> BLOG_ADMIN.DAT
            </h2>
            <p className="font-mono text-[10px] text-text/40 mt-1">Write, edit, and publish posts.</p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="font-mono text-[9px] text-text/30 hover:text-red-400 flex items-center gap-1 transition-all"
          >
            <LogOut size={11} /> LOGOUT
          </button>
        </section>

        {/* Tab switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => { setView('list'); setEditId(null); setForm({ title: '', excerpt: '', content: '', tags: '', reading_time: '', published: false }); }}
            className={`font-mono text-[9px] px-3 py-1.5 rounded border transition-all ${
              view === 'list' ? 'border-accent-lime bg-accent-lime/10 text-accent-lime' : 'border-text/10 text-text/40 hover:border-text/30'
            }`}
          >
            [ALL POSTS]
          </button>
          <button
            onClick={() => setView('write')}
            className={`font-mono text-[9px] px-3 py-1.5 rounded border transition-all flex items-center gap-1 ${
              view === 'write' ? 'border-accent-lime bg-accent-lime/10 text-accent-lime' : 'border-text/10 text-text/40 hover:border-text/30'
            }`}
          >
            <Plus size={10} /> {editId ? '[EDIT POST]' : '[NEW POST]'}
          </button>
        </div>

        {/* List View */}
        {view === 'list' && (
          <div className="flex flex-col gap-3">
            {posts.length === 0 && (
              <p className="font-mono text-[10px] text-text/30 text-center py-12">No posts yet. Write your first one!</p>
            )}
            {posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-secondary/35 border border-text/5 rounded-lg p-4 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs font-bold text-text truncate">{post.title}</p>
                  <p className="font-mono text-[9px] text-text/35 mt-0.5">{post.date} · {post.reading_time}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className={`font-mono text-[8px] px-2 py-1 rounded border transition-all flex items-center gap-1 ${
                      post.published
                        ? 'border-accent-lime/30 text-accent-lime bg-accent-lime/10'
                        : 'border-text/10 text-text/30'
                    }`}
                  >
                    {post.published ? <Eye size={9} /> : <EyeOff size={9} />}
                    {post.published ? 'Live' : 'Draft'}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="font-mono text-[8px] px-2 py-1 rounded border border-text/10 text-text/40 hover:border-accent-lime/30 hover:text-accent-lime transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-text/20 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Write View */}
        {view === 'write' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 bg-secondary/35 border border-text/10 rounded-xl p-6"
          >
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-text/40">TITLE *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Post title..."
                className="bg-primary border border-text/10 rounded py-2.5 px-3 text-sm text-text focus:outline-none focus:border-accent-lime transition-all font-mono"
              />
            </div>

            {/* Excerpt */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-text/40">EXCERPT (short summary)</label>
              <input
                type="text"
                value={form.excerpt}
                onChange={e => setForm({ ...form, excerpt: e.target.value })}
                placeholder="One-line summary shown on blog page..."
                className="bg-primary border border-text/10 rounded py-2.5 px-3 text-xs text-text focus:outline-none focus:border-accent-lime transition-all font-mono"
              />
            </div>

            {/* Tags & Reading time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] text-text/40">TAGS (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                  placeholder="e.g. Python, Data Science"
                  className="bg-primary border border-text/10 rounded py-2.5 px-3 text-xs text-text focus:outline-none focus:border-accent-lime transition-all font-mono"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] text-text/40">READING TIME</label>
                <input
                  type="text"
                  value={form.reading_time}
                  onChange={e => setForm({ ...form, reading_time: e.target.value })}
                  placeholder="e.g. 4 min read"
                  className="bg-primary border border-text/10 rounded py-2.5 px-3 text-xs text-text focus:outline-none focus:border-accent-lime transition-all font-mono"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-text/40">CONTENT * (plain text or markdown)</label>
              <textarea
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Write your post here..."
                rows={16}
                className="bg-primary border border-text/10 rounded py-3 px-3 text-xs text-text focus:outline-none focus:border-accent-lime transition-all resize-y font-mono leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="font-mono text-[10px] px-4 py-2.5 border border-text/15 text-text/60 hover:border-accent-lime/30 hover:text-text rounded transition-all"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="font-mono text-[10px] px-5 py-2.5 bg-accent-lime text-primary font-bold rounded hover:bg-accent-lime/85 transition-all flex items-center gap-1.5 shadow-md"
              >
                <Send size={11} />
                {saving ? 'Publishing...' : 'Publish Now'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default AdminView;
