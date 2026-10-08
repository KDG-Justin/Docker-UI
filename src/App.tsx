import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { HeaderComponent } from './components/header/HeaderComponent';
import { DrawerComponent } from './components/header/DrawerComponent';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
        <HeaderComponent onToggleDrawer={() => setIsDrawerOpen(true)}/>
          <DrawerComponent open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>  
            <Routes>
              <Route path="/" element={<div>hello</div>} />
              <Route path="/containers" element={<div>containers</div>} />
              <Route path="/images" element={<div>images</div>} />
              <Route path="/volumes" element={<div>volumes</div>} />
              <Route path="/networks" element={<div>networks</div>} />
            </Routes>
    </BrowserRouter>
  )
}

export default App
