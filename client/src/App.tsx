import EntryList from './components/modules/EntryList/EntryList';
import Stage from './components/Stage';
import Kaurol from './components/modules/Kaurol/Kaurol';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='wrapper'>
      <div className='main'>
        <EntryList />
        <Routes>
          <Route path='/entries/create' element={<Stage />} />
          <Route path='/entries/:id' element={<Stage />} />
          <Route index element={<Stage />} />
        </Routes>
      </div>
      <Kaurol />
    </div>
  );
}

export default App;
