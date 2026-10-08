import { useState } from "react";
import { FileText, Clock, Award, Upload, CheckCircle } from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  grade?: number;
  maxScore: number;
}

export function AssignmentsPage() {
  const [assignments] = useState<Assignment[]>([
    { id: 1, title: "Python Basics Quiz", course: "CS101", dueDate: "2026-06-25", status: "pending", maxScore: 20 },
    { id: 2, title: "Database Schema Design", course: "CS201", dueDate: "2026-06-22", status: "submitted", grade: 18, maxScore: 25 },
    { id: 3, title: "Linear Algebra Problem Set", course: "ENG301", dueDate: "2026-07-01", status: "pending", maxScore: 30 },
  ]);

  return (
    <div className="min-h-screen bg-steel-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Assignments</h1>
            <p className="text-steel-600">Manage and submit your coursework</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-weld-600 text-white rounded-2xl text-sm font-semibold">
            <Upload className="h-4 w-4" /> Submit New
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-steel-200 overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center bg-steel-50">
            <div className="font-semibold">All Assignments</div>
            <div className="text-xs text-steel-500">3 total • 1 submitted</div>
          </div>

          <div className="divide-y">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-6 flex items-center justify-between hover:bg-steel-50">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-weld-100 text-weld-700 rounded-2xl flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{assignment.title}</div>
                    <div className="text-sm text-steel-500">{assignment.course}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5 text-steel-600">
                    <Clock className="h-4 w-4" /> Due {assignment.dueDate}
                  </div>

                  {assignment.status === "submitted" ? (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle className="h-4 w-4" /> Submitted
                      {assignment.grade && <span className="font-bold">({assignment.grade}/{assignment.maxScore})</span>}
                    </div>
                  ) : (
                    <div className="text-orange-600 font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Pending
                    </div>
                  )}

                  <button className="px-5 py-1.5 text-xs bg-steel-900 text-white rounded-xl font-semibold">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
