"use client";

import { Clock, ArrowRight } from "lucide-react";

interface MicroTask {
  id: string;
  title: string;
  description: string | null;
  type: string;
}

interface MicroTaskCardProps {
  tasks: MicroTask[];
  onComplete?: (taskId: string) => void;
}

export default function MicroTaskCard({
  tasks,
  onComplete,
}: MicroTaskCardProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-navy-100 rounded-2xl p-6">
        <h3 className="text-sm font-medium text-navy-500 mb-3">
          Quick Tasks
        </h3>
        <div className="text-center py-4">
          <p className="text-sm text-navy-400">All caught up! No tasks pending.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-navy-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-navy-500">Quick Tasks</h3>
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
          {tasks.length} pending
        </span>
      </div>
      <div className="space-y-3">
        {tasks.slice(0, 3).map((task) => (
          <button
            key={task.id}
            onClick={() => onComplete?.(task.id)}
            className="w-full flex items-center gap-3 p-3 bg-navy-50 hover:bg-teal-50 rounded-xl text-left transition-colors group"
          >
            <Clock className="w-4 h-4 text-navy-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy-800 truncate">
                {task.title}
              </p>
              {task.description && (
                <p className="text-xs text-navy-500 truncate">
                  {task.description}
                </p>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-navy-300 group-hover:text-teal-500 flex-shrink-0 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
