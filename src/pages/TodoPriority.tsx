
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  assignee: string;
}

const TodoPriority = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("hackstack-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");
  const [newAssignee, setNewAssignee] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("hackstack-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      priority: newPriority,
      assignee: newAssignee.trim() || "Me",
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setNewAssignee("");
    setNewPriority("medium");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const priorityColors = {
    low: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    high: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-100 to-white dark:from-green-950 dark:to-gray-900" />
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Priority To-Do List
            </h1>
            <p className="text-lg text-muted-foreground">
              Keep track of tasks with priority levels and assignments
            </p>
          </div>
        </div>
      </section>
      
      {/* Todo App */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <Card className="max-w-3xl mx-auto shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center">My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Task Form */}
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="flex-grow"
                />
                
                <div className="flex gap-2">
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  
                  <Input
                    placeholder="Assignee"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-24 md:w-32"
                  />
                  
                  <Button 
                    onClick={addTask} 
                    variant="default" 
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex justify-center space-x-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={filter === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("active")}
                >
                  Active
                </Button>
                <Button
                  variant={filter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No tasks to show. Add some tasks to get started!
                  </p>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={cn(
                        "group flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all",
                        task.completed
                          ? "bg-muted/40 border-muted"
                          : "bg-card border-border"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={cn(
                            "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
                            task.completed
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-gray-300 dark:border-gray-600"
                          )}
                        >
                          {task.completed && <Check size={12} />}
                        </button>
                        
                        <span
                          className={cn(
                            "transition-all",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.text}
                        </span>
                        
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            priorityColors[task.priority]
                          )}
                        >
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground"
                          title={task.assignee}
                        >
                          {getInitials(task.assignee)}
                        </div>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>{filteredTasks.length} tasks</span>
              {tasks.length > 0 && (
                <button
                  onClick={() => setTasks([])}
                  className="text-destructive hover:underline"
                >
                  Clear All
                </button>
              )}
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Features</h2>
            <p className="text-muted-foreground mt-2">
              This to-do component comes with everything you need
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Task Status</h3>
              <p className="text-sm text-muted-foreground">Complete or reactivate tasks</p>
            </div>
            <div className="p-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 8.75V19" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8.75H19" />
                </svg>
              </div>
              <h3 className="font-medium">Priority Levels</h3>
              <p className="text-sm text-muted-foreground">Low, Medium, and High</p>
            </div>
            <div className="p-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14" />
                </svg>
              </div>
              <h3 className="font-medium">Task Assignment</h3>
              <p className="text-sm text-muted-foreground">Assign tasks to team members</p>
            </div>
            <div className="p-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.25 11.25L17.6644 6.20919C17.4191 5.34768 16.6344 4.75 15.7414 4.75H8.2586C7.36561 4.75 6.58087 5.34768 6.33555 6.20919L4.75 11.25" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.2142 12.3689C9.95611 12.0327 9.59467 11.75 9.17085 11.75H4.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V11.75H14.8291C14.4053 11.75 14.0439 12.0327 13.7858 12.3689C13.3745 12.9046 12.7276 13.25 12 13.25C11.2724 13.25 10.6255 12.9046 10.2142 12.3689Z" />
                </svg>
              </div>
              <h3 className="font-medium">Local Storage</h3>
              <p className="text-sm text-muted-foreground">Tasks persist between sessions</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TodoPriority;
