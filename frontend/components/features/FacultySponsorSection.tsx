"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, MapPin, KeyBase } from "lucide-react";
import React from "react";

interface FacultyMember {
  name: string;
  designation: string;
  department: string;
  about: string;
  id: string;
  accessLevel: string;
}

const facultyMembers: FacultyMember[] = [
  {
    name: "Dr. Faculty Sponsor 1",
    designation: "Faculty Coordinator",
    department: "Computer Science",
    about: "A distinguished academician guiding the chapter towards technical excellence and professional growth, fostering innovation.",
    id: "ADV-001",
    accessLevel: "OMEGA",
  },
  {
    name: "Prof. Faculty Sponsor 2",
    designation: "Strategic Advisor",
    department: "Information Tech",
    about: "An experienced educator passionate about bridging the gap between academia and industry with strategic direction.",
    id: "ADV-002",
    accessLevel: "OMEGA",
  },
];

const BarcodePattern = () => (
  <svg className="w-full h-12 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100" fill="currentColor">
    <rect x="0" y="0" width="3" height="100" />
    <rect x="5" y="0" width="1" height="100" />
    <rect x="8" y="0" width="5" height="100" />
    <rect x="15" y="0" width="2" height="100" />
    <rect x="19" y="0" width="8" height="100" />
    <rect x="29" y="0" width="3" height="100" />
    <rect x="34" y="0" width="1" height="100" />
    <rect x="37" y="0" width="6" height="100" />
    <rect x="45" y="0" width="2" height="100" />
    <rect x="49" y="0" width="8" height="100" />
    <rect x="59" y="0" width="4" height="100" />
    <rect x="65" y="0" width="1" height="100" />
    <rect x="68" y="0" width="7" height="100" />
    <rect x="77" y="0" width="2" height="100" />
    <rect x="81" y="0" width="5" height="100" />
    <rect x="88" y="0" width="3" height="100" />
    <rect x="93" y="0" width="1" height="100" />
    <rect x="96" y="0" width="4" height="100" />
  </svg>
);

const FacultySponsorSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs md:text-sm font-mono tracking-[0.2em] mb-4 md:mb-6 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            ADMINISTRATIVE PROFILES
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight font-mono mb-4">
            Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]">Mentors</span>
          </h2>
          <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <ShieldCheck className="text-yellow-500 w-5 h-5 md:w-6 md:h-6 opacity-70" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </motion.div>

        {/* Digital ID Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl">
          {facultyMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 50 }}
              className="group relative w-full perspective-1000"
            >
              {/* ID Card Wrapper */}
              <div
                className="relative bg-[#0a0a0a] rounded-2xl md:rounded-3xl border border-yellow-500/20 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-yellow-500/50 group-hover:shadow-[0_0_40px_-5px_rgba(234,179,8,0.3)] group-hover:-translate-y-2 flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Holographic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-black/80 pointer-events-none z-0" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none z-0" />

                {/* ID Header */}
                <div className="relative z-10 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent">
                  <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs text-yellow-500/70 font-mono tracking-widest">GFG CAMPUS CHAPTER</span>
                    <span className="text-xs md:text-sm text-yellow-500 font-bold font-mono tracking-wider">OFFICIAL ID</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-widest">CLEARANCE</span>
                    <span className="text-xs md:text-sm text-white font-bold font-mono tracking-widest border border-yellow-500/40 px-2 py-0.5 rounded bg-yellow-500/20">{member.accessLevel}</span>
                  </div>
                </div>

                {/* ID Content Area */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 p-6 md:p-8 flex-1">

                  {/* Left Column: Photo/Avatar */}
                  <div className="flex flex-col items-center gap-4 w-full md:w-auto shrink-0 pl-0 md:pl-2">
                    <div className="relative p-1">
                      {/* Avatar Frame - Cyberpunk style */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-700 opacity-20 blur-xl rounded-xl group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="relative w-28 h-28 md:w-32 md:h-36 bg-black border border-yellow-500/40 rounded-xl flex items-center justify-center overflow-hidden z-10 box-content shadow-inner">
                        {/* Scanline effect over avatar */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(234,179,8,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline z-20 pointer-events-none opacity-50" />

                        <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-yellow-500/80 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />

                        {/* Reticle corners */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-yellow-500/60" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-yellow-500/60" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-yellow-500/60" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-500/60" />
                      </div>
                    </div>
                    {/* Tiny Barcode under photo on mobile */}
                    <div className="w-24 text-yellow-500/50 block md:hidden mt-2">
                      <BarcodePattern />
                    </div>
                  </div>

                  {/* Right Column: Info Details */}
                  <div className="flex flex-col flex-1 justify-center relative">
                    {/* Watermark Logo/Text */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[80px] font-black text-yellow-500/5 rotate-90 origin-right pointer-events-none select-none font-mono tracking-tighter">
                      GFG
                    </div>

                    <div className="space-y-4">
                      {/* Name section */}
                      <div>
                        <div className="text-[10px] md:text-xs text-yellow-500/60 font-mono tracking-widest uppercase mb-1">Holder Name // Mentorship</div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase group-hover:text-yellow-400 transition-colors duration-300">
                          {member.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="col-span-2 md:col-span-1 border-l-2 border-yellow-500/30 pl-3">
                          <div className="text-[9px] md:text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Designation</div>
                          <div className="text-xs md:text-sm text-foreground/90 font-medium">{member.designation}</div>
                        </div>
                        <div className="col-span-2 md:col-span-1 border-l-2 border-yellow-500/30 pl-3">
                          <div className="text-[9px] md:text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Department</div>
                          <div className="text-xs md:text-sm text-foreground/90 font-medium">{member.department}</div>
                        </div>
                        <div className="col-span-2 border-l-2 border-yellow-500/30 pl-3 pt-1">
                          <div className="text-[9px] md:text-[10px] text-muted-foreground font-mono tracking-widest uppercase mb-1">Profile Data</div>
                          <p className="text-xs md:text-sm text-muted-foreground/80 leading-snug pr-4">
                            {member.about}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ID Footer Barcode area */}
                <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-black/60 border-t border-yellow-500/10 mt-auto">
                  <div className="hidden md:block w-32 md:w-48 text-yellow-500/30 transition-opacity duration-300 group-hover:text-yellow-500/60">
                    <BarcodePattern />
                  </div>
                  <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] text-muted-foreground font-mono tracking-widest uppercase">ID Number</span>
                      <span className="text-sm font-mono text-yellow-400 font-bold">{member.id}</span>
                    </div>
                    {/* NFC or Chip icon simulation */}
                    <div className="w-8 h-6 rounded border border-yellow-500/40 flex items-center justify-center bg-gradient-to-br from-yellow-500/10 to-transparent">
                      <div className="w-4 h-3 bg-yellow-500/20 grid grid-cols-2 gap-0.5">
                        <div className="bg-yellow-500/40 rounded-sm"></div>
                        <div className="bg-yellow-500/40 rounded-sm"></div>
                        <div className="bg-yellow-500/40 rounded-sm"></div>
                        <div className="bg-yellow-500/40 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay Highlight Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultySponsorSection;

