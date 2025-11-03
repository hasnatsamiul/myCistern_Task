import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "../shared/i18n/I18nProvider";
import { useTheme } from "../shared/theme/ThemeProvider";
import "../index.css";

export default function App() {
  const navigate = useNavigate();
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();

  // redirect root to devices
  useEffect(() => {
    navigate("/devices", { replace: true });
  }, [navigate]);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">myCistern</div>
        <nav className="nav center">
          <NavLink to="/devices" className="nav-chip">
            {t("devices")}
          </NavLink>
        </nav>

        {/* Right: theme + language */}
        <div className="topbar-right">
          <button className="btn" onClick={toggle}>
            {t("toggleTheme")} ({theme})
          </button>

          <select
            className="select"
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </div>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
