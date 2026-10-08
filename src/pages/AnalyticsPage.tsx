import { TrendingUp, Users, Award, BookOpen } from "lucide-react";

export function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-steel-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-steel-600 mb-8">Track student performance and course engagement</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border">
            <div className="text-sm text-steel-500">Total Enrollments</div>
            <div className="text-4xl font-bold mt-1">1,248</div>
            <div className="text-emerald-600 text-sm mt-1">↑ 18% this month</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <div className="text-sm text-steel-500">Average Completion</div>
            <div className="text-4xl font-bold mt-1">74%</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <div className="text-sm text-steel-500">Active Students</div>
            <div className="text-4xl font-bold mt-1">892</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <div className="text-sm text-steel-500">Avg. Grade</div>
            <div className="text-4xl font-bold mt-1">82%</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border">
          <h3 className="font-bold mb-6 text-xl">Course Performance Overview</h3>
          <div className="space-y-6">
            {[
              { name: "Introduction to Programming", enrolled: 124, completion: 91, avgGrade: "86%" },
              { name: "Advanced Database Systems", enrolled: 89, completion: 78, avgGrade: "81%" },
              { name: "Engineering Mathematics", enrolled: 67, completion: 65, avgGrade: "74%" },
            ].map((c, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-5 last:border-0">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-steel-500">{c.enrolled} students</div>
                </div>
                <div className="flex items-center gap-8 text-sm">
                  <div>Completion: <span className="font-semibold">{c.completion}%</span></div>
                  <div>Avg Grade: <span className="font-semibold">{c.avgGrade}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
