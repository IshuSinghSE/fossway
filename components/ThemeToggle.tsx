import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="relative glass border-border text-foreground hover:border-primary/50 hover:bg-accent/10 transition-all duration-500 group overflow-hidden"
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-5 h-5">
        <Sun 
          className={`absolute w-4 h-4 text-yellow-400 transition-all duration-500 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`} 
        />
        <Moon 
          className={`absolute w-4 h-4 text-blue-400 transition-all duration-500 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-md transition-all duration-300 ${
        theme === 'light' 
          ? 'shadow-lg shadow-yellow-400/25' 
          : 'shadow-lg shadow-blue-400/25'
      }`}></div>
    </Button>
  );
}