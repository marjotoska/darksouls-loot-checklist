export default function SideMenu({ darkMode, toggleDarkMode, onSelectRegion, selectedRegion, open, setOpen }) {
  const regions = [
    "Things Betwixt",
    "Majula",
    "Heide's Tower of Flame",
    "No-man's Wharf",
    "Shaded Woods",
    "The Lost Bastille",
    "Sinner's Rise",
    "Harvest Valley",
    "Iron Keep",
    "Shrine of Amana",
    "Undead Crypt",
    "Black Gulch",
    "Drangleic Castle",
    "Dragon Aerie",
    "Dragon Shrine",
    "Memory of the Old Iron King",
    "Shrine of Winter",
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-full w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          ${darkMode ? 'bg-gray-900 text-white border-r border-gray-700' : 'bg-white text-gray-900 border-r border-gray-200'}`}
      >
        <div className="flex flex-col h-full">
          <header
            className={`flex items-center justify-between p-4 border-b ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <h2 className="text-lg font-bold">Regions</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="hover:text-orange-400 focus:outline-none"
            >
              ✕
            </button>
          </header>

          <ul className="flex-grow overflow-y-auto p-4 space-y-2">
            {regions.map((region) => (
              <li
                key={region}
                onClick={() => onSelectRegion(region)}
                className={`cursor-pointer rounded px-3 py-2 select-none transition-all ${
                  selectedRegion === region
                    ? 'bg-orange-400 font-bold text-white'
                    : 'hover:bg-orange-500 hover:text-white'
                }`}
              >
                {region}
              </li>
            ))}
          </ul>

          <div
            className={`p-4 border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>

              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 
                  focus:outline-none focus:ring-2 focus:ring-orange-400
                  ${darkMode ? 'bg-orange-400' : 'bg-gray-300'}`}
              >
                {/* Sun emoji on left */}
                <span
                  className={`absolute left-1 text-xs transition-opacity ${
                    darkMode ? 'opacity-0' : 'opacity-100'
                  }`}
                  aria-hidden="true"
                >
                  🌞
                </span>

                {/* Moon emoji on right */}
                <span
                  className={`absolute right-1 text-xs transition-opacity ${
                    darkMode ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                >
                  🌙
                </span>

                {/* The toggle knob */}
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={`fixed top-6 left-6 z-50 p-3 rounded-full shadow-lg focus:outline-none
            ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
            hover:scale-110 transition-transform`}
        >
          ☰
        </button>
      )}
    </>
  );
}
