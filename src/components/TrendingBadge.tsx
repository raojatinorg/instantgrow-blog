import { Flame } from 'lucide-react';

export default function TrendingBadge() {
  return (
    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse z-10">
      <Flame className="h-4 w-4" />
      <span className="text-xs font-bold">TRENDING</span>
    </div>
  );
}
