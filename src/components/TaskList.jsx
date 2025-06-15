export default function TaskList({ tasks, tasksCompleted, toggleTask }) {
  return (
    <ul className="space-y-6 w-full max-w-md">
      {tasks.map((task, i) => (
        <li
          key={i}
          className="flex items-center cursor-pointer select-none"
          onClick={() => toggleTask(i)}
        >
          {/* SVG Circle and Tick */}
          <svg
            className={`w-7 h-7 mr-4 flex-shrink-0 transition-colors
              ${tasksCompleted[i] ? 'stroke-orange-400' : 'stroke-gray-400'}
            `}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            {tasksCompleted[i] && (
              <path d="M7 13l3 3 7-7" className="stroke-orange-400" />
            )}
          </svg>
          <span
            className={`text-xl transition-colors
              ${tasksCompleted[i] ? 'line-through text-gray-400' : ''}
            `}
          >
            {task}
          </span>
        </li>
      ))}
    </ul>
  );
}
