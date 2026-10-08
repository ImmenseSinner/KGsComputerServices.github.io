import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, Users, Clock, Award, TrendingUp, 
  Calendar, FileText, CheckCircle 
} from "lucide-react";

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
}

export function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Simulate auth from uploaded login system
    const storedUser = localStorage.getItem("hubUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Load role-based stats (inspired by Dashboard.html)
      if (parsedUser.role === "student") {
        setStats([
          { title: "Enrolled Courses", value: 4, icon: <BookOpen className="h-5 w-5" /> },
          { title: "Overall Progress", value: "78%", icon: <TrendingUp className="h-5 w-5" /> },
          { title: "Pending Tasks", value: 3, icon: <Clock className="h-5 w-5" /> },
          { title: "Average Grade", value: "86%", icon: <Award className="h-5 w-5" /> },
        ]);
      } else if (parsedUser.role === "instructor") {
        setStats([
          { title: "My Courses", value: 6, icon: <BookOpen className="h-5 w-5" /> },
          { title: "Total Students", value: 142, icon: <Users className="h-5 w-5" /> },
          { title: "Pending Grading", value: 18, icon: <FileText className="h-5 w-5" /> },
          { title: "Upcoming Deadlines", value: 5, icon: <Calendar className="h-5 w-5" /> },
        ]);
      } else {
        setStats([
          { title: "Total Students", value: 1248, icon: <Users className="h-5 w-5" /> },
          { title: "Total Lecturers", value: 47, icon: <Users className="h-5 w-5" /> },
          { title: "Total Courses", value: 89, icon: <BookOpen className="h-5 w-5" /> },
          { title: "Pending Approvals", value: 12, icon: <CheckCircle className="h-5 w-5" /> },
        ]);
      }

      // Recent activity from uploaded Dashboard.html logic
      setRecentActivity([
        { type: "assignment", description: "Assignment 3 due in 2 days", time: "2 hours ago" },
        { type: "upload", description: "New lecture video uploaded", time: "5 hours ago" },
        { type: "submission", description: "Quiz submitted for CS201", time: "Yesterday" },
      ]);
    }
  }, []);

  if (!user) {
    return <div className="p-8 text-center">Please log in to access the dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Header */}
      <div className="bg-white border-b border-steel-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-weld-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl">LearnHub</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold">{user.username}</div>
              <div className="text-xs text-steel-500 capitalize">{user.role}</div>
            </div>
            <Link to="/login" className="text-sm text-red-600 hover:text-red-700">Logout</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-steel-900">Welcome back, {user.username?.split(" ")[0]}!</h1>
          <p className="text-steel-600 mt-1">Here's what's happening with your learning today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl border border-steel-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-steel-500 tracking-wider">{stat.title}</div>
                  <div className="text-4xl font-bold text-steel-900 mt-2">{stat.value}</div>
                </div>
                <div className="text-weld-600 bg-weld-50 p-3 rounded-2xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-steel-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">Recent Activity</h3>
              <Link to="/activity" className="text-sm text-weld-600 hover:underline">View all</Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-steel-50 rounded-2xl">
                    <div className="w-10 h-10 bg-weld-100 rounded-full flex items-center justify-center text-weld-600">
                      {activity.type === "assignment" && <FileText className="h-5 w-5" />}
                      {activity.type === "upload" && <CheckCircle className="h-5 w-5" />}
                      {activity.type === "submission" && <Award className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-sm text-steel-500">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-steel-400">No recent activity</div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-steel-200 p-8">
            <h3 className="font-bold text-xl mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/mycourses" 
                className="flex items-center gap-4 p-4 bg-steel-50 hover:bg-steel-100 rounded-2xl transition-colors group"
              >
                <BookOpen className="h-5 w-5 text-weld-600" />
                <div>
                  <div className="font-semibold">Browse My Courses</div>
                  <div className="text-xs text-steel-500">Continue learning</div>
                </div>
              </Link>

              <Link 
                to="/assignments" 
                className="flex items-center gap-4 p-4 bg-steel-50 hover:bg-steel-100 rounded-2xl transition-colors group"
              >
                <FileText className="h-5 w-5 text-weld-600" />
                <div>
                  <div className="font-semibold">View Assignments</div>
                  <div className="text-xs text-steel-500">Due soon</div>
                </div>
              </Link>

              {user.role === "instructor" && (
                <Link 
                  to="/analytics" 
                  className="flex items-center gap-4 p-4 bg-steel-50 hover:bg-steel-100 rounded-2xl transition-colors group"
                >
                  <TrendingUp className="h-5 w-5 text-weld-600" />
                  <div>
                    <div className="font-semibold">Analytics Dashboard</div>
                    <div className="text-xs text-steel-500">Track performance</div>
                  </div>
                </Link>
              )}

              <Link 
                to="/enquiry" 
                className="flex items-center gap-4 p-4 bg-steel-50 hover:bg-steel-100 rounded-2xl transition-colors group"
              >
                <Users className="h-5 w-5 text-weld-600" />
                <div>
                  <div className="font-semibold">Submit Support Request</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
