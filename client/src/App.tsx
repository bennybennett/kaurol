import Stage from './components/Stage';
import Kaurol from './components/modules/Kaurol/Kaurol';
import { Route, Routes } from 'react-router-dom';
import { LocationsProvider } from './components/contexts/LocationsContext/LocationsContext';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Main from './components/layout/Main/Main';
import Create from './components/modules/Create/Create';
import Content from './components/layout/Content/Content';
import Landing from './components/modules/Landing/Landing';

function App() {
  return (
    <div className='wrapper'>
      <Main>
        <Sidebar />
        <Content>
          <LocationsProvider>
            <Routes>
              <Route path='/entries/create' element={<Create />} />
              <Route path='/entries/:id' element={<Stage />} />
              <Route index element={<Landing />} />
            </Routes>
          </LocationsProvider>
        </Content>
      </Main>
      <Kaurol />
    </div>
  );
}

export default App;
