'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
    >
      <Printer className="h-5 w-5" />
      <span>Print</span>
    </button>
  );
}
