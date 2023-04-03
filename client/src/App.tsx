import Stage from './components/Stage';
import Kaurol from './components/modules/Kaurol/Kaurol';
import { Route, Routes } from 'react-router-dom';
import { LocationsProvider } from './components/contexts/LocationsContext/LocationsContext';
import Sidebar from './components/layout/Sidebar/Sidebar';

function App() {
  return (
    <div className='wrapper'>
      <div className='main'>
        <Sidebar />
        <LocationsProvider>
          <Routes>
            <Route path='/entries/create' element={<Stage />} />
            <Route path='/entries/:id' element={<Stage />} />
            <Route index element={<Stage />} />
          </Routes>
        </LocationsProvider>
      </div>
      <Kaurol />
    </div>
  );
}

export default App;
