export default function ComputerEngineeringFirst() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 text-[#0f2d5c]">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">
          ชื่อปริญญา
        </h2>

        <div className="space-y-2 pl-4">
          <p>
            <span className="font-medium">ชื่อเต็ม :</span>{" "}
            วิศวกรรมศาสตรบัณฑิต (วิศวกรรมคอมพิวเตอร์)
          </p>

          <p className="text-slate-600">
            Bachelor of Engineering (Computer Engineering)
          </p>

          <p>
            <span className="font-medium">ชื่อย่อ :</span>{" "}
            วศ.บ. (วิศวกรรมคอมพิวเตอร์)
          </p>

          <p className="text-slate-600">
            B.Eng. (Computer Engineering)
          </p>
        </div>
      </section>

      {/* จำนวนหน่วยกิต */}
      <section>
        <h2 className="text-xl font-semibold border-l-4 border-blue-500 pl-3 mb-3">
          หลักสูตร
        </h2>

        <div className="bg-slate-50 rounded-lg p-4 border">
          จำนวนหน่วยกิตรวมตลอดหลักสูตร{" "}
          <span className="font-bold text-blue-600">
            ไม่น้อยกว่า 134 หน่วยกิต
          </span>
        </div>
      </section>

      {/* โครงสร้างหลักสูตร */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">
          โครงสร้างหลักสูตร
        </h2>

        {/* หมวดวิชาศึกษาทั่วไป */}
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold text-lg">
            1) หมวดวิชาศึกษาทั่วไป
          </h3>

          <p className="text-blue-600 font-medium mb-3">
            ไม่น้อยกว่า 30 หน่วยกิต
          </p>

          <ul className="space-y-2 list-disc ml-6">
            <li>กลุ่มสาระอยู่ดีมีสุข ไม่น้อยกว่า 3 หน่วยกิต</li>
            <li>กลุ่มสาระศาสตร์แห่งผู้ประกอบการ ไม่น้อยกว่า 6 หน่วยกิต</li>
            <li>กลุ่มสาระภาษา กับการสื่อสาร 13 หน่วยกิต</li>
            <li>กลุ่มสาระพลเมืองไทยและพลเมืองโลก ไม่น้อยกว่า 5 หน่วยกิต</li>
            <li>กลุ่มสาระสุนทรียศาสตร์ ไม่น้อยกว่า 3 หน่วยกิต</li>
          </ul>
        </div>

        {/* หมวดวิชาเฉพาะ */}
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold text-lg">
            2) หมวดวิชาเฉพาะ
          </h3>

          <p className="text-blue-600 font-medium mb-3">
            ไม่น้อยกว่า 98 หน่วยกิต
          </p>

          <ul className="space-y-2 list-disc ml-6">
            <li>วิชาแกน 30 หน่วยกิต</li>
            <li>
              วิชาเฉพาะด้าน 49 หน่วยกิต
              <ul className="list-[circle] ml-6 mt-2 space-y-1">
                <li>กลุ่มฮาร์ดแวร์และสถาปัตยกรรมคอมพิวเตอร์ 12 หน่วยกิต</li>
                <li>กลุ่มโครงสร้างพื้นฐานของระบบ 18 หน่วยกิต</li>
                <li>กลุ่มเทคโนโลยีและวิธีการทางซอฟต์แวร์ 13 หน่วยกิต</li>
                <li>กลุ่มเทคโนโลยีเพื่องานประยุกต์ 6 หน่วยกิต</li>
              </ul>
            </li>
            <li>วิชาเลือก ไม่น้อยกว่า 19 หน่วยกิต</li>
          </ul>
        </div>

        {/* เสรี */}
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold text-lg">
            3) หมวดวิชาเลือกเสรี
          </h3>

          <p className="text-blue-600 font-medium">
            ไม่น้อยกว่า 6 หน่วยกิต
          </p>
        </div>

        {/* กิจกรรม */}
        <div className="rounded-xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold text-lg">
            4) หมวดการฝึกงาน
          </h3>

          <ul className="space-y-2 list-disc ml-6 mt-3">
            <li>แผนสหกิจศึกษา 0 ชั่วโมง</li>
            <li>แผนไม่สหกิจศึกษา 240 ชั่วโมง</li>
          </ul>
        </div>
      </section>
    </div>
  );
}