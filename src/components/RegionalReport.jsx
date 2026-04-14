import { motion } from 'framer-motion';

export function RegionalReport({ analysis }) {
  const regionalData = analysis?.regional || [];

  return (
    <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">warning</span> Global Standards
          </h2>
          <p className="text-[10px] text-outline uppercase tracking-widest mt-1">Same Brand, Different Standards</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[9px] uppercase tracking-widest text-outline font-headline">
              <th className="pb-2 font-medium">Ingredient</th>
              <th className="pb-2 font-medium text-center">India</th>
              <th className="pb-2 font-medium text-right">Intl</th>
            </tr>
          </thead>
          <tbody>
            {!analysis ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="opacity-20">
                  <td className="p-3 rounded-l border-l-2 border-outline-variant">
                    <div className="h-3 bg-outline/20 rounded w-20"></div>
                  </td>
                  <td className="p-3 text-center"><div className="h-3 bg-outline/20 rounded w-12 mx-auto"></div></td>
                  <td className="p-3 rounded-r text-right"><div className="h-1 bg-outline/20 rounded w-16 ml-auto"></div></td>
                </tr>
              ))
            ) : regionalData.length === 0 ? (
              <tr><td colSpan="3" className="text-center text-xs text-outline py-4 font-headline uppercase tracking-widest opacity-50">SCAN_DATA_NULL</td></tr>
            ) : (
              regionalData.map((r, idx) => {
                let borderCls = 'border-outline-variant';
                if (r.flag === 'worse') borderCls = 'border-error';
                else if (r.flag === 'better') borderCls = 'border-primary';

                return (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    key={idx} 
                    className="bg-surface-container-lowest/50 hover:bg-surface-container transition-colors"
                  >
                    <td className={`p-3 rounded-l border-l-2 ${borderCls}`}>
                      <div className="text-xs font-bold text-on-surface uppercase">{r.name}</div>
                    </td>
                    <td className={`p-3 text-center ${r.flag === 'worse' ? 'text-error font-bold' : 'text-on-surface'} text-xs`}>
                      {r.in}
                    </td>
                    <td className="p-3 rounded-r text-right text-primary text-xs">
                      {r.us_eu}
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-error-container/20 rounded border border-error/20 flex gap-3">
        <span className="material-symbols-outlined text-error text-[18px]">info</span>
        <div className="font-body text-[10px] text-on-error-container leading-tight">
          <strong>INEQUALITY ALERT:</strong> Multinationals often use cheaper, poorly regulated ingredients in developing markets.
        </div>
      </div>
    </div>
  );
}
