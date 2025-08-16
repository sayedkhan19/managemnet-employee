import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(prev => (prev === "light" ? "night" : "light"));
  };

  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="toggle"
        onChange={handleToggle}
        checked={theme === "night"}
      />
    </label>
  );
};


export default ThemeToggle;