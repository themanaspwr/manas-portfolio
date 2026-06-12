export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export const blogs: Blog[] = [
  {
    id: "keyboard-shortcuts",
    title: "The Mouse-Free Developer: Transitioning Away from the Mouse",
    excerpt: "My experience and favorite keyboard shortcuts in VS Code, terminal, and browser to keep my hands on the keyboard and maintain flow state.",
    date: "2026-05-12",
    tags: ["Productivity", "Workflow", "IDE"],
    readingTime: "3 min read",
    content: `
# The Mouse-Free Developer: Keyboard Shortcuts

Reaching for the mouse might only take a second, but doing it hundreds of times a day breaks cognitive flow. Over the past few months, I've made a conscious effort to navigate my development environment using only my keyboard.

Here are the high-impact shortcuts that have made the biggest difference in my daily building.

## VS Code Navigation

Instead of clicking through the file explorer sidebar, I use these to move around:
* **Ctrl + P**: Quick Open. Type a filename to jump straight to it.
* **Ctrl + \`**: Toggle integrated terminal focus.
* **Alt + ↑ / ↓**: Move the current line of code up or down.
* **Ctrl + Shift + L**: Select all occurrences of the current selection for batch editing.
* **Ctrl + B**: Toggle the sidebar explorer to maximize screen space.

## Browser Navigation

For previewing web apps and researching documentation, these extensions and hotkeys are key:
* **Ctrl + L**: Focus the URL bar instantly.
* **Ctrl + T / W**: Open / close browser tabs.
* **Ctrl + Tab**: Cycle through open tabs.
* **Vimium Extension**: A browser extension that allows keyboard-only link clicking and scrolling using Vim keys (\`h\`, \`j\`, \`k\`, \`l\`, \`f\`).

> [!NOTE]
> Don't try to learn fifty shortcuts at once. Pick three, write them on a post-it note under your monitor, and use them until they become muscle memory. Then pick three more.
`
  },
  {
    id: "note-taking-workflow",
    title: "Plain-Text Notebook: Why I Keep Tech Notes in Markdown",
    excerpt: "Why I moved away from complex note-taking apps and databases to a simple folder of local Markdown files managed by Git.",
    date: "2026-04-30",
    tags: ["Note-taking", "Markdown", "Learning"],
    readingTime: "4 min read",
    content: `
# Plain-Text Notebook: My Markdown System

I've tried almost every productivity app: Notion, Evernote, Apple Notes, and structured databases. While they have great features, I found myself spending more time configuring layouts and database properties than actually writing down what I learned.

I eventually transitioned to a simple folder of **Markdown (.md) files**. Here is why I prefer it.

## The Benefits of Plain Text

1. **Future-Proof**: Markdown is plain text. Even if my editor ceases to exist, my files can be read by any device, command-line tool, or text previewer.
2. **Git Version Control**: By putting my notes in a private GitHub repository, I get a complete history of my learning progress. If I accidentally delete a snippet of SQL configurations, I can restore it from commit logs.
3. **No Formatting Distractions**: Plain text forces me to focus on content. I use headings, lists, code blocks, and bold text—nothing more.
4. **Instant Search**: I can use command-line searchers like \`grep\` or the VS Code search bar to find code snippets across hundreds of note files in milliseconds.

## My Folder Structure

I keep it incredibly flat to prevent search fatigue:
* \`~/notes/cheatsheets/\` - Quick commands for Docker, Git, Terraform, and SQL.
* \`~/notes/learnings/\` - Explanations of core concepts in networking, operating systems, and databases.
* \`~/notes/scratch.md\` - A single scratch file for transient thoughts during the day, wiped clean every Sunday.

> [!TIP]
> Use a tool like Obsidian or simple VS Code markdown previewers to get high-quality rendering while preserving the simplicity of local plain-text files.
`
  }
];
