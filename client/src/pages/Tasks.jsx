import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Input } from '../components/ui/Input';
import { TaskCard } from '../components/features/TaskCard';
import { Modal } from '../components/ui/Modal';
import { Calendar, CheckSquare, ListTodo } from 'lucide-react';

const Tasks = ({ status }) => {
    const { user, loading } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Edit State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [editTask, setEditTask] = useState({ title: '', description: '', status: '' });

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user, status]);

    const fetchTasks = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const res = await axios.get('/api/tasks', config);
            let filteredTasks = res.data;

            if (status === 'completed') {
                filteredTasks = res.data.filter(t => t.status === 'completed');
            } else if (status === 'active') {
                filteredTasks = res.data.filter(t => t.status !== 'completed');
            }

            setTasks(filteredTasks);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.delete(`/api/tasks/${id}`, config);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setEditTask({
            title: task.title,
            description: task.description || '',
            status: task.status
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const res = await axios.put(`/api/tasks/${currentTask._id}`, editTask, config);

            // Update local state
            setTasks(tasks.map(t => t._id === currentTask._id ? res.data : t));

            // If the new status doesn't match the current page filter, remove it from view
            if (status === 'completed' && res.data.status !== 'completed') {
                setTasks(prev => prev.filter(t => t._id !== currentTask._id));
            } else if (status === 'active' && res.data.status === 'completed') {
                setTasks(prev => prev.filter(t => t._id !== currentTask._id));
            }

            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            // Optimistic update
            const updatedTask = { ...task, status: newStatus };

            // Check if we need to remove it from the current view immediately or just update it
            if (status === 'completed' && newStatus !== 'completed') {
                setTasks(prev => prev.filter(t => t._id !== task._id));
            } else if (status === 'active' && newStatus === 'completed') {
                setTasks(prev => prev.filter(t => t._id !== task._id));
            } else {
                setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
            }

            await axios.put(`/api/tasks/${task._id}`, { status: newStatus }, config);
        } catch (error) {
            console.error(error);
            // Revert on error
            fetchTasks();
        }
    };

    if (loading || isLoading) {
        return (
            <Layout>
                <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
            </Layout>
        );
    }

    const pageTitle = status === 'completed' ? 'Completed Tasks' : 'My Tasks';
    const pageIcon = status === 'completed' ? CheckSquare : ListTodo;

    return (
        <Layout>
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800">
                        <pageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{pageTitle}</h1>
                </div>
            </div>

            {tasks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={openEditModal}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                        <Calendar className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">No tasks found</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        {status === 'completed' ? "You haven't completed any tasks yet." : "You have no active tasks."}
                    </p>
                </div>
            )}

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Update Task"
            >
                <form onSubmit={handleUpdateTask} className="space-y-4">
                    <Input
                        label="Task Title"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                        required
                    />
                    <Textarea
                        label="Description"
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Status
                        </label>
                        <select
                            value={editTask.status}
                            onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                            className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Tasks;
