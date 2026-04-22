"use client";

import { useState, useTransition } from "react";
import { updateProjectProgress } from "@/app/actions/projects";

interface Props {
  projectId: string;
  currentProgress: number;
}

export default function ProjectProgressUpdater({ projectId, currentProgress }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (newProgress: number) => {
    if (newProgress < 0) newProgress = 0;
    if (newProgress > 100) newProgress = 100;
    
    setError(null);
    startTransition(async () => {
      try {
        await updateProjectProgress(projectId, newProgress);
      } catch (err: any) {
        setError(err.message || "Error al actualizar progreso");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-surface-container rounded-full h-2 min-w-[80px]">
          <div
            className={`h-2 rounded-full transition-all ${
              currentProgress === 100 ? "bg-green-500" : "bg-secondary-container"
            }`}
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
        <span className="text-xs font-bold text-on-surface-variant w-8">
          {currentProgress}%
        </span>
      </div>

      <div className="flex items-center gap-1 justify-end">
        <button
          onClick={() => handleUpdate(currentProgress - 10)}
          disabled={isPending || currentProgress <= 0}
          className="w-6 h-6 flex items-center justify-center bg-surface-container-low hover:bg-surface-container rounded-md text-on-surface-variant transition-colors disabled:opacity-50"
          title="Reducir 10%"
        >
          <span className="material-symbols-outlined text-[14px]">remove</span>
        </button>
        <button
          onClick={() => handleUpdate(currentProgress + 10)}
          disabled={isPending || currentProgress >= 100}
          className="w-6 h-6 flex items-center justify-center bg-secondary-container text-on-secondary-container hover:brightness-95 rounded-md transition-colors disabled:opacity-50"
          title="Aumentar 10%"
        >
          <span className="material-symbols-outlined text-[14px]">add</span>
        </button>
      </div>
      
      {error && (
        <span className="text-[10px] text-error leading-tight">{error}</span>
      )}
    </div>
  );
}
