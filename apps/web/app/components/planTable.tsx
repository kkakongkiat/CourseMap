"use client";

interface PlanSubject {
  subject_code: string;
  thai_name: string;
  eng_name?: string;
  credit: number;
  require_subjects?: { subject_code: string; thai_name: string; eng_name?: string }[];
}

interface PlanTableProps {
  year?: number | null;
  semester?: number | null;
  subjects: PlanSubject[];
}

// ── Component ─────────────────────────────────────────────────────────────
export default function PlanTable({ year, semester, subjects }: PlanTableProps) {
  const total = subjects.reduce((sum, subjectItem) => sum + subjectItem.credit, 0);
  const hasZeroCredit = subjects.some((subjectItem) => subjectItem.credit === 0);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">

      {/* Header */}
      <div className="bg-[#0f2d5c] px-5 py-3.5">
        <h2 className="text-sm font-bold text-white">
          {year && semester ? `ปีที่ ${year} ภาคการเรียนที่ ${semester}` : "หมวดวิชา (ไม่ระบุปีการศึกษา/ภาคเรียน)"}
        </h2>
      </div>

      {/* Table */}
      <div className="bg-white">

        {/* Sub-header */}
        <div className="flex items-center px-5 py-2.5 bg-[#f8fafc] border-b border-gray-200">
          <div className="flex-[2] text-xs text-gray-400" />
          <div className="flex-[5] text-xs text-gray-400" />
          <div className="w-32 text-xs text-gray-500 text-right font-medium">จำนวนหน่วยกิต</div>
        </div>

        {/* Rows */}
        {subjects.map((subjectItem, idx) => (
          <div
            key={`${subjectItem.subject_code}-${idx}`}
            className={`flex items-start px-5 py-3.5 gap-4 transition-colors hover:bg-[#f8fafc]
              ${idx !== subjects.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            {/* Code */}
            <div className="flex-[2] min-w-[90px]">
              {subjectItem.subject_code && (
                <span className="text-sm font-bold text-[#0f2d5c]">{subjectItem.subject_code}</span>
              )}
            </div>

            {/* Name + Prerequisites */}
            <div className="flex-[5] flex flex-col gap-1">
              <span className="text-sm text-gray-800">{subjectItem.thai_name}</span>
              {subjectItem.require_subjects && subjectItem.require_subjects.length > 0 && (
                <div className="flex flex-col gap-y-0.5 mt-1">
                  <span className="text-[11px] text-gray-400 font-medium">วิชาที่ต้องเรียนมาก่อน:</span>
                  {subjectItem.require_subjects.map((pre, i) => (
                    <span key={pre.subject_code || i} className="text-[11px] text-gray-400 ml-2">
                      {pre.subject_code} {pre.thai_name ? `· ${pre.thai_name}` : ""} {pre.eng_name ? `(${pre.eng_name})` : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Credits */}
            <div className="w-32 text-sm text-gray-700 text-right font-medium shrink-0">
              {subjectItem.credit === 0 ? "ตามหลักสูตรกำหนด" : subjectItem.credit}
            </div>
          </div>
        ))}

        {/* Total row */}
        <div className="flex items-center px-5 py-3.5 bg-[#f8fafc] border-t border-gray-200">
          <div className="flex-[2]" />
          <div className="flex-[5] text-sm font-bold text-[#0f2d5c]">รวม</div>
          <div className="w-32 text-sm font-bold text-[#0f2d5c] text-right whitespace-nowrap">
            {total}{hasZeroCredit ? " + เพิ่มตามหลักสูตร" : ""}
          </div>
        </div>

      </div>
    </div>
  );
}