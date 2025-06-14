"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, isToday, isTomorrow, startOfDay } from "date-fns"
import { useTasks } from "../context/TaskContext"

export default function TaskSidebar() {
  const { tasks, loading } = useTasks();

  const getTaskDateLabel = (date: string) => {
    const taskDate = new Date(date);
    if (isToday(taskDate)) return "Today";
    if (isTomorrow(taskDate)) return "Tomorrow";
    return format(taskDate, "MMM d, yyyy");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'missed':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  // Filter and sort tasks
  const upcomingTasks = tasks
    .filter(task => task.status === 'pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (loading) {
    return (
      <Card className="w-80 h-full">
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTasks.length === 0 ? (
            <p className="text-sm sm:text-base text-gray-500">No pending tasks</p>
          ) : (
            upcomingTasks.map(task => (
              <div
                key={task._id}
                className="p-3 sm:p-4 rounded-lg border border-yellow-500 bg-yellow-900/20"
              >
                <div className="font-bold text-sm sm:text-base">{task.title}</div>
                <div className="text-xs sm:text-sm text-gray-400">{task.description}</div>
                <div className="text-xs sm:text-sm text-yellow-500 mt-2">
                  Due: {format(new Date(task.date), "MMM d, yyyy")}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 