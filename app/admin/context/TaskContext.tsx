"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import axios from "axios"

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'missed';
  createdAt: string;
  completedAt?: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, '_id' | 'createdAt' | 'completedAt'>) => Promise<void>;
  updateTaskStatus: (taskId: string, status: 'completed' | 'missed') => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Omit<Task, '_id' | 'createdAt' | 'completedAt'>) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/api/tasks`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(prev => [...prev, data]);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTaskStatus = async (taskId: string, status: 'completed' | 'missed') => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/api/tasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(prev => prev.map(task => task._id === taskId ? data : task));
    } catch (error) {
      console.error("Failed to update task status:", error);
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_URL}/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, createTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
} 