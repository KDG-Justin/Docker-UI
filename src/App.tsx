import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { HeaderComponent } from './components/header/HeaderComponent';
import { DrawerComponent } from './components/header/DrawerComponent';
import { ContainersScreen } from './screens/ContainersScreen';
import { HomeScreen } from './screens/HomeScreen';

const queryClient = new QueryClient();

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
  <QueryClientProvider client={queryClient}> 
    <BrowserRouter>
        <HeaderComponent onToggleDrawer={() => setIsDrawerOpen(true)}/>
          <DrawerComponent open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>  
            <Routes>
              <Route path="/" element={<HomeScreen/>} />
              <Route path="/containers" element={<ContainersScreen/>} />
              <Route path="/images" element={<div>images</div>} />
              <Route path="/volumes" element={<div>volumes</div>} />
              <Route path="/networks" element={<div>networks</div>} />
            </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  )
}

export default App
