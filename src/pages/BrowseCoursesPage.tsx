import { useState } from "react";
import { Search, Users, Clock, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  description: string;
  level: string;
}

export function BrowseCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const allCourses: Course[] = [
    { id: "CRS101", code: "CS101", title: "Introduction to Programming", instructor: "Dr. Sarah Johnson", duration: "12 weeks", students: 124, description: "Learn Python fundamentals.", level: "Beginner" },
    { id: "CRS102", code: "CS201", title: "Advanced Database Systems", instructor: "Prof. Michael Chen", duration: "10 weeks", students: 89, description: "Master SQL and NoSQL.", level: "Intermediate" },
    { id: "CRS103", code: "ENG301", title: "Engineering Mathematics", instructor: "Dr. Emily Watson", duration: "14 weeks", students: 67, description: "Advanced calculus for engineers.", level: "Advanced" },
    { id: "CRS104", code: "CS301", title: "Machine Learning Fundamentals", instructor: "Dr. Sarah Johnson", duration: "8 weeks", students: 102, description: "Introduction to ML concepts.", level: "Intermediate" },
    { id: "CRS105", code: "ENG205", title: "Structural Analysis", instructor: "Prof. David Lee", duration: "12 weeks", students: 54, description: "Analysis of steel structures.", level: "Advanced" },
  ];

  const filtered = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-steel-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Browse Courses</h1>
            <p className="text-steel-600 mt-1">Discover new learning opportunities</p>
          </div>
          <Link to="/mycourses" className="px-5 py-2.5 rounded-2xl border text-sm">Back to My Courses</Link>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-4 h-5 w-5 text-steel-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-12 py-3 bg-white border rounded-2xl"
            />
          </div>
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="px-4 py-3 border bg-white rounded-2xl">
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <div key={course.id} className="bg-white rounded-3xl border overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-3 py-1 bg-steel-100 rounded-full font-mono">{course.code}</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-weld-100 text-weld-700 rounded-full">{course.level}</span>
                </div>

                <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                <p className="text-sm text-steel-600 mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-xs text-steel-500 mb-6">
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</div>
                  <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students} students</div>
                </div>

                <div className="text-sm mb-4">
                  <span className="font-medium">Instructor:</span> {course.instructor}
                </div>

                <Link 
                  to={`/course/${course.id}`} 
                  className="block w-full text-center bg-weld-600 hover:bg-weld-700 py-3 rounded-2xl text-white font-semibold text-sm"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
