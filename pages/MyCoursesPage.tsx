import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, Users, Clock, Award, Search, Filter, 
  Play, Download, CheckCircle 
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  progress: number;
  description: string;
  modules: number;
  status: string;
}

export function MyCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courses] = useState<Course[]>([
    {
      id: "CRS101",
      code: "CS101",
      title: "Introduction to Programming",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      students: 45,
      progress: 78,
      description: "Learn Python fundamentals and core programming concepts.",
      modules: 8,
      status: "active"
    },
    {
      id: "CRS102",
      code: "CS201",
      title: "Advanced Database Systems",
      instructor: "Prof. Michael Chen",
      duration: "10 weeks",
      students: 32,
      progress: 100,
      description: "Master SQL, NoSQL and database design principles.",
      modules: 6,
      status: "completed"
    },
    {
      id: "CRS103",
      code: "ENG301",
      title: "Engineering Mathematics",
      instructor: "Dr. Emily Watson",
      duration: "14 weeks",
      students: 28,
      progress: 45,
      description: "Advanced calculus and linear algebra for engineers.",
      modules: 10,
      status: "active"
    }
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && course.progress < 100) || 
                         (statusFilter === "completed" && course.progress === 100);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Top Nav */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-weld-600" />
            <div className="font-bold text-2xl">LearnHub</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/dashboard" className="hover:text-weld-600">Dashboard</Link>
            <Link to="/mycourses" className="font-semibold text-weld-600">My Courses</Link>
            <Link to="/assignments" className="hover:text-weld-600">Assignments</Link>
            <Link to="/login" className="text-red-600">Logout</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Courses</h1>
            <p className="text-steel-600 mt-1">Track progress and continue your learning journey</p>
          </div>
          <Link 
            to="/browse-courses" 
            className="px-6 py-3 bg-weld-600 text-white rounded-2xl font-semibold flex items-center gap-2 hover:bg-weld-700"
          >
            Browse All Courses
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-4 text-steel-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 py-3 bg-white border border-steel-200 rounded-2xl"
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-steel-200 bg-white rounded-2xl"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl border border-steel-200 overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-2 bg-gradient-to-r from-weld-400 to-weld-600" />
                
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <div className="px-3 py-1 bg-steel-100 rounded-full text-xs font-bold tracking-wider">{course.code}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${course.progress === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {course.progress === 100 ? "Completed" : "Active"}
                    </div>
                  </div>

                  <h3 className="font-bold text-xl mb-1 group-hover:text-weld-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-steel-600 mb-4">by {course.instructor}</p>

                  <div className="flex items-center gap-4 text-sm text-steel-600 mb-5">
                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</div>
                    <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.students}</div>
                    <div className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.modules} modules</div>
                  </div>

                  <p className="text-sm text-steel-600 line-clamp-2 mb-6">{course.description}</p>

                  {/* Progress */}
                  {course.progress > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-steel-200 rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-weld-600 transition-all" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link 
                      to={`/course/${course.id}`} 
                      className="flex-1 bg-weld-600 hover:bg-weld-700 transition-colors text-white text-center py-3 rounded-2xl text-sm font-semibold"
                    >
                      {course.progress === 100 ? "Review Course" : "Continue Learning"}
                    </Link>
                    
                    <button className="px-4 border border-steel-300 hover:bg-steel-50 rounded-2xl flex items-center">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-steel-300 mb-4" />
              <p className="text-steel-600">No courses found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
