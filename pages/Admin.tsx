
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Lock, Save, X, Globe, Image as ImageIcon, Video, Mail, Phone, Upload, Link as LinkIcon } from 'lucide-react';
import { PortfolioItem, SiteSettings } from '../types';

interface AdminProps {
  items: PortfolioItem[];
  setItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const getYouTubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

const Admin: React.FC<AdminProps> = ({ items, setItems, editingId, setEditingId, siteSettings, setSiteSettings }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempItem, setTempItem] = useState<Partial<PortfolioItem>>({});
  const [isSiteSettingsOpen, setIsSiteSettingsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState<SiteSettings>(siteSettings);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '9876') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const deleteItem = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const startEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setTempItem(item);
  };

  const startAdd = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: '새 포트폴리오',
      category: 'Motion Graphic',
      description: '설명을 입력하세요.',
      videoUrl: '',
      points: ['포인트 1', '포인트 2'],
      purpose: '작업 목적'
    };
    setEditingId(newItem.id);
    setTempItem(newItem);
  };

  const saveItem = () => {
    if (editingId) {
      const exists = items.find(i => i.id === editingId);
      if (exists) {
        setItems(items.map(i => i.id === editingId ? { ...i, ...tempItem } as PortfolioItem : i));
      } else {
        setItems([...items, tempItem as PortfolioItem]);
      }
      setEditingId(null);
      setTempItem({});
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'aboutImageUrl' | 'logoUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('이미지 파일이 너무 큽니다 (2MB 이하 권장).');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempSettings({ ...tempSettings, [field]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const saveSiteSettings = () => {
    setSiteSettings(tempSettings);
    setIsSiteSettingsOpen(false);
    alert('사이트 설정이 저장되었습니다.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617]">
        <div className="max-w-md w-full bg-[#1D2951]/10 p-12 rounded-[3rem] border border-white/5 text-center shadow-2xl">
          <div className="w-20 h-20 bg-[#3b82f6]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#3b82f6]">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-black mb-8 tracking-tight">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full bg-[#020617] border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#3b82f6] text-center font-bold tracking-widest text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-[#1D2951] py-4 rounded-2xl font-black text-lg hover:bg-[#253b7d] transition-all shadow-xl shadow-[#1D2951]/20">
              Unlock
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-zinc-500 font-bold text-sm hover:text-white transition-colors"
            >
              ← Back to site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight mb-2">Manage Portfolio</h1>
          <p className="text-zinc-500 font-medium">포트폴리오와 사이트 설정을 관리하세요.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setTempSettings(siteSettings);
              setIsSiteSettingsOpen(true);
            }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all"
          >
            <Globe size={24} /> Site Settings
          </button>
          <button 
            onClick={startAdd}
            className="flex items-center gap-3 bg-[#1D2951] px-10 py-5 rounded-full font-black text-lg hover:bg-[#253b7d] transition-all shadow-2xl shadow-[#1D2951]/30"
          >
            <Plus size={24} /> Add New Project
          </button>
        </div>
      </div>

      <div className="grid gap-8">
        {items.map((item) => {
          const movieId = getYouTubeId(item.videoUrl);
          return (
            <div key={item.id} className="bg-[#1D2951]/5 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start hover:bg-[#1D2951]/10 transition-all duration-300">
              <div className="aspect-video w-full md:w-80 bg-black rounded-3xl overflow-hidden border border-white/10 shadow-lg flex items-center justify-center">
                {movieId ? (
                  <iframe 
                    className="w-full h-full pointer-events-none"
                    src={`https://www.youtube-nocookie.com/embed/${movieId}?playsinline=1`}
                    title={item.title}
                    frameBorder="0"
                  ></iframe>
                ) : (
                  <span className="text-zinc-700 font-bold">No Video</span>
                )}
              </div>
              
              <div className="flex-grow space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">{item.title}</h3>
                    <p className="text-[#3b82f6] text-sm font-black uppercase tracking-widest mt-1">{item.category}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => startEdit(item)} className="p-3 bg-white/5 rounded-2xl text-zinc-400 hover:text-white hover:bg-[#1D2951] transition-all">
                      <Edit2 size={20} />
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="p-3 bg-white/5 rounded-2xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-zinc-400 text-base font-medium leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.points.map(p => <span key={p} className="text-[11px] bg-white/5 px-3 py-1 rounded-full text-zinc-300 font-bold">#{p}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isSiteSettingsOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
          <div className="bg-[#020617] border border-white/10 w-full max-w-2xl rounded-[3.5rem] p-12 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-10 text-white">
              <h2 className="text-3xl font-black tracking-tight">Site Global Settings</h2>
              <button onClick={() => setIsSiteSettingsOpen(false)} className="text-zinc-400 hover:text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <div className="space-y-10 text-white">
              {/* Logo Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-400">
                   <ImageIcon size={20} />
                   <label className="text-xs font-black uppercase tracking-widest">Logo (PNG, Transparent)</label>
                </div>
                <div className="flex items-center gap-6">
                  {tempSettings.logoUrl ? (
                    <img src={tempSettings.logoUrl} className="h-16 w-auto bg-zinc-800 p-2 rounded-xl" alt="Logo preview" />
                  ) : (
                    <div className="h-16 w-16 bg-zinc-800 flex items-center justify-center rounded-xl text-xs text-zinc-500">No Logo</div>
                  )}
                  <label className="flex items-center justify-center gap-2 bg-white/10 px-6 py-3 rounded-xl cursor-pointer hover:bg-white/20 transition-all">
                    <Upload size={18} />
                    <span className="font-bold text-sm">Upload PNG</span>
                    <input type="file" accept="image/png" className="hidden" onChange={(e) => handleImageUpload(e, 'logoUrl')} />
                  </label>
                  {tempSettings.logoUrl && (
                    <button onClick={() => setTempSettings({...tempSettings, logoUrl: ''})} className="text-red-400 font-bold text-sm">Remove</button>
                  )}
                </div>
              </div>

              {/* Showreel Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-400">
                  <LinkIcon size={20} />
                  <label className="text-xs font-black uppercase tracking-widest">Main Showreel YouTube Link</label>
                </div>
                <input 
                  type="text" 
                  value={tempSettings.heroVideoUrl} 
                  onChange={e => setTempSettings({...tempSettings, heroVideoUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                  placeholder="https://youtu.be/..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-400">
                    <Mail size={20} />
                    <label className="text-xs font-black uppercase tracking-widest">Contact Email</label>
                  </div>
                  <input 
                    type="email" 
                    value={tempSettings.email} 
                    onChange={e => setTempSettings({...tempSettings, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-400">
                    <Phone size={20} />
                    <label className="text-xs font-black uppercase tracking-widest">Contact Phone</label>
                  </div>
                  <input 
                    type="text" 
                    value={tempSettings.phone} 
                    onChange={e => setTempSettings({...tempSettings, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-400">
                  <ImageIcon size={20} />
                  <label className="text-xs font-black uppercase tracking-widest">About Profile Image</label>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="aspect-video w-full max-w-sm rounded-3xl overflow-hidden border border-white/10 bg-black mx-auto">
                    <img src={tempSettings.aboutImageUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <label className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 py-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                     <Upload size={18} />
                     <span className="font-bold text-sm">Change Image</span>
                     <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'aboutImageUrl')} />
                  </label>
                </div>
              </div>

              <button 
                onClick={saveSiteSettings}
                className="w-full bg-blue-600 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-2xl mt-4"
              >
                <Save size={24} /> Save Global Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-4">
          <div className="bg-[#020617] border border-white/10 w-full max-w-3xl rounded-[3.5rem] p-12 max-h-[90vh] overflow-y-auto shadow-2xl text-white">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black tracking-tight">Project Details</h2>
              <button onClick={() => { if(window.confirm("취소하시겠습니까?")) setEditingId(null); }} className="text-zinc-400 hover:text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <div className="grid gap-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Project Title</label>
                  <input 
                    type="text" 
                    value={tempItem.title} 
                    onChange={e => setTempItem({...tempItem, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Category</label>
                  <input 
                    type="text" 
                    value={tempItem.category} 
                    onChange={e => setTempItem({...tempItem, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Description</label>
                <textarea 
                  rows={4}
                  value={tempItem.description} 
                  onChange={e => setTempItem({...tempItem, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-medium resize-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">YouTube Video URL</label>
                  <input 
                    type="text" 
                    value={tempItem.videoUrl} 
                    onChange={e => setTempItem({...tempItem, videoUrl: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                    placeholder="https://youtu.be/..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Goal/Purpose</label>
                  <input 
                    type="text" 
                    value={tempItem.purpose} 
                    onChange={e => setTempItem({...tempItem, purpose: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1">Highlights (Comma split)</label>
                <input 
                  type="text" 
                  value={tempItem.points?.join(', ')} 
                  onChange={e => setTempItem({...tempItem, points: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-[#3b82f6] outline-none font-bold"
                />
              </div>
              <button 
                onClick={saveItem}
                className="w-full bg-[#1D2951] py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#253b7d] transition-all shadow-2xl mt-4"
              >
                <Save size={24} /> Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
