import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_DATA } from '../data/menu';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    try {
      return sessionStorage.getItem('oasis_menu_category') || MENU_CATEGORIES[0];
    } catch {
      return MENU_CATEGORIES[0];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      sessionStorage.setItem('oasis_menu_category', activeCategory);
    } catch (e) {}
  }, [activeCategory]);

  const filteredData = MENU_DATA.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-surface-container-lowest pb-space-2xl">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header & Search */}
        <div className="mb-12 pt-8">
          <h1 className="font-headline-lg text-on-surface mb-6 text-center">Menu</h1>
          <div className="relative max-w-md mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container py-3 pl-12 pr-4 rounded-full font-body-md text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Sticky Category Bar */}
        <div className="sticky top-[88px] z-30 bg-surface-container-lowest/90 backdrop-blur-md py-4 mb-8 -mx-6 px-6 sm:mx-0 sm:px-0 border-b border-outline-variant/20">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x w-full">
            <button
              onClick={() => setActiveCategory('All')}
              className={`snap-start whitespace-nowrap px-4 py-2 font-title-md relative transition-colors ${activeCategory === 'All' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              All
              {activeCategory === 'All' && (
                <motion.div layoutId="category-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            {MENU_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`snap-start whitespace-nowrap px-4 py-2 font-title-md relative transition-colors ${activeCategory === category ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div layoutId="category-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredData.map(item => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="p-6 bg-surface-container rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="font-title-lg text-on-surface">{item.name}</h3>
                        <span className="font-title-lg text-primary whitespace-nowrap">₹{item.price}</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant mb-4">{item.description}</p>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags.map(tag => (
                          <span key={tag} className="font-label-sm px-2 py-1 bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-on-surface-variant font-body-lg"
              >
                No items found for "{searchQuery}".
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
