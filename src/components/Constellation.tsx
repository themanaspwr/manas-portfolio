import React, { useState } from 'react';
import { skillNodes, skillEdges } from '../data/skills';
import type { SkillNode } from '../data/skills';
import { playClickSound, playHoverSound } from './Header';
import { Star, Info, Cpu, Layers } from 'lucide-react';

export const Constellation: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SkillNode | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleNodeHover = (node: SkillNode | null) => {
    if (node) {
      playHoverSound();
    }
    setActiveNode(node);
  };

  const handleFilterClick = (cat: string) => {
    playClickSound();
    setCategoryFilter(cat);
  };

  // Check if edge should be highlighted (if either source or target is hovered)
  const isEdgeHighlighted = (sourceId: string, targetId: string) => {
    if (!activeNode) return false;
    return activeNode.id === sourceId || activeNode.id === targetId;
  };

  // Check if node is dimmed because of filtering
  const isNodeDimmed = (node: SkillNode) => {
    if (categoryFilter === 'all') return false;
    return node.category !== categoryFilter;
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'cloud': return 'var(--accent-lime)'; // Burnished Copper
      case 'datascience': return 'var(--accent-orange)'; // Sage Green
      case 'language': return 'var(--accent-mint)'; // Champagne Ivory
      case 'genai': return 'var(--accent-white)'; // Champagne Ivory
      case 'system': return 'rgba(143, 149, 158, 0.8)'; // Muted gray
      default: return 'var(--accent-lime)';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
      {/* Interactive Constellation SVG Panel */}
      <div className="flex-1 bg-secondary/40 border border-accent-lime/20 rounded p-4 flex flex-col justify-between theme-transition min-h-[400px] relative overflow-hidden">
        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4 z-10">
          {['all', 'datascience', 'language', 'cloud', 'genai', 'system'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`font-mono text-[9px] px-2 py-1 rounded border transition-all ${
                categoryFilter === cat
                  ? 'border-accent-lime bg-accent-lime/10 text-accent-lime font-bold'
                  : 'border-text/10 text-text/50 hover:border-text/30 hover:text-text'
              }`}
            >
              [{cat.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Constellation SVG Canvas */}
        <div className="flex-1 w-full h-[320px] sm:h-[400px] relative bg-primary/20 rounded border border-text/5 overflow-hidden">
          {/* Radar grids metadata */}
          <div className="absolute top-3 left-3 pointer-events-none font-mono text-[8px] text-text/30 flex flex-col gap-0.5 z-10">
            <span>CONSTELLATION STATS: ONLINE</span>
            <span>GRID SCAN: ACTIVE</span>
            <span>FILTER: {categoryFilter.toUpperCase()}</span>
          </div>

          {/* Subtle radar circle layers */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="w-[100px] h-[100px] border border-text rounded-full" />
            <div className="w-[220px] h-[220px] border border-text rounded-full border-dashed" />
            <div className="w-[350px] h-[350px] border border-text rounded-full" />
          </div>

          <svg viewBox="0 0 100 100" className="w-full h-full select-none">
            {/* Draw Links/Edges */}
            {skillEdges.map((edge, idx) => {
              const src = skillNodes.find(n => n.id === edge.source);
              const tgt = skillNodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;

              const highlighted = isEdgeHighlighted(edge.source, edge.target);
              const dimmed = (isNodeDimmed(src) || isNodeDimmed(tgt)) && !highlighted;

              return (
                <line
                  key={`${edge.source}-${edge.target}-${idx}`}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={highlighted ? 'var(--accent-lime)' : 'var(--text-primary)'}
                  strokeWidth={highlighted ? 0.6 : 0.25}
                  strokeDasharray={highlighted ? 'none' : '1, 1'}
                  opacity={highlighted ? 0.8 : dimmed ? 0.05 : 0.25}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Draw Nodes */}
            {skillNodes.map((node) => {
              const isHovered = activeNode?.id === node.id;
              const dimmed = isNodeDimmed(node);
              const nodeColor = getCategoryColor(node.category);

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => handleNodeHover(node)}
                  onMouseLeave={() => handleNodeHover(null)}
                >
                  {/* Outer glow ring on hover */}
                  {isHovered && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={3.5}
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth={0.25}
                      opacity={0.4}
                      className="animate-ping"
                    />
                  )}

                  {/* Active background node */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 1.8 : 1.2}
                    fill={nodeColor}
                    opacity={dimmed ? 0.25 : 1}
                    className="transition-all duration-300"
                  />

                  {/* Node label text */}
                  <text
                    x={node.x}
                    y={node.y - 2}
                    textAnchor="middle"
                    fill={isHovered ? 'var(--accent-lime)' : 'var(--text-primary)'}
                    fontSize={2}
                    fontFamily="monospace"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    opacity={dimmed ? 0.25 : 0.8}
                    className="transition-all duration-300 pointer-events-none"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Floating Metadata Details Panel */}
      <div className="w-full lg:w-[320px] bg-secondary/45 border border-accent-lime/20 rounded p-4 flex flex-col justify-between theme-transition shadow-lg">
        {activeNode ? (
          <div className="flex flex-col gap-4">
            {/* Header info */}
            <div>
              <span className={`text-[8px] px-1.5 py-0.5 rounded border font-mono font-bold tracking-wider`} style={{ borderColor: getCategoryColor(activeNode.category), color: getCategoryColor(activeNode.category) }}>
                {activeNode.category.toUpperCase()}
              </span>
              <h3 className="font-mono text-xl font-bold text-text mt-1.5 border-b border-text/10 pb-1 flex items-center justify-between">
                <span>{activeNode.name}</span>
                <span className="font-mono text-[9px] text-text/40">NODE_ID: {activeNode.id.toUpperCase()}</span>
              </h3>
            </div>

            {/* Level metric */}
            <div>
              <span className="font-mono text-[9px] text-text/40 flex items-center gap-1.5">
                <Star size={11} className="text-accent-orange" /> EXPERTISE LEVEL:
              </span>
              <div className="flex gap-1.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 border ${
                      i < activeNode.level
                        ? 'bg-accent-lime border-accent-lime/50'
                        : 'bg-primary/20 border-text/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project logs */}
            <div>
              <span className="font-mono text-[9px] text-text/40 flex items-center gap-1.5">
                <Cpu size={11} /> TARGET SYSTEM RUNS:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeNode.projects.map((proj, i) => (
                  <span
                    key={i}
                    className="font-mono text-[8px] bg-primary/60 border border-text/10 rounded px-1.5 py-0.5 text-text/80"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="font-mono text-[9px] text-text/40 flex items-center gap-1.5">
                <Info size={11} /> LAB ANNOTATIONS:
              </span>
              <p className="font-mono text-[10px] text-text/80 mt-1.5 leading-relaxed bg-primary/30 p-2 border border-text/5 rounded">
                {activeNode.notes}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center text-text/40 font-mono text-xs border border-dashed border-text/10 rounded">
            <Layers size={24} className="mb-2 text-text/30 animate-pulse" />
            <p>HOVER A NODE TO MAP STRUCTURAL DETAILS</p>
            <p className="text-[9px] text-text/25 mt-1">Select categories to filter layout viewports.</p>
          </div>
        )}

        <div className="border-t border-text/10 pt-3 mt-4 flex items-center justify-between font-mono text-[8px] text-text/30">
          <span>COORDINATE MESH: V1.0</span>
          <span>MANAS.SYS.ANALYST</span>
        </div>
      </div>
    </div>
  );
};
