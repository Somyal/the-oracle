import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, X, Shield } from 'lucide-react';
import type { Reality } from '../types';
import { resonance } from '../utils/audio';

interface DossierModalProps {
  reality: Reality;
  onClose: () => void;
}

export function DossierModal({ reality, onClose }: DossierModalProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const divergenceSection = reality.sections.find((s) => s.type === 'divergence');
  const paradoxSection = reality.sections.find((s) => s.type === 'paradox');

  const handleCopyText = async () => {
    resonance.playTick();
    const text = `=== THE ORACLE: TRANSMISSION DOSSIER ===
DESIGNATION: ${reality.title}
PRIMARY INQUIRY: "${reality.question}"
TIMESTAMP: ${new Date(reality.createdAt).toUTCString()}
STRAND ID: #${reality.id.slice(0, 10).toUpperCase()}

[ THE POINT OF DIVERGENCE ]
${divergenceSection?.content || 'Uncharted'}

[ THE UNDERLYING PARADOX ]
${paradoxSection?.content || 'Uncharted'}

[ TIMELINE EPOCHS ]
${reality.timeline.map((t) => `• ${t.year}: ${t.title}`).join('\n')}

REPOSITORY OF PROBABILITIES // CLASSIFICATION VERIFIED
=========================================`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadImage = () => {
    resonance.playChime();
    // Render high-res specimen card to canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#08090D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border & Grid
    ctx.strokeStyle = '#1A1C23';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.strokeStyle = '#D4A853';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Header metadata
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillStyle = '#8A8578';
    ctx.fillText('ORACLE ASTRONOMICAL REPOSITORY // TRANSMISSION DOSSIER', 80, 90);
    ctx.fillText(`STRAND: #${reality.id.slice(0, 12).toUpperCase()} // CLASSIFICATION: CLASS-IV OMEGA`, 750, 90);

    // Line divider
    ctx.strokeStyle = '#2A2D36';
    ctx.beginPath();
    ctx.moveTo(80, 110);
    ctx.lineTo(1120, 110);
    ctx.stroke();

    // Title
    ctx.font = 'bold 36px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#E8E4DC';
    ctx.fillText(reality.title.slice(0, 45), 80, 170);

    // Question
    ctx.font = 'italic 18px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#D4A853';
    ctx.fillText(`"${reality.question}"`, 80, 210);

    // Divergence Box
    ctx.fillStyle = '#0F1115';
    ctx.fillRect(80, 250, 1040, 220);
    ctx.strokeStyle = '#2A2D36';
    ctx.strokeRect(80, 250, 1040, 220);

    ctx.font = '11px "Inter", sans-serif';
    ctx.fillStyle = '#D4A853';
    ctx.fillText('THE POINT OF DEPARTURE', 105, 280);

    ctx.font = '15px "Inter", sans-serif';
    ctx.fillStyle = '#C8C4BC';
    const divSnippet = divergenceSection?.content.slice(0, 320) || '';
    ctx.fillText(divSnippet.slice(0, 110), 105, 315);
    ctx.fillText(divSnippet.slice(110, 220), 105, 345);
    ctx.fillText(divSnippet.slice(220, 320) + '…', 105, 375);

    // Paradox Box
    ctx.fillStyle = '#0F1115';
    ctx.fillRect(80, 490, 1040, 160);
    ctx.strokeStyle = '#2A2D36';
    ctx.strokeRect(80, 490, 1040, 160);

    ctx.font = '11px "Inter", sans-serif';
    ctx.fillStyle = '#4A9EBF';
    ctx.fillText('THE COSMOLOGICAL PARADOX', 105, 520);

    ctx.font = 'italic 16px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#E8E4DC';
    const parSnippet = paradoxSection?.content.slice(0, 250) || '';
    ctx.fillText(parSnippet.slice(0, 95), 105, 555);
    ctx.fillText(parSnippet.slice(95, 190) + '…', 105, 585);

    // Footer seal
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillStyle = '#5A5750';
    ctx.fillText(`PRESERVED: ${new Date(reality.createdAt).toUTCString()}`, 80, 710);
    ctx.fillText('SEAL OF THE OBSERVATORY // ALL PARALLELS VERIFIED', 750, 710);

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `ORACLE-SPECIMEN-${reality.id.slice(0, 8)}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-oracle-amber/40 bg-[#08090D] p-6 md:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            resonance.playTick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-oracle-text-muted hover:text-oracle-text transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Telemetry Header */}
        <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-oracle-amber mb-3">
          <Shield size={13} />
          <span>Archival Specimen Dossier</span>
          <span>•</span>
          <span className="text-oracle-text-muted">#{reality.id.slice(0, 10).toUpperCase()}</span>
        </div>

        {/* Specimen Card Preview */}
        <div
          ref={cardRef}
          className="p-6 rounded-xl border border-oracle-border bg-oracle-surface/80 space-y-5 my-4"
        >
          <div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-oracle-text-muted">
              Designation
            </span>
            <h2 className="font-serif text-2xl text-oracle-text mt-0.5">
              {reality.title}
            </h2>
            <p className="font-serif italic text-sm text-oracle-amber mt-1">
              &ldquo;{reality.question}&rdquo;
            </p>
          </div>

          {divergenceSection && (
            <div className="border-l-2 border-oracle-amber/50 pl-3">
              <span className="text-[9px] font-sans uppercase tracking-widest text-oracle-amber block mb-1">
                The Departure
              </span>
              <p className="text-xs text-oracle-text-dim leading-relaxed line-clamp-3">
                {divergenceSection.content}
              </p>
            </div>
          )}

          {paradoxSection && (
            <div className="border-l-2 border-oracle-blue/50 pl-3">
              <span className="text-[9px] font-sans uppercase tracking-widest text-oracle-blue block mb-1">
                The Paradox
              </span>
              <p className="font-serif italic text-xs text-oracle-text leading-relaxed line-clamp-2">
                &ldquo;{paradoxSection.content}&rdquo;
              </p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-[10px] font-sans uppercase tracking-wider text-oracle-text-muted border-t border-oracle-border-light">
            <span>Continuum Verified: Class-IV</span>
            <span>{reality.timeline.length} Recorded Epochs</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-oracle-border bg-oracle-surface text-xs font-sans uppercase tracking-wider text-oracle-text hover:border-oracle-border-light transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-oracle-amber" /> : <Copy size={14} />}
            <span>{copied ? 'Dossier Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-oracle-amber/50 bg-oracle-amber/10 text-xs font-sans uppercase tracking-wider text-oracle-amber hover:bg-oracle-amber/20 hover:border-oracle-amber transition-all cursor-pointer shadow-lg shadow-oracle-amber/5"
          >
            <Download size={14} />
            <span>Download Specimen (.PNG)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default DossierModal;
