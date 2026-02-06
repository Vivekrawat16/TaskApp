import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { TaskCard } from '../components/features/TaskCard';
import { Plus, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Create State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    // Edit State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [editTask, setEditTask] = useState({ title: '', description: '', status: '' });

    useEffect(() => {
        if (!loading && !user) navigate('/login');
        if (user) {
            if (user.isGuest) {
                // Initial dummy data for guest
                setTasks([
                    { _id: '1', title: 'Try Dark Mode', description: 'Toggle the theme switch in the sidebar to check out dark mode.', status: 'completed', createdAt: new Date() },
                    { _id: '2', title: 'Create a new specific task', description: 'Click the "Create Task" button to add your own task to this list.', status: 'pending', createdAt: new Date() },
                    { _id: '3', title: 'Update task status', description: 'Click on the status badge "Pending" to change it to "In Progress".', status: 'in_progress', createdAt: new Date() },
                ]);
                setIsLoading(false);
            } else {
                fetchTasks();
            }
        }
    }, [user, navigate, loading]);

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const res = await axios.get('/api/tasks', config);
            setTasks(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();

        if (user?.isGuest) {
            const newGuestTask = {
                ...newTask,
                _id: Date.now().toString(),
                status: newTask.status || 'pending',
                createdAt: new Date().toISOString()
            };
            setTasks([...tasks, newGuestTask]);
            setNewTask({ title: '', description: '' });
            setIsModalOpen(false);
            return;
        }

        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const res = await axios.post('/api/tasks', newTask, config);
            setTasks([...tasks, res.data]);
            setNewTask({ title: '', description: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        if (user?.isGuest) {
            setTasks(tasks.filter((task) => task._id !== id));
            return;
        }

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

        if (user?.isGuest) {
            setTasks(tasks.map(t => t._id === currentTask._id ? { ...t, ...editTask } : t));
            setIsEditModalOpen(false);
            return;
        }

        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const res = await axios.put(`/api/tasks/${currentTask._id}`, editTask, config);
            setTasks(tasks.map(t => t._id === currentTask._id ? res.data : t));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        // Optimistic update
        const updatedTask = { ...task, status: newStatus };
        setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));

        if (user?.isGuest) return;

        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.put(`/api/tasks/${task._id}`, { status: newStatus }, config);
        } catch (error) {
            console.error(error);
            // Revert on error
            setTasks(tasks.map(t => t._id === task._id ? task : t));
        }
    };

    const stats = [
        { label: "Total Tasks", value: tasks.length, icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
        { label: "Completed", value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
        { label: "In Progress", value: tasks.filter(t => t.status === 'in_progress').length, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
        { label: "Pending", value: tasks.filter(t => t.status === 'pending').length, icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
    ];

    if (loading || (user && isLoading)) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="mt-1 text-slate-500">Welcome back, {user?.name}</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                </Button>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="flex items-center gap-4 p-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Recent Tasks</h2>

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
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">No tasks yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Get started by creating your first task.</p>
                    <Button variant="secondary" className="mt-4" onClick={() => setIsModalOpen(true)}>
                        Create Task
                    </Button>
                </div>
            )}

            {/* Create Task Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Task"
            >
                <form onSubmit={handleCreateTask} className="space-y-4">
                    <Input
                        label="Task Title"
                        placeholder="What needs to be done?"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        autoFocus
                        required
                    />
                    <Textarea
                        label="Description"
                        placeholder="Add some details..."
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Status
                        </label>
                        <select
                            value={newTask.status || 'pending'}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                            className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!newTask.title.trim()}>
                            Create Task
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Task Modal */}
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

export default Dashboard;
