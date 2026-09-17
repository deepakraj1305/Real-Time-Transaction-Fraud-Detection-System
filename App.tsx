import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analyzer from './pages/Analyzer.jsx';
import Transactions from './pages/Transactions.jsx';
import SecurityInsights from './pages/SecurityInsights.jsx';

function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Sidebar />
      <main className="min-h-screen pt-16 md:ml-72 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<SecurityInsights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
