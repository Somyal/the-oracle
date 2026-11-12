import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, X } from 'lucide-react';
import type { ArchiveEntry } from '../types';
import { resonance } from '../utils/audio';

interface ConstellationMapProps {
  entries: ArchiveEntry[];
  onOpenReality: (entry: ArchiveEntry) => void;
}

interface StarNode {
  entry: ArchiveEntry;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  isRoot: boolean;
  parentId?: string;
}

export function ConstellationMap({ entries, onOpenReality }: ConstellationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<ArchiveEntry | null>(null);
  const [hoveredNode, setHoveredNode] = useState<StarNode | null>(null);
  const nodesRef = useRef<StarNode[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize node layout based on parent-child relationships
  useEffect(() => {
    if (!containerRef.current || entries.length === 0) return;

    const width = containerRef.current.clientWidth || 800;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;

    const nodes: StarNode[] = [];
    const rootCount = entries.filter((e) => !e.reality.parentId).length || 1;
    let rootIndex = 0;

    entries.forEach((entry) => {
      const isRoot = !entry.reality.parentId;
      let x = centerX;
      let y = centerY;

      if (isRoot) {
        const angle = (rootIndex / rootCount) * Math.PI * 2 + (Math.PI / 4);
        const distance = Math.min(width, height) * 0.28;
        x = centerX + Math.cos(angle) * distance + (Math.random() * 40 - 20);
        y = centerY + Math.sin(angle) * distance + (Math.random() * 40 - 20);
        rootIndex++;
      } else {
        // Child branch node: position close to parent if found
        const parentNode = nodes.find((n) => n.entry.reality.id === entry.reality.parentId);
        if (parentNode) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 70 + Math.random() * 50;
          x = parentNode.x + Math.cos(angle) * dist;
          y = parentNode.y + Math.sin(angle) * dist;
        } else {
          x = centerX + (Math.random() - 0.5) * (width * 0.7);
          y = centerY + (Math.random() - 0.5) * (height * 0.7);
        }
      }

      nodes.push({
        entry,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: isRoot ? 5.5 : 4.0,
        color: isRoot ? '#D4A853' : '#4A9EBF',
        glowColor: isRoot ? 'rgba(212, 168, 83, 0.4)' : 'rgba(74, 158, 191, 0.4)',
        isRoot,
        parentId: entry.reality.parentId,
      });
    });

    nodesRef.current = nodes;
  }, [entries]);

  // Canvas render and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Deep space background grid lines
      ctx.strokeStyle = 'rgba(26, 28, 35, 0.4)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw faint center coordinate reticle
      const cx = width / 2;
      const cy = height / 2;
      ctx.strokeStyle = 'rgba(212, 168, 83, 0.12)';
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      const nodes = nodesRef.current;

      // Update positions with subtle floating physics
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off bounds
        if (node.x < 40 || node.x > width - 40) node.vx *= -1;
        if (node.y < 40 || node.y > height - 40) node.vy *= -1;
      });

      // Draw connecting filaments (parent to child & proximity filaments)
      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i >= j) return;

          const isDirectBranch = n1.entry.reality.id === n2.parentId || n2.entry.reality.id === n1.parentId;
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (isDirectBranch) {
            // Bright branch filament
            ctx.strokeStyle = 'rgba(74, 158, 191, 0.5)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
            ctx.setLineDash([]);
          } else if (dist < 150) {
            // Ambient gravitational link
            const alpha = (1 - dist / 150) * 0.18;
            ctx.strokeStyle = `rgba(212, 168, 83, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        });
      });

      // Draw each star node
      nodes.forEach((node) => {
        const isHovered = hoveredNode?.entry.id === node.entry.id;
        const isSelected = selectedEntry?.id === node.entry.id;
        const pulse = Math.sin(time + node.x) * 1.5;
        const radius = node.radius + (isHovered || isSelected ? 3 : 0) + pulse * 0.4;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          radius * 4.5
        );
        gradient.addColorStop(0, node.glowColor);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Target orbital reticle on hover or select
        if (isHovered || isSelected) {
          ctx.strokeStyle = node.isRoot ? '#D4A853' : '#4A9EBF';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
          ctx.stroke();

          // Reticle tick crosshairs
          const r = radius + 12;
          ctx.beginPath();
          ctx.moveTo(node.x - r, node.y);
          ctx.lineTo(node.x - r + 4, node.y);
          ctx.moveTo(node.x + r, node.y);
          ctx.lineTo(node.x + r - 4, node.y);
          ctx.moveTo(node.x, node.y - r);
          ctx.lineTo(node.x, node.y - r + 4);
          ctx.moveTo(node.x, node.y + r);
          ctx.lineTo(node.x, node.y + r - 4);
          ctx.stroke();
        }

        // Star core
        ctx.fillStyle = isHovered || isSelected ? '#FFFFFF' : node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        ctx.font = '10px "Inter", system-ui, sans-serif';
        ctx.fillStyle = isHovered || isSelected ? '#E8E4DC' : 'rgba(138, 133, 120, 0.8)';
        ctx.textAlign = 'center';
        const label = node.entry.name.length > 22 ? node.entry.name.slice(0, 20) + '…' : node.entry.name;
        ctx.fillText(label, node.x, node.y + radius + 15);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hoveredNode, selectedEntry]);

  // Handle canvas sizing
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = 500;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hit = nodesRef.current.find((node) => {
      const dx = node.x - mouseX;
      const dy = node.y - mouseY;
      return Math.sqrt(dx * dx + dy * dy) < node.radius + 12;
    });

    if (hit !== hoveredNode) {
      if (hit) resonance.playTick();
      setHoveredNode(hit || null);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hit = nodesRef.current.find((node) => {
      const dx = node.x - mouseX;
      const dy = node.y - mouseY;
      return Math.sqrt(dx * dx + dy * dy) < node.radius + 12;
    });

    if (hit) {
      resonance.playChime();
      setSelectedEntry(hit.entry);
    } else {
      setSelectedEntry(null);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl border border-oracle-border bg-[#08090D]">
      {/* Top telemetry bar */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] text-oracle-text-muted">
          <Compass size={13} className="text-oracle-amber" />
          <span>Multiverse Star Field: {entries.length} Stellar Realities</span>
        </div>
        <span className="text-[10px] font-sans uppercase tracking-widest text-oracle-amber/70">
          [ Interactive Map ]
        </span>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onMouseMove={handleCanvasMouseMove}
        onClick={handleCanvasClick}
        className="block w-full h-[500px] cursor-crosshair"
      />

      {/* Selected Reality HUD Overlay */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 z-30 p-5 rounded-xl border border-oracle-amber/40 bg-oracle-surface/95 backdrop-blur-md max-w-xl mx-auto shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest text-oracle-amber mb-1">
                  <span>Reality Coordinate Verified</span>
                  <span>•</span>
                  <span>{new Date(selectedEntry.savedAt).toLocaleDateString()}</span>
                </div>

                <h3 className="font-serif text-xl text-oracle-text leading-tight">
                  {selectedEntry.name}
                </h3>

                <p className="font-serif italic text-sm text-oracle-text-dim mt-1 line-clamp-2">
                  &ldquo;{selectedEntry.reality.question}&rdquo;
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      resonance.playEngage();
                      onOpenReality(selectedEntry);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-oracle-amber/50 bg-oracle-amber/10 text-xs font-sans uppercase tracking-wider text-oracle-amber hover:bg-oracle-amber/20 hover:border-oracle-amber transition-all cursor-pointer"
                  >
                    <span>Engage Universe</span>
                    <ArrowRight size={13} />
                  </button>

                  <span className="text-[10px] font-sans uppercase tracking-wider text-oracle-text-muted">
                    {selectedEntry.reality.sections.length} Axioms Preserved
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedEntry(null)}
                className="text-oracle-text-muted hover:text-oracle-text p-1 transition-colors cursor-pointer"
                title="Close coordinate HUD"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ConstellationMap;

