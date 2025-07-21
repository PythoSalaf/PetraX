import { Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Home, MarketPlace, Trade } from "./pages";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market-place" element={<MarketPlace />} />
          <Route path="/trade/:id" element={<Trade />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
