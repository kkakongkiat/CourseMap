"use client";

import { useState, useEffect } from "react";
import { ChevronDown, University, GraduationCap, Bookmark, LucideIcon } from "lucide-react";
import facultyService, { Faculty } from "../service/faculty.service";
import departmentService, { Department } from "../service/department.service";
import courseService, { Course } from "../service/course.service";
import PlanTable from "../components/planTable";
import subjectService, { CourseSubjectItem } from "../service/subject.service";

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
  
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [courseSubjects, setCourseSubjects] = useState<CourseSubjectItem[]>([]);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

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

  // เมื่อเลือกแผนการเรียน (Course) ให้ดึงข้อมูลรายละเอียดและรายวิชาที่จัดเรียงปี/เทอมมาแล้ว พร้อมกัน
  useEffect(() => {
    if (plan) {
      setIsLoadingPlan(true);
      Promise.all([
        courseService.getById(plan as number),
        subjectService.getByCourseId(plan as number)
      ]).then(([courseRes, subjectsRes]) => {
        setSelectedCourseDetail(courseRes);
        setCourseSubjects(subjectsRes);
      })
      .catch(err => console.error("Error fetching plan details:", err))
      .finally(() => setIsLoadingPlan(false));
    } else {
      setSelectedCourseDetail(null);
      setCourseSubjects([]);
    }
  }, [plan]);

  // จัดกลุ่มรายวิชาตาม ปี (year) และ เทอม (semester) พร้อมรองรับกรณีเป็น null
  const groupedSubjects = courseSubjects.reduce((acc, curr) => {
    const y = curr.year ?? 0;
    const s = curr.semester ?? 0;
    const key = `${y}-${s}`;
    if (!acc[key]) {
      acc[key] = { year: y, semester: s, courses: [] };
    }
    acc[key].courses.push(curr);
    return acc;
  }, {} as Record<string, { year: number; semester: number; courses: CourseSubjectItem[] }>);

  // แปลงจาก Object คืนเป็น Array และจัดเรียง ปี/เทอม ให้ถูกต้อง (นำปีที่ไม่ได้ระบุไว้ล่างสุด)
  const planGroups = Object.values(groupedSubjects).sort((a, b) => {
    const yearA = a.year === 0 ? 99 : a.year;
    const yearB = b.year === 0 ? 99 : b.year;
    if (yearA !== yearB) return yearA - yearB;

    const semA = a.semester === 0 ? 99 : a.semester;
    const semB = b.semester === 0 ? 99 : b.semester;
    return semA - semB;
  });

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

        {/* ส่วนแสดงสถานะกำลังโหลด */}
        {isLoadingPlan && (
          <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 animate-in fade-in duration-300">
            <div className="w-8 h-8 border-4 border-[#e6f1fb] border-t-[#1a6fcc] rounded-full animate-spin mb-4"></div>
            <p className="text-[#0f2d5c] font-medium text-sm">กำลังโหลดข้อมูลแผนการเรียน...</p>
          </div>
        )}

        {/* ส่วนแสดงหน้าแผนการเรียนที่ดึงมาตาม Course (Plan) ที่เลือก */}
        {!isLoadingPlan && selectedCourseDetail && (
          <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-[#0f2d5c] mb-2">
              {selectedCourseDetail.thai_name || "ไม่มีชื่อแผนการเรียน"}
            </h2>
            {selectedCourseDetail.eng_name && (
              <p className="text-gray-500 mb-6">{selectedCourseDetail.eng_name}</p>
            )}
            
            <div className="flex flex-col gap-6">
              {planGroups.map((group, idx) => (
                <PlanTable 
                  key={idx} 
                  year={group.year} 
                  semester={group.semester} 
                  subjects={group.courses.map(cs => ({
                    subject_code: cs.subject?.subject_code || "-",
                    thai_name: cs.subject?.thai_name || "ไม่มีชื่อวิชา",
                    eng_name: cs.subject?.eng_name || "",
                    credit: cs.subject?.credit || 0,
                    require_subjects: cs.subject?.require_subjects
                      ?.filter(req => req.required_subject?.subject_code) // กรองเอาเฉพาะอันที่มีวิชาบังคับก่อนจริงๆ
                      .map(req => ({
                        subject_code: req.required_subject?.subject_code || "",
                        thai_name: req.required_subject?.thai_name || "",
                        eng_name: req.required_subject?.eng_name || "",
                      })) || []
                  }))} 
                />
              ))}
              {planGroups.length === 0 && (
                <p className="text-center text-gray-500 py-4">ยังไม่มีข้อมูลรายวิชาในแผนการเรียนนี้</p>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}