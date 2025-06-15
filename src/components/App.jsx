import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SideMenu from './SideMenu.jsx';
import TaskList from './TaskList.jsx';

// Region data
const regionData = {
  "Things Betwixt": [
    "Rusted Coin",
    "Small Smooth & Silky Stone",
    "Human Effigy",
    "Stone Ring",
    "Gold Pine Resin",
    "2x Amber Herb",
    "Cracked Red Eye Orb",
    "Dagger",
    "Handmaid's Ladle",
    "Estus Flask Shard",
  ],
  "Majula": [
    "Estus Flask",
    "2x Estus Flask Shard",
    "Soul Vessel",
    "Morning Star",
    "Morning Star",
    "Cleric's Sacred Chime",
    "Binoculars",
    "Short Bow",
    "Crimson Parma",
  ],
  "Heide's Tower of Flame": [
    "Blue Flame",
    "Heide Knight Sword",
    "Brightbug",
    "Soul of a Heide Knight",
  ],
  "No-man's Wharf": [
    "Soul of a Pirate",
    "Bell Keeper’s Seal",
    "Soul of a Wharf Rat",
    "Firebomb",
  ],
  "Shaded Woods": [
    "Soul of a Lost Undead",
    "Greater Magic Barrier",
    "Human Effigy",
    "Spellbinder’s Staff",
  ],
  "The Lost Bastille": [],
  "Sinner's Rise": [],
  "Harvest Valley": [],
  "Iron Keep": [],
  "Shrine of Amana": [],
  "Undead Crypt": [],
  "Black Gulch": [],
  "Drangleic Castle": [],
  "Dragon Aerie": [],
  "Dragon Shrine": [],
  "Memory of the Old Iron King": [],
  "Shrine of Winter": [],
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("Things Betwixt");
  const [menuOpen, setMenuOpen] = useState(true);

  // Initialize tasks state from localStorage or fresh
  const [tasksState, setTasksState] = useState(() => {
    try {
      const saved = localStorage.getItem('ds2-tasksState');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore errors and return fresh state
    }
    const init = {};
    for (const region in regionData) {
      init[region] = new Array(regionData[region].length).fill(false);
    }
    return init;
  });

  // Save tasksState to localStorage on change
  useEffect(() => {
    localStorage.setItem('ds2-tasksState', JSON.stringify(tasksState));
  }, [tasksState]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  function toggleTask(region, index) {
    setTasksState((prev) => {
      const newRegionTasks = [...prev[region]];
      newRegionTasks[index] = !newRegionTasks[index];
      return { ...prev, [region]: newRegionTasks };
    });
  }

  function handleRegionChange(region) {
    setSelectedRegion(region);
  }

  // Prepare .txt content with markdown strikethrough for checked tasks
  function generateTxtContent() {
    let content = '';
    for (const region of Object.keys(regionData)) {
      content += region + '\n';
      const tasks = regionData[region];
      const states = tasksState[region];
      tasks.forEach((task, i) => {
        const itemText = states && states[i] ? `~~${task}~~` : task;
        content += `\t${itemText}\n`;
      });
      content += '\n';
    }
    return content;
  }

  // Trigger download of .txt file
  function downloadTxtFile() {
    const txt = generateTxtContent();
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ds2-loot-checklist.txt';
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className={`flex min-h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Helmet>
        <title>Dark Souls 2 - {selectedRegion} Loot Checklist</title>
      </Helmet>

      <SideMenu
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        regions={Object.keys(regionData)}
        selectedRegion={selectedRegion}
        onSelectRegion={handleRegionChange}
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      <main className="flex-grow flex flex-col items-center p-10 w-full">
        <h1 className="text-4xl font-extrabold !mb-6 text-center">
          Dark Souls 2 Region Locked:{' '}
          <span className="text-orange-400 font-black">A checklist web-app to track your progress!</span>
        </h1>

        <h2 className="!text-2xl sm:text-3xl font-bold !mb-2 text-orange-300">
          {selectedRegion} Loot Checklist
        </h2>

        {regionData[selectedRegion] && tasksState[selectedRegion] && (
          <TaskList
            darkMode={darkMode}
            tasks={regionData[selectedRegion]}
            tasksCompleted={tasksState[selectedRegion]}
            toggleTask={(index) => toggleTask(selectedRegion, index)}
          />
        )}

        {/* Download button and info */}
        <div className="mt-8 flex items-center space-x-2">
          <button
            onClick={downloadTxtFile}
            className="flex items-center space-x-2 rounded bg-orange-400 px-4 py-2 font-semibold text-gray-900 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            aria-label="Download checklist as text file"
          >
            📥 <span>Download Checklist (.txt)</span>
          </button>

          <div className="relative group">
            <button
              aria-label="Info about persistence and download"
              className="text-gray-400 hover:text-orange-400 focus:outline-none"
            >
              ❓
            </button>
            <div className="absolute bottom-full mb-2 w-64 rounded bg-gray-800 p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-50 dark:bg-gray-700">
              Your checked items are saved locally in your browser using <b>localStorage</b>.{' '}
              If you clear your browser data, this progress will be lost. You can also download a text file of your checklist with <i>strikethrough</i> indicating checked items.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
