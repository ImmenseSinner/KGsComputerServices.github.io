import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, User, Lock, Users } from "lucide-react";

interface LoginFormData {
  role: string;
  id: string;
  password: string;
}

export function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    role: "student",
    id: "",
    password: "",
  });
  const [activeView, setActiveView] = useState<"login" | "studentReg" | "lecturerReg">("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Mock authentication logic (simulating localStorage from uploaded docs)
    const mockUsers = {
      student: { id: "STU123456", password: "student123", role: "student", username: "John Doe" },
      lecturer: { id: "LEC123456", password: "lecturer123", role: "instructor", username: "Dr. Smith" },
      admin: { id: "ADMIN001", password: "admin123", role: "admin", username: "Admin" }
    };

    const user = mockUsers[formData.role as keyof typeof mockUsers];

    if (formData.id === user.id && formData.password === user.password) {
      // Simulate login success
      localStorage.setItem("hubUser", JSON.stringify({ ...user, username: user.username }));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try STU123456 / student123 or LEC123456 / lecturer123");
    }
  };

  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Registration successful! Your Student ID: STU" + Math.floor(100000 + Math.random() * 900000));
    setTimeout(() => {
      setActiveView("login");
      setSuccess("");
    }, 2000);
  };

  const handleLecturerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Application submitted. Awaiting admin approval.");
    setTimeout(() => {
      setActiveView("login");
      setSuccess("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-900 via-steel-800 to-steel-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-weld-600 rounded-2xl flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="font-bold text-3xl text-steel-900">LearnHub</div>
            <div className="text-xs text-steel-500 -mt-1">LMS Platform</div>
          </div>
        </div>

        {/* Login View */}
        {activeView === "login" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-steel-900">Sign In to LearnHub</h2>
            
            {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl mb-4 text-sm">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-steel-700 mb-1.5">Role</label>
                <select 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 border border-steel-200 rounded-2xl focus:outline-none focus:border-weld-500"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-steel-700 mb-1.5">ID / Email</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-steel-400" />
                  <input 
                    type="text" 
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-steel-200 rounded-2xl focus:outline-none focus:border-weld-500" 
                    placeholder="STU123456 or email" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-steel-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-steel-400" />
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 border border-steel-200 rounded-2xl focus:outline-none focus:border-weld-500" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-weld-600 hover:bg-weld-700 transition-colors py-4 rounded-2xl font-semibold text-white"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm space-y-1">
              <button onClick={() => setActiveView("studentReg")} className="text-weld-600 hover:underline block w-full">New Student? Register here</button>
              <button onClick={() => setActiveView("lecturerReg")} className="text-weld-600 hover:underline block w-full">Lecturer Application</button>
            </div>
          </div>
        )}

        {/* Student Registration */}
        {activeView === "studentReg" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Student Registration</h2>
            {success && <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-4 text-sm">{success}</div>}
            <form onSubmit={handleStudentRegister} className="space-y-4">
              <div><label className="text-sm font-semibold">Full Name</label><input type="text" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" placeholder="John Doe" required /></div>
              <div><label className="text-sm font-semibold">ID Number (National ID)</label><input type="text" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" placeholder="9001015080080" required /></div>
              <div><label className="text-sm font-semibold">Email</label><input type="email" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" placeholder="john@example.com" required /></div>
              <div><label className="text-sm font-semibold">Password</label><input type="password" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" placeholder="min 6 chars" required /></div>
              <button type="submit" className="w-full bg-green-600 py-4 rounded-2xl text-white font-semibold">Register</button>
              <button type="button" onClick={() => setActiveView("login")} className="w-full text-sm text-steel-600">Back to Login</button>
            </form>
          </div>
        )}

        {/* Lecturer Registration */}
        {activeView === "lecturerReg" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Lecturer Application</h2>
            {success && <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-4 text-sm">{success}</div>}
            <form onSubmit={handleLecturerRegister} className="space-y-4">
              <div><label className="text-sm font-semibold">Full Name</label><input type="text" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" required /></div>
              <div><label className="text-sm font-semibold">Email</label><input type="email" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" required /></div>
              <div><label className="text-sm font-semibold">Password</label><input type="password" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" required /></div>
              <div><label className="text-sm font-semibold">Department</label><input type="text" className="w-full px-4 py-3 border border-steel-200 rounded-2xl" placeholder="Engineering" /></div>
              <button type="submit" className="w-full bg-weld-600 py-4 rounded-2xl text-white font-semibold">Submit Application</button>
              <button type="button" onClick={() => setActiveView("login")} className="w-full text-sm text-steel-600">Back</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
