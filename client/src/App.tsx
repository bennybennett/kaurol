import './App.css';
import EntryList from './components/modules/EntryList/EntryList';
import Stage from './components/Stage';
import Kaurol from './components/modules/Kaurol/Kaurol';
import { useState } from 'react';
import { IEntry } from '../../shared/types/entry';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getEntryById } from './api/entries';

function App() {
  const navigate = useNavigate();
  const [selectedEntry, setSelectedEntry] = useState<IEntry | null>(null);

  const handleEntryClick = async (entryId?: string) => {
    if (!entryId) {
      navigate('/entries/create');
      return;
    }

    const entry = await getEntryById(entryId);
    setSelectedEntry(entry);
    navigate(`/entries/${entry._id}`);
  };

  return (
    <div className='wrapper'>
      <div className='main'>
        <EntryList
          handleEntryClick={handleEntryClick}
          selectedEntry={selectedEntry}
        />
        <Routes>
          <Route
            path='/entries/create'
            element={<Stage entry={null} handleEntryClick={handleEntryClick} />}
          />
          <Route
            path='/entries/:id'
            element={
              <Stage
                entry={selectedEntry}
                handleEntryClick={handleEntryClick}
              />
            }
          />
          <Route
            index
            element={
              <Stage
                entry={selectedEntry}
                handleEntryClick={handleEntryClick}
              />
            }
          />
        </Routes>
      </div>
      <Kaurol handleEntryClick={handleEntryClick} />
    </div>
  );
}

export default App;
