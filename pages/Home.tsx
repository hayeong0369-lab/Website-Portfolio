
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Mail, Target, Layout, MessageSquare, CheckCircle, Copy, Check, X, ArrowRight, Instagram, Youtube } from 'lucide-react';
import { PortfolioItem, SiteSettings } from '../types';
import { TECH_STACKS, PROCESS_STEPS } from '../constants';

const getYouTubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

const VideoModal = ({ isOpen, onClose, videoUrl }: { isOpen: boolean, onClose: () => void, videoUrl: string }) => {
  if (!isOpen) return null;
  const movieId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(29,41,81,0.3)] animate-in zoom-in-95 duration-300 border border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md">
          <X size={28} />
        </button>
        {movieId ? (
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${movieId}?autoplay=1&playsinline=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold">
            영상이 등록되지 않았습니다.
          </div>
        )}
      </div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose, email, phone }: { isOpen: boolean, onClose: () => void, email: string, phone: string }) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-[#0B1437] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-10 shadow-[0_0_100px_rgba(29,41,81,0.5)] animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
          <X size={28} />
        </button>
        
        <h2 className="text-3xl font-black mb-10 tracking-tight text-white">연락처</h2>
        
        <div className="space-y-6">
          <div className="group bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-[#3b82f6]/50 transition-all">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Email Address</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl md:text-2xl font-black text-white truncate">{email}</span>
              <button 
                onClick={() => copyToClipboard(email, 'email')}
                className="flex-shrink-0 p-3 bg-white/10 rounded-2xl text-white hover:bg-[#3b82f6] transition-all relative"
              >
                {copiedType === 'email' ? <Check size={20} /> : <Copy size={20} />}
                {copiedType === 'email' && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">복사되었습니다!</span>
                )}
              </button>
            </div>
          </div>

          <div className="group bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-[#3b82f6]/50 transition-all">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Phone Number</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl md:text-2xl font-black text-white">{phone}</span>
              <button 
                onClick={() => copyToClipboard(phone, 'phone')}
                className="flex-shrink-0 p-3 bg-white/10 rounded-2xl text-white hover:bg-[#3b82f6] transition-all relative"
              >
                {copiedType === 'phone' ? <Check size={20} /> : <Copy size={20} />}
                {copiedType === 'phone' && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">복사되었습니다!</span>
                )}
              </button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6">
            <a 
              href="https://www.instagram.com/hayeong0369/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#E4405F] transition-all border border-white/5 hover:border-[#E4405F]/50"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UC704hUiU8_yXi-VwKak6n6w" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#FF0000] transition-all border border-white/5 hover:border-[#FF0000]/50"
            >
              <Youtube size={28} />
            </a>
            <a 
              href="https://www.behance.net/fe5e633e" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#1769FF] transition-all border border-white/5 hover:border-[#1769FF]/50"
            >
              <span className="text-[22px] font-black leading-none mt-1">Be</span>
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-500 text-sm font-medium">언제든 편하게 연락주세요.</p>
      </div>
    </div>
  );
};

const Hero = ({ videoUrl, onOpenShowreel }: { videoUrl: string, onOpenShowreel: () => void }) => {
  const movieId = getYouTubeId(videoUrl);
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-black">
      <div className="absolute inset-0 z-0">
        {movieId ? (
          <iframe 
            className="w-full h-full pointer-events-none scale-105"
            src={`https://www.youtube-nocookie.com/embed/${movieId}?autoplay=1&mute=1&loop=1&playlist=${movieId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
            title="Hero Showreel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700 font-bold">
            No Video Registered
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-[#1D2951]/40 z-10 flex items-center justify-center">
        <button 
          onClick={onOpenShowreel}
          className="group flex flex-col items-center gap-6 text-white hover:scale-110 transition-transform duration-500"
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#1D2951] transition-all">
            <Play size={40} className="fill-current" />
          </div>
          <span className="text-xl font-black tracking-widest uppercase">Watch Showreel</span>
        </button>
      </div>
    </section>
  );
};

const About = ({ imageUrl, onOpenShowreel, onOpenContact }: { imageUrl: string, onOpenShowreel: () => void, onOpenContact: () => void }) => {
  return (
    <section id="about" className="py-32 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 md:order-1 group">
          <div className="aspect-[4/5] bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 relative">
            <img src={imageUrl} alt="Hwang Hayeong" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-20 group-hover:opacity-0 transition-opacity duration-700">
               <div className="space-y-4">
                  <h2 className="text-[#3b82f6] font-bold tracking-widest text-sm uppercase">Motion Graphic Designer</h2>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight text-white">황하영</h1>
                  <p className="text-lg text-zinc-300 max-w-sm leading-relaxed font-medium">
                    기획 의도를 이해하고,<br />끝까지 소통하는 모션그래픽 디자이너
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button onClick={onOpenShowreel} className="p-4 bg-white text-[#1D2951] rounded-full hover:bg-[#3b82f6] hover:text-white transition-all"><Play size={20} fill="currentColor"/></button>
                    <button onClick={onOpenContact} className="p-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"><Mail size={20}/></button>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <div className="space-y-10 order-1 md:order-2">
          <div>
            <span className="text-[#3b82f6] font-bold tracking-widest text-xs uppercase mb-3 block">Who I Am</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight break-keep text-white">움직임은 소통입니다</h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg font-medium">
              <p>Motion graphic과 영상 편집을 중심으로 작업하고 있습니다. 광고, SNS, 서비스 소개 영상 등 목적에 맞는 영상 연출을 중요하게 생각합니다.</p>
              <p>소통과 일정 관리를 가장 기본적인 실력이라고 믿으며, 항상 프로젝트의 완성도와 납품 기한을 최우선으로 고려합니다.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TECH_STACKS.map((stack) => (
              <div key={stack.name} className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-[#1D2951]/30 transition-colors">
                <div className="w-12 h-12 bg-[#1D2951]/40 rounded-xl flex items-center justify-center font-black text-[#3b82f6] text-xs">
                  {stack.icon}
                </div>
                <span className="font-bold text-base text-zinc-200">{stack.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ items }: { items: PortfolioItem[] }) => {
  return (
    <section id="portfolio" className="py-48 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-40">
          <span className="text-[#3b82f6] font-bold tracking-widest text-xs uppercase mb-4 block">Selected Works</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white">포트폴리오</h2>
          <div className="w-24 h-1 bg-[#3b82f6] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-64">
          {items.map((item, index) => {
            const movieId = getYouTubeId(item.videoUrl);
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={item.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 group`}
              >
                {/* Video Area */}
                <div className="w-full md:w-1/2 lg:w-[55%] shrink-0">
                  <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group-hover:border-[#3b82f6]/30 transition-all duration-700">
                    {movieId ? (
                      <iframe 
                        className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000"
                        src={`https://www.youtube-nocookie.com/embed/${movieId}?playsinline=1&modestbranding=1&rel=0&controls=1`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black text-2xl uppercase">No Video Registered</div>
                    )}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-[#1D2951] px-5 py-2 rounded-full text-[12px] text-white font-black uppercase tracking-widest shadow-xl border border-white/10">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Area */}
                <div className="flex-grow space-y-10">
                  <div className="space-y-4">
                    <span className="text-[#3b82f6] font-black text-sm tracking-[0.2em] uppercase block">Project 0{index + 1}</span>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter group-hover:text-[#3b82f6] transition-colors leading-tight text-white">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-8">
                    <p className="text-zinc-400 text-lg md:text-xl leading-[1.8] font-medium whitespace-pre-line break-keep">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2.5">
                      {item.points.map(point => (
                        <span key={point} className="text-xs bg-[#1D2951]/30 px-4 py-2 rounded-2xl text-[#3b82f6] font-bold border border-[#3b82f6]/10">
                          {point}
                        </span>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-[#3b82f6]/10 rounded-2xl text-[#3b82f6]">
                           <Target size={24} />
                         </div>
                         <div>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Project Goal</p>
                            <p className="text-zinc-200 text-lg font-bold">{item.purpose}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'target': return <Target size={36} />;
      case 'layout': return <Layout size={36} />;
      case 'message': return <MessageSquare size={36} />;
      case 'check': return <CheckCircle size={36} />;
      default: return null;
    }
  };

  return (
    <section id="process" className="py-32 bg-[#1D2951]/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white">작업과정</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
            “의뢰인의 말을 그대로 만드는 것이 아니라, 왜 필요한지 이해한 뒤 더 좋은 방향을 제안합니다.”
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className="relative group">
              <div className="bg-[#0B1437] border border-white/5 p-10 rounded-[3rem] h-full hover:bg-[#1D2951]/40 transition-all duration-500 group-hover:-translate-y-3">
                <div className="text-[#3b82f6] mb-8 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(step.icon)}
                </div>
                <div className="text-[#1D2951]/40 text-6xl font-black absolute top-10 right-10 group-hover:text-[#3b82f6]/20 transition-colors">
                  0{step.id}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 p-16 bg-[#1D2951] rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 justify-between">
            <h3 className="text-3xl md:text-4xl font-black max-w-xl leading-snug break-keep">
              “피드백은 부담이 아닌,<br />결과물을 더 좋게 만드는<br />과정이라고 생각합니다.”
            </h3>
            <div className="flex gap-3 text-blue-200/60 font-bold text-sm">
              <span>#성실한_커뮤니케이션</span>
              <span>#소통의_중요성</span>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </section>
  );
};

const SpaceInfographicBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling Stars */}
      {[...Array(60)].map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-white rounded-full animate-pulse opacity-70" 
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: (Math.random() * 3 + 2) + 's'
          }}
        />
      ))}
      
      {/* Planet 1 - Top Left, White Outline */}
      <svg className="absolute top-10 left-[10%] w-48 h-48 text-[#3b82f6] opacity-20 animate-[spin_80s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 3" />
        <ellipse cx="50" cy="50" rx="48" ry="12" fill="none" stroke="currentColor" strokeWidth="0.8" transform="rotate(-30 50 50)" />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      </svg>

      {/* Planet 2 - Bottom Right, White Outline */}
      <svg className="absolute bottom-10 right-[15%] w-56 h-56 text-[#3b82f6] opacity-20 animate-[spin_120s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20 45 Q 50 25, 80 45" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M15 65 Q 50 85, 85 65" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
};

const Contact = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="contact" className="relative py-48 bg-[#0B1437] rounded-t-[8rem] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(29,41,81,0.7)_0%,_rgba(11,20,55,1)_100%)] pointer-events-none"></div>
      
      <SpaceInfographicBg />
      
      <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-20">
        <span className="text-[#3b82f6] font-black tracking-[0.3em] text-sm uppercase mb-6 block animate-pulse">준비되셨나요?</span>
        <h2 className="text-6xl md:text-8xl font-black mb-16 tracking-tighter leading-tight">
          미래를<br />창조합니다
        </h2>
        <div className="space-y-12">
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/60 text-lg font-medium tracking-wide">
              · 외주 / 계약직 / 정규직 가능 · 
            </p>
            <p className="text-blue-300/80 text-sm font-bold tracking-widest uppercase">
              평균응답시간 24시간 이내
            </p>
          </div>
          <button 
            onClick={onOpenModal}
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[#3b82f6] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <span className="relative bg-white text-[#1D2951] px-16 py-7 rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition-all active:scale-95 border-b-4 border-zinc-200">
              프로젝트 문의하기
            </span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent"></div>
    </section>
  );
};

const Home: React.FC<{ portfolioItems: PortfolioItem[], siteSettings: SiteSettings }> = ({ portfolioItems, siteSettings }) => {
  const { hash } = useLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="space-y-0">
      <Hero 
        videoUrl={siteSettings.heroVideoUrl} 
        onOpenShowreel={() => setIsShowreelOpen(true)}
      />
      <About 
        imageUrl={siteSettings.aboutImageUrl} 
        onOpenShowreel={() => setIsShowreelOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />
      <Portfolio items={portfolioItems} />
      <Process />
      <Contact onOpenModal={() => setIsContactModalOpen(true)} />
      
      <VideoModal 
        isOpen={isShowreelOpen} 
        onClose={() => setIsShowreelOpen(false)} 
        videoUrl={siteSettings.heroVideoUrl} 
      />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        email={siteSettings.email} 
        phone={siteSettings.phone} 
      />
    </div>
  );
};

export default Home;
