import React from 'react';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { playClickSound, playHoverSound } from '../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, ShieldCheck, GitMerge, FileCode } from 'lucide-react';

export const FeaturedProject: React.FC = () => {
  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-text/10 pb-4">
          <Link
            to="/projects"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-xs text-text/50 hover:text-accent-lime flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft size={13} />
            <span>RETURN_TO_LABORATORY</span>
          </Link>
          <span className="font-mono text-[9px] text-accent-lime bg-accent-lime/10 px-2 py-0.5 rounded border border-accent-lime/20 tracking-wider">
            FEATURED_RUN_01
          </span>
        </div>

        {/* Blueprint Overview Title Section */}
        <section className="flex flex-col gap-3">
          <h2 className="font-mono text-2xl sm:text-4xl font-bold text-text flex items-center gap-2">
            <Cpu className="text-accent-orange" /> SERVERLESS_CSV_CLEANER.DAT
          </h2>
          <p className="font-mono text-xs text-text/75 max-w-3xl leading-relaxed">
            This module represents the serverless analytics pipeline: triggered by S3 file uploads, the system automatically spins up a Python AWS Lambda runtime environment to parse, clean, and standardize raw transaction CSV datasets, and saves output files to secure target buckets.
          </p>
        </section>

        {/* 1. Core Interactive Diagrams Section */}
        <section className="mt-2 w-full">
          <ArchitectureDiagram />
        </section>

        {/* 2. Detailed Journey Log Blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Journey block 1: The architecture flow */}
          <div className="bg-secondary/45 border border-text/10 rounded-lg p-5 flex flex-col justify-between theme-transition">
            <div>
              <h3 className="font-mono text-xs font-bold text-accent-lime tracking-widest border-b border-text/10 pb-2 mb-3 flex items-center gap-2">
                <GitMerge size={14} className="text-accent-lime" /> [Development Journey]
              </h3>
              <ul className="font-mono text-[10px] text-text/75 space-y-3 leading-relaxed">
                <li>
                  <strong className="text-accent-orange font-semibold">[01/PHASE] Ingest Triggers:</strong> Configured S3 ObjectCreated event alerts to invoke AWS Lambda target processor handlers automatically upon raw dataset arrivals.
                </li>
                <li>
                  <strong className="text-accent-orange font-semibold">[02/PHASE] Pandas Operations:</strong> Programmed dataframe preprocessing tasks, including duplicate row purging, category capitalization, and null value imputations.
                </li>
                <li>
                  <strong className="text-accent-orange font-semibold">[03/PHASE] S3 Target Ingest:</strong> Streamed cleaned dataframe tables back into CSV formats, exporting them securely to a separate, private S3 output bucket.
                </li>
              </ul>
            </div>
          </div>

          {/* Journey block 2: Technology spec */}
          <div className="bg-secondary/45 border border-text/10 rounded-lg p-5 flex flex-col justify-between theme-transition">
            <div>
              <h3 className="font-mono text-xs font-bold text-accent-orange tracking-widest border-b border-text/10 pb-2 mb-3 flex items-center gap-2">
                <FileCode size={14} className="text-accent-orange" /> [Diagnostic Specs]
              </h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-text/75">
                <div className="p-2 border border-text/5 bg-primary/25 rounded">
                  <span className="text-accent-lime font-bold block mb-0.5">RUN ENGINE:</span>
                  AWS Lambda Tasks
                </div>
                <div className="p-2 border border-text/5 bg-primary/25 rounded">
                  <span className="text-accent-lime font-bold block mb-0.5">PROCESSOR:</span>
                  Python 3.11 / Pandas
                </div>
                <div className="p-2 border border-text/5 bg-primary/25 rounded">
                  <span className="text-accent-lime font-bold block mb-0.5">TARGET STORE:</span>
                  AWS S3 Buckets
                </div>
                <div className="p-2 border border-text/5 bg-primary/25 rounded">
                  <span className="text-accent-lime font-bold block mb-0.5">IAC MODULE:</span>
                  Terraform IaC (Basic)
                </div>
              </div>
              <p className="font-mono text-[10px] text-text/50 mt-4 leading-relaxed italic border-t border-text/10 pt-3 flex items-center gap-1.5">
                <ShieldCheck size={11} className="text-accent-mint" /> PIPELINE VERIFIED IN COMPLIANT SANDBOX AND DECLARED ACTIVE.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};
