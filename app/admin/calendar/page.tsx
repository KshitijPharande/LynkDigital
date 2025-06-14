"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"
import { motion } from "framer-motion"
import TaskSidebar from "../components/TaskSidebar"
import { TaskProvider, useTasks } from "../context/TaskContext"

function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd")
  });

  const { tasks, createTask, updateTaskStatus, deleteTask } = useTasks();

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.date), date));
  };

  const getDateStatus = (date: Date) => {
    const dateTasks = getTasksForDate(date);
    if (dateTasks.length === 0) return 'default';
    
    const hasCompleted = dateTasks.some(task => task.status === 'completed');
    const hasMissed = dateTasks.some(task => task.status === 'missed');
    const hasPending = dateTasks.some(task => task.status === 'pending');

    if (hasCompleted && !hasMissed && !hasPending) return 'completed';
    if (hasMissed) return 'missed';
    if (hasPending) return 'pending';
    return 'default';
  };

  const handleCreateTask = async () => {
    try {
      await createTask({
        title: newTask.title,
        description: newTask.description,
        date: newTask.date,
        status: 'pending'
      });
      toast.success("Task created successfully");
      setShowTaskModal(false);
      setNewTask({ title: "", description: "", date: format(new Date(), "yyyy-MM-dd") });
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: 'completed' | 'missed') => {
    try {
      await updateTaskStatus(taskId, status);
      toast.success("Task status updated");
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                Previous
              </Button>
              <h2 className="text-xl font-bold">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                Next
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold p-1 sm:p-2 text-xs sm:text-sm">
                  {day}
                </div>
              ))}
              {days.map((day, dayIdx) => {
                const status = getDateStatus(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isCurrentDay = isToday(day);
                
                return (
                  <div
                    key={day.toString()}
                    className={`
                      p-1 sm:p-2 min-h-[60px] sm:min-h-[100px] border rounded-lg cursor-pointer text-xs sm:text-sm
                      ${!isCurrentMonth ? 'bg-gray-100 text-gray-400' : ''}
                      ${isCurrentDay ? 'border-blue-500' : ''}
                      ${status === 'completed' ? 'bg-green-100' : ''}
                      ${status === 'missed' ? 'bg-red-100' : ''}
                      ${status === 'pending' ? 'bg-yellow-100' : ''}
                    `}
                    onClick={() => {
                      setSelectedDate(day);
                      setShowTaskList(true);
                    }}
                  >
                    <div className="font-bold">{format(day, "d")}</div>
                    <div className="text-xs">
                      {getTasksForDate(day).map(task => (
                        <div
                          key={task._id}
                          className={`
                            truncate p-0.5 sm:p-1 rounded text-[10px] sm:text-xs
                            ${task.status === 'completed' ? 'bg-green-200' : ''}
                            ${task.status === 'missed' ? 'bg-red-200' : ''}
                            ${task.status === 'pending' ? 'bg-yellow-200' : ''}
                          `}
                        >
                          {task.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Task Creation Modal */}
        {showTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md border border-zinc-800"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Create New Task</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="bg-zinc-800 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="bg-zinc-800 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    className="bg-zinc-800 text-white"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleCreateTask}>
                    Create Task
                  </Button>
                  <Button className="flex-1 bg-zinc-700 hover:bg-zinc-600" onClick={() => setShowTaskModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Task List Modal */}
        {showTaskList && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md border border-zinc-800"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                Tasks for {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              <div className="space-y-4">
                {getTasksForDate(selectedDate).map(task => (
                  <div
                    key={task._id}
                    className={`
                      p-3 sm:p-4 rounded-lg border
                      ${task.status === 'completed' ? 'bg-green-900/20 border-green-500' : ''}
                      ${task.status === 'missed' ? 'bg-red-900/20 border-red-500' : ''}
                      ${task.status === 'pending' ? 'bg-yellow-900/20 border-yellow-500' : ''}
                    `}
                  >
                    <div className="font-bold text-sm sm:text-base">{task.title}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{task.description}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                            onClick={() => handleUpdateTaskStatus(task._id, 'completed')}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
                            onClick={() => handleUpdateTaskStatus(task._id, 'missed')}
                          >
                            Mark as Missed
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs sm:text-sm"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 mt-6">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                    onClick={() => {
                      setShowTaskList(false);
                      setShowTaskModal(true);
                      setNewTask({
                        ...newTask,
                        date: format(selectedDate, "yyyy-MM-dd")
                      });
                    }}
                  >
                    Add New Task
                  </Button>
                  <Button
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-xs sm:text-sm"
                    onClick={() => setShowTaskList(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <Button
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl shadow-lg"
          onClick={() => {
            setSelectedDate(new Date());
            setShowTaskModal(true);
          }}
        >
          +
        </Button>
      </div>

      {/* Task Sidebar */}
      <div className="lg:w-80">
        <TaskSidebar />
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <TaskProvider>
      <CalendarContent />
    </TaskProvider>
  );
} 