export interface Quote {
  text: string;
  author: string;
  timestamp: string;
}

export const quotes: Quote[] = [
  {
    text: "Computers are good at following instructions, but not at reading your mind.",
    author: "Donald Knuth",
    timestamp: "LOG.001"
  },
  {
    text: "Infrastructure is at its best when it is invisible. Code is at its best when it is clean.",
    author: "M. Pawar",
    timestamp: "LOG.002"
  },
  {
    text: "The best error message is the one that never shows up because the system healed itself.",
    author: "Systems Architecture",
    timestamp: "LOG.003"
  },
  {
    text: "Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make things worse: complexity sells better.",
    author: "Edsger W. Dijkstra",
    timestamp: "LOG.004"
  },
  {
    text: "Data science is not about compiling calculations, it is about understanding patterns in systems.",
    author: "Exploratory Notebook",
    timestamp: "LOG.005"
  },
  {
    text: "Any sufficiently advanced automation is indistinguishable from magic.",
    author: "DevOps Axiom",
    timestamp: "LOG.006"
  }
];
