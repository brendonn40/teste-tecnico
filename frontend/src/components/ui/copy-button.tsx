import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'hover:bg-gray-400/20 p-1 rounded text-zinc-200',
              className
            )}
            aria-label="Copy to clipboard"
            onClick={handleCopy}
          >
            {copied ? (
              <Check size={16} color="green" />
            ) : (
              <Copy size={16} className="text-black dark:text-white" />
            )}
          </button>
        </TooltipTrigger>

        <TooltipContent
          className="bg-white text-black text-sm px-2 py-1 rounded shadow"
          sideOffset={5}
        >
          Copiado
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
