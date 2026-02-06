import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Trash2, Edit2 } from "lucide-react";

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    return (
        <Card hover className="group relative flex flex-col justify-between h-full">
            <div>
                <div className="mb-2 flex items-start justify-between">
                    <select
                        value={task.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            e.stopPropagation();
                            onStatusChange(task, e.target.value);
                        }}
                        className={`
                            rounded-full px-2.5 py-0.5 text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-primary/20 focus:outline-none
                            ${task.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                task.status === 'in_progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}
                        `}
                    >
                        <option value="pending" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">Pending</option>
                        <option value="in_progress" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">In Progress</option>
                        <option value="completed" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">Completed</option>
                    </select>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                            className="text-slate-400 hover:text-primary transition-colors"
                        >
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
                            className="text-slate-400 hover:text-danger transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white" title={task.title}>
                    {task.title}
                </h3>
                {task.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400" title={task.description}>
                        {task.description}
                    </p>
                )}
                <p className="mt-4 text-xs text-slate-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                </p>
            </div>
        </Card>
    );
};
