"use client";

import { useState, useEffect } from "react";
import { ChevronDown, University, GraduationCap, Bookmark, LucideIcon } from "lucide-react";
import facultyService, { Faculty } from "../service/faculty.service";
import departmentService, { Department } from "../service/department.service";
import courseService, { Course } from "../service/course.service";

function Dropdown({
  logo: Logo,
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: {
  logo?: LucideIcon;
  label: string;
  placeholder: string;
  options: { id: number; name: string }[];
  value: number | "";
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedName = options.find((opt) => opt.id === value)?.name || "";

  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="flex items-center gap-1.5 ml-0.5">
        {Logo && <Logo size={24} className="text-[#0f2d5c]" />}
        <label className="text-sm font-semibold text-[#0f2d5c]">{label}</label>
      </div>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}
          className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border text-sm bg-white transition-all
            ${open ? "border-[#1a6fcc] ring-2 ring-[#1a6fcc]/10" : "border-gray-200 hover:border-[#1a6fcc]/40"}`}
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>{selectedName || placeholder}</span>
          <ChevronDown
            size={15}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => { onChange(opt.id); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#e6f1fb] hover:text-[#1a6fcc] transition-colors
                  ${value === opt.id ? "bg-[#e6f1fb] text-[#1a6fcc] font-medium" : "text-gray-700"}`}
              >
                {opt.name}
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-4 py-2.5 text-sm text-gray-400">ไม่มีข้อมูล</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PlanPage() {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);

  const [faculty, setFaculty] = useState<number | "">("");
  const [major, setMajor] = useState<number | "">("");
  const [plan, setPlan] = useState<number | "">("");

  useEffect(() => {
    Promise.all([
      facultyService.getAll(),
      departmentService.getAll(),
      courseService.getAll()
    ]).then(([faculties, departments, courses]) => {
      setFacultyList(faculties);
      setDepartmentList(departments);
      setCourseList(courses);
    }).catch(err => console.error("Error fetching options:", err));
  }, []);

  // เตรียม Options สำหรับ Dropdown พร้อมทำ Matching Data
  const facultyOptions = facultyList.map(f => ({ id: f.id, name: f.thai_name || `คณะ ${f.id}` }));
  
  const majorOptions = departmentList
    .filter(d => d.faculty_id === faculty)
    .map(d => ({ id: d.id, name: d.thai_name || `สาขา ${d.id}` }));
    
  const planOptions = courseList
    .filter(c => c.department_id === major)
    .map(c => ({ id: c.id, name: c.thai_name || `แผน ${c.id}` }));

  // หา Course ที่ถูกเลือกเพื่อดึงข้อมูลแผนการเรียนมาแสดงต่อ
  const selectedCourse = courseList.find(c => c.id === plan);

  return (
    <main className="min-h-screen bg-[#f7f9fc] flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-3xl">

        {/* Title */}
        <div className="text-center mb-10">

          <h1 className="text-2xl font-bold text-[#0f2d5c]">แผนการเรียน</h1>
          <p className="text-sm text-gray-400 mt-2">
            เลือกคณะ สาขา และแผนการเรียนเพื่อดูแผนการเรียน
          </p>
        </div>

        {/* Dropdowns */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row gap-4">
          <Dropdown
            logo={University}
            label="คณะ"
            placeholder="เลือกคณะ"
            options={facultyOptions}
            value={faculty}
            onChange={(val) => {
              setFaculty(val);
              setMajor(""); // รีเซ็ตสาขาเมื่อเปลี่ยนคณะ
              setPlan("");  // รีเซ็ตแผนการเรียนเมื่อเปลี่ยนคณะ
            }}
          />
          <Dropdown
            logo={Bookmark}
            label="สาขา"
            placeholder="เลือกสาขา"
            options={majorOptions}
            value={major}
            onChange={(val) => {
              setMajor(val);
              setPlan("");  // รีเซ็ตแผนการเรียนเมื่อเปลี่ยนสาขา
            }}
            disabled={!faculty} // ไม่สามารถเลือกสาขาได้หากยังไม่เลือกคณะ
          />
          <Dropdown
            logo={GraduationCap}
            label="แผนการเรียน"
            placeholder="เลือกแผนการเรียน"
            options={planOptions}
            value={plan}
            onChange={setPlan}
            disabled={!major} // ไม่สามารถเลือกแผนการเรียนได้หากยังไม่เลือกสาขา
          />
        </div>

        {/* ส่วนแสดงหน้าแผนการเรียนที่ดึงมาตาม Course (Plan) ที่เลือก */}
        {selectedCourse && (
          <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-[#0f2d5c] mb-2">
              {selectedCourse.thai_name || "ไม่มีชื่อแผนการเรียน"}
            </h2>
            {selectedCourse.eng_name && (
              <p className="text-gray-500 mb-6">{selectedCourse.eng_name}</p>
            )}
            

          </div>
        )}

      </div>
    </main>
  );
}