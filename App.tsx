
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { INITIAL_PORTFOLIO } from './constants';
import { PortfolioItem, SiteSettings } from './types';
import Home from './pages/Home';
import Admin from './pages/Admin';

const Navbar = ({ isEditing, clearEditing, siteSettings }: { isEditing: boolean, clearEditing: () => void, siteSettings: SiteSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: '홈', path: '#hero' },
    { name: '소개', path: '#about' },
    { name: '작업물', path: '#portfolio' },
    { name: '작업과정', path: '#process' },
    { name: '문의', path: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();

    if (isEditing) {
      const confirmNav = window.confirm("기존 내용이 지워집니다. 그래도 이동하시겠습니까?");
      if (!confirmNav) return;
      clearEditing();
    }

    const targetId = path.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/' + path);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            onClick={(e) => handleScroll(e as any, '#hero')}
            className="flex items-center gap-3 text-xl font-black tracking-tighter text-white"
          >
            {siteSettings.logoUrl ? (
              <img src={siteSettings.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500" />
            )}
            <span>하영's Portfolio</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleScroll(e, link.path)}
                className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to="/admin" className="p-1 text-zinc-600 hover:text-zinc-400">
              <Settings size={18} />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#020617] border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleScroll(e, link.path)}
                className="block px-3 py-3 text-base font-semibold text-zinc-400 hover:text-white hover:bg-white/5 rounded-md"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-base font-semibold text-zinc-600 hover:text-zinc-400"
            >
              Admin Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const AppContent = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('ha_young_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('ha_young_site_settings');
    
    // [중요] 배포 시 모든 사람에게 보여줄 사이트 기본 설정입니다.
    const defaults: SiteSettings = {
      heroVideoUrl: 'https://www.youtube.com/watch?v=실제_메인_쇼릴_ID',
      // 본인 사진도 profile.jpg라는 이름으로 폴더에 넣고 Push하면 적용됩니다.
      aboutImageUrl: './profile.jpg', 
      // 로고 파일을 logo.png로 저장해서 Push하면 적용됩니다.
      logoUrl: './logo.png', 
      email: 'hayeong0369@gmail.com',
      phone: '010-xxxx-xxxx',
      logoColor: '#A5F3FC'
    };
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ha_young_portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('ha_young_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  return (
    <div className="min-h-screen bg-[#020617] text-zinc-100 selection:bg-[#1D2951] selection:text-white font-[Pretendard]">
      <Navbar 
        isEditing={!!editingId} 
        clearEditing={() => setEditingId(null)} 
        siteSettings={siteSettings}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home portfolioItems={portfolioItems} siteSettings={siteSettings} />} />
          <Route 
            path="/admin" 
            element={
              <Admin 
                items={portfolioItems} 
                setItems={setPortfolioItems} 
                editingId={editingId} 
                setEditingId={setEditingId}
                siteSettings={siteSettings}
                setSiteSettings={setSiteSettings}
              />
            } 
          />
        </Routes>
      </main>
      
      <footer className="bg-[#020617] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">
            @ 2026 Hwang Hayeong. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
