import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Layout, Save, Search, Plus, Trash2, Globe, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CMSItem {
    id?: number;
    page: string;
    key: string;
    value: string;
    last_updated?: string;
}

const AdminCMS = () => {
    const [items, setItems] = useState<CMSItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPage, setFilterPage] = useState('all');
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    // Form State for adding/editing
    const [isEditing, setIsEditing] = useState<CMSItem | null>(null);

    useEffect(() => {
        fetchCMSData();
    }, []);

    const fetchCMSData = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('site_cms')
                .select('*')
                .order('page', { ascending: true });

            if (error) throw error;
            setItems(data || []);
        } catch (err: any) {
            console.error('Error fetching CMS:', err.message);
            // If table doesn't exist, we show a helpful message
            if (err.message.includes('does not exist')) {
                setStatus({ type: 'error', msg: 'The "site_cms" table does not exist in your Supabase yet. Please run the SQL migration.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditing) return;

        try {
            const { error } = await supabase
                .from('site_cms')
                .upsert([
                    {
                        page: isEditing.page,
                        key: isEditing.key,
                        value: isEditing.value,
                        last_updated: new Date().toISOString()
                    }
                ], { onConflict: 'page,key' });

            if (error) throw error;

            setStatus({ type: 'success', msg: 'Content updated successfully!' });
            setIsEditing(null);
            fetchCMSData();
            setTimeout(() => setStatus(null), 3000);
        } catch (err: any) {
            setStatus({ type: 'error', msg: err.message });
        }
    };

    const handleDelete = async (page: string, key: string) => {
        if (!window.confirm('Are you sure you want to delete this content key?')) return;

        try {
            const { error } = await supabase
                .from('site_cms')
                .delete()
                .match({ page, key });

            if (error) throw error;
            fetchCMSData();
        } catch (err: any) {
            setStatus({ type: 'error', msg: err.message });
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.value.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPage = filterPage === 'all' || item.page === filterPage;
        return matchesSearch && matchesPage;
    });

    const pages = Array.from(new Set(items.map(item => item.page)));

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
                            Site <span className="text-primary">CMS</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Manage dynamic content across all pages without touching code.</p>
                    </div>

                    <button
                        onClick={() => setIsEditing({ page: '', key: '', value: '' })}
                        className="btn-premium-primary inline-flex items-center gap-2 py-3 px-6"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Key
                    </button>
                </header>

                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}
                    >
                        {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {status.msg}
                    </motion.div>
                )}

                {/* Filters */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by key or value..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
                        />
                    </div>
                    <select
                        value={filterPage}
                        onChange={(e) => setFilterPage(e.target.value)}
                        className="px-6 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold text-slate-600 cursor-pointer"
                    >
                        <option value="all">All Pages</option>
                        {pages.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>

                {/* Content List */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredItems.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500 font-bold">No content keys found.</p>
                            </div>
                        ) : (
                            filteredItems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                                >
                                    <div className="min-w-0 flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                {item.page}
                                            </span>
                                            <h4 className="font-black text-slate-900 truncate tracking-tight">{item.key}</h4>
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium line-clamp-2">{item.value}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => setIsEditing(item)}
                                            className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-primary/10 hover:text-primary transition-all"
                                        >
                                            <Layout className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.page, item.key)}
                                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-10 border border-slate-100"
                        >
                            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter">
                                {items.find(i => i.page === isEditing.page && i.key === isEditing.key) ? 'Edit Content' : 'Add New Content'}
                            </h2>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Page Name</label>
                                        <input
                                            value={isEditing.page}
                                            onChange={(e) => setIsEditing({ ...isEditing, page: e.target.value })}
                                            placeholder="e.g. index"
                                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Content Key</label>
                                        <input
                                            value={isEditing.key}
                                            onChange={(e) => setIsEditing({ ...isEditing, key: e.target.value })}
                                            placeholder="e.g. hero_title"
                                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Content Value</label>
                                    <textarea
                                        value={isEditing.value}
                                        onChange={(e) => setIsEditing({ ...isEditing, value: e.target.value })}
                                        placeholder="Enter the text content here..."
                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium min-h-[150px]"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="btn-premium-primary flex-grow inline-flex items-center justify-center gap-2 py-4"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(null)}
                                        className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black transition-all hover:bg-slate-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCMS;
