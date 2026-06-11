"use client";

import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type CourseNodeData = {
  code: string;
  thai_name: string;
  eng_name: string;
  color: string;
  period: string;
};

export type CourseFlowNode = Node<CourseNodeData, "course">;

export default function CourseNode({
  data,
  selected,
}: NodeProps<CourseFlowNode>) {
  return (
    <>
      <Handle
        id="target-left"
        type="target"
        position={Position.Left}
      />

      <div
        className={`w-[240px] rounded-lg border p-3 shadow-sm transition-[border-color,box-shadow] ${
          selected
            ? "border-red-600 ring-4 ring-red-500/20"
            : "border-black/10"
        }`}
        style={{ backgroundColor: data.color }}
      >
        <div className="text-sm font-bold text-slate-900">{data.code}</div>
        <div className="mt-1 line-clamp-2 text-xs text-slate-700">
          {data.thai_name}
        </div>
        <div className="mt-1 text-xs text-slate-500">
          {data.eng_name}
        </div>
      </div>

      <Handle
        id="source-right"
        type="source"
        position={Position.Right}
      />
    </>
  );
}
