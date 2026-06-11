"use client";

import {
  Background,
  BaseEdge,
  Controls,
  Edge,
  EdgeProps,
  MarkerType,
  Node,
  NodeProps,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useState } from "react";
import subjectService, {
  CourseSubjectItem,
} from "../service/subject.service";
import CourseNode, { CourseFlowNode } from "./course-node";

const semesterColors = [
  "#dcfce7",
  "#fef9c3",
  "#fee2e2",
  "#cffafe",
  "#f3e8ff",
  "#dbeafe",
  "#ffedd5",
  "#fce7f3",
];

const COLUMN_WIDTH = 350;
const ROW_HEIGHT = 150;
const HEADER_Y = -90;
const NODE_WIDTH = 240;
const NODE_SIDE_GAP = (COLUMN_WIDTH - NODE_WIDTH) / 2;
const ROW_LANE_Y = 115;
const ROW_LANE_GAP = 8;

type PeriodHeaderNodeData = {
  title: string;
  subtitle: string;
  color: string;
};

type PeriodHeaderFlowNode = Node<PeriodHeaderNodeData, "periodHeader">;
type RoutingBoundaryFlowNode = Node<Record<string, never>, "routingBoundary">;
type RoadmapNode =
  | CourseFlowNode
  | PeriodHeaderFlowNode
  | RoutingBoundaryFlowNode;

type RoadmapEdgeData = {
  route: "straight" | "single-bend" | "lane";
  bendX: number;
  sourceEscapeX: number;
  targetEscapeX: number;
  laneY: number;
};

type RoadmapFlowEdge = Edge<RoadmapEdgeData, "roadmap">;

function PeriodHeaderNode({ data }: NodeProps<PeriodHeaderFlowNode>) {
  return (
    <div
      className="w-[240px] border-b-4 bg-white px-4 py-3 text-center shadow-sm"
      style={{ borderColor: data.color }}
    >
      <div className="text-base font-bold text-slate-900">{data.title}</div>
      <div className="mt-0.5 text-xs text-slate-500">{data.subtitle}</div>
    </div>
  );
}

const nodeTypes = {
  course: CourseNode,
  periodHeader: PeriodHeaderNode,
  routingBoundary: () => <div className="h-px w-px opacity-0" />,
};

function RoadmapEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  data,
}: EdgeProps<RoadmapFlowEdge>) {
  if (!data) {
    return null;
  }

  const path =
    data.route === "straight"
      ? `M ${sourceX} ${sourceY} H ${targetX}`
      : data.route === "single-bend"
        ? [
            `M ${sourceX} ${sourceY}`,
            `H ${data.bendX}`,
            `V ${targetY}`,
            `H ${targetX}`,
          ].join(" ")
        : [
            `M ${sourceX} ${sourceY}`,
            `H ${data.sourceEscapeX}`,
            `V ${data.laneY}`,
            `H ${data.targetEscapeX}`,
            `V ${targetY}`,
            `H ${targetX}`,
          ].join(" ");

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={7}
      />
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        interactionWidth={18}
        style={{
          stroke: "#eb2525",
          strokeWidth: 3.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
    </>
  );
}

const edgeTypes = {
  roadmap: RoadmapEdge,
};

function getPeriod(item: CourseSubjectItem) {
  if (!item.year || !item.semester) {
    return "ไม่ระบุปี/เทอม";
  }

  return `ปี ${item.year} เทอม ${item.semester}`;
}

function getColumn(item: CourseSubjectItem, fallbackColumn: number) {
  if (!item.year || !item.semester) {
    return fallbackColumn;
  }

  return (item.year - 1) * 2 + (item.semester - 1);
}

function buildNodes(courseSubjects: CourseSubjectItem[]): RoadmapNode[] {
  const semesterMap = new Map<string, number>();
  const maxScheduledColumn = courseSubjects.reduce(
    (maxColumn, item) =>
      Math.max(maxColumn, getColumn(item, maxColumn)),
    0,
  );
  const unscheduledColumn = maxScheduledColumn + 1;

  const periodHeaders = new Map<number, PeriodHeaderFlowNode>();
  let maxRow = 0;
  const courseNodes = courseSubjects
    .filter((item) => item.subject?.id)
    .map<CourseFlowNode>((item) => {
    const year = item.year ?? 0;
    const semester = item.semester ?? 0;
    const key = `${year}-${semester}`;
    const currentRow = semesterMap.get(key) ?? 0;
    semesterMap.set(key, currentRow + 1);
    const column = getColumn(item, unscheduledColumn);
    maxRow = Math.max(maxRow, currentRow);
    const colorIndex =
      year > 0 && semester > 0
        ? ((year - 1) * 2 + semester - 1) % semesterColors.length
        : semesterColors.length - 1;
    const color = semesterColors[colorIndex];

    if (!periodHeaders.has(column)) {
      periodHeaders.set(column, {
        id: `period-${column}`,
        type: "periodHeader",
        position: {
          x: column * COLUMN_WIDTH,
          y: HEADER_Y,
        },
        data: {
          title: year > 0 ? `ปีการศึกษาที่ ${year}` : "ยังไม่ระบุปีการศึกษา",
          subtitle:
            semester > 0 ? `ภาคการศึกษาที่ ${semester}` : "ยังไม่ระบุภาคการศึกษา",
          color,
        },
        draggable: false,
        selectable: false,
      });
    }

    return {
      id: String(item.id),
      type: "course",
      position: {
        x: column * COLUMN_WIDTH,
        y: currentRow * ROW_HEIGHT,
      },
      data: {
        code: item.subject.subject_code || item.subject.thai_name || "ไม่มีรหัสวิชา",
        thai_name:
          item.subject.thai_name ||
          "ไม่มีชื่อรายวิชา",
        eng_name:
          item.subject.eng_name ||
          "  ",
        color,
        period: getPeriod(item),
      },
      };
    });

  const routingBoundary: RoutingBoundaryFlowNode = {
    id: "routing-boundary",
    type: "routingBoundary",
    position: {
      x: 0,
      y: (maxRow + 1) * ROW_HEIGHT,
    },
    data: {},
    draggable: false,
    selectable: false,
    connectable: false,
  };

  return [...periodHeaders.values(), ...courseNodes, routingBoundary];
}

function buildEdges(courseSubjects: CourseSubjectItem[]): RoadmapFlowEdge[] {
  type SubjectLayout = {
    nodeId: number;
    subjectId: number;
    column: number;
    row: number;
  };

  const subjectLayouts: SubjectLayout[] = [];
  const layoutByNodeId = new Map<number, SubjectLayout>();
  const rowCounts = new Map<string, number>();
  const maxScheduledColumn = courseSubjects.reduce(
    (maxColumn, item) =>
      Math.max(maxColumn, getColumn(item, maxColumn)),
    0,
  );
  const unscheduledColumn = maxScheduledColumn + 1;
  let maxRow = 0;

  courseSubjects.forEach((item) => {
    if (!item.subject?.id) {
      return;
    }

    const key = `${item.year ?? 0}-${item.semester ?? 0}`;
    const row = rowCounts.get(key) ?? 0;
    const column = getColumn(item, unscheduledColumn);
    const layout = {
      nodeId: item.id,
      subjectId: item.subject.id,
      column,
      row,
    };
    rowCounts.set(key, row + 1);
    subjectLayouts.push(layout);
    layoutByNodeId.set(item.id, layout);
    maxRow = Math.max(maxRow, row);
  });

  type EdgeRelation = {
    edgeId: string;
    sourceId: number;
    targetId: number;
    sourceLayout: SubjectLayout;
    targetLayout: SubjectLayout;
    direction: 1 | -1;
  };

  const relations = new Map<string, EdgeRelation>();

  courseSubjects.forEach((item) => {
    item.subject?.require_subjects?.forEach((requirement) => {
      const sourceId =
        requirement.required_subject?.id ?? requirement.require_subject_id;
      const targetId = item.id;

      if (!sourceId) {
        return;
      }

      const targetLayout = layoutByNodeId.get(targetId);
      if (!targetLayout) {
        return;
      }

      const sourceLayout = subjectLayouts
        .filter(
          (layout) =>
            layout.subjectId === sourceId &&
            (layout.column < targetLayout.column ||
              (layout.column === targetLayout.column &&
                layout.row < targetLayout.row)),
        )
        .sort(
          (layoutA, layoutB) =>
            layoutB.column - layoutA.column ||
            layoutB.row - layoutA.row,
        )[0];

      if (!sourceLayout) {
        return;
      }

      const direction: 1 | -1 =
        targetLayout.column >= sourceLayout.column ? 1 : -1;
      const edgeId = `${sourceLayout.nodeId}-${targetId}`;

      relations.set(edgeId, {
        edgeId,
        sourceId: sourceLayout.nodeId,
        targetId,
        sourceLayout,
        targetLayout,
        direction,
      });
    });
  });

  const relationGroups = new Map<string, EdgeRelation[]>();
  relations.forEach((relation) => {
    const groupKey = `${relation.direction}:${relation.targetLayout.column}`;
    const group = relationGroups.get(groupKey) ?? [];
    group.push(relation);
    relationGroups.set(groupKey, group);
  });

  const laneUsage = new Map<number, number>();
  const groupLanes = new Map<string, number>();
  const occupiedPositions = new Set(
    subjectLayouts.map(
      ({ column, row }) => `${column}:${row}`,
    ),
  );

  Array.from(relationGroups.entries()).forEach(([groupKey, group]) => {
    const averageRow =
      group.reduce(
        (total, relation) =>
          total +
          (relation.sourceLayout.row + relation.targetLayout.row) / 2,
        0,
      ) / group.length;
    const preferredLane = Math.min(maxRow, Math.floor(averageRow));
    const lane = Array.from(
      { length: maxRow + 1 },
      (_, index) => index,
    ).sort((laneA, laneB) => {
      const scoreA =
        Math.abs(laneA - preferredLane) * 5 +
        (laneUsage.get(laneA) ?? 0);
      const scoreB =
        Math.abs(laneB - preferredLane) * 5 +
        (laneUsage.get(laneB) ?? 0);

      return scoreA - scoreB;
    })[0];
    const laneIndex = laneUsage.get(lane) ?? 0;
    laneUsage.set(lane, laneIndex + 1);
    groupLanes.set(groupKey, lane * ROW_HEIGHT + ROW_LANE_Y + laneIndex * ROW_LANE_GAP);
  });

  return Array.from(relations.values()).map<RoadmapFlowEdge>((relation) => {
    const groupKey = `${relation.direction}:${relation.targetLayout.column}`;
    const sourceColumnX = relation.sourceLayout.column * COLUMN_WIDTH;
    const targetColumnX = relation.targetLayout.column * COLUMN_WIDTH;
    const columnDistance = Math.abs(
      relation.targetLayout.column - relation.sourceLayout.column,
    );
    const isForward = relation.direction === 1;
    const sameRow =
      relation.sourceLayout.row === relation.targetLayout.row;
    const firstColumn = Math.min(
      relation.sourceLayout.column,
      relation.targetLayout.column,
    );
    const lastColumn = Math.max(
      relation.sourceLayout.column,
      relation.targetLayout.column,
    );
    const hasNodeBetween = Array.from(
      { length: Math.max(0, lastColumn - firstColumn - 1) },
      (_, index) => firstColumn + index + 1,
    ).some((column) =>
      occupiedPositions.has(`${column}:${relation.sourceLayout.row}`),
    );
    const route: RoadmapEdgeData["route"] =
      isForward && sameRow && !hasNodeBetween
        ? "straight"
        : isForward && columnDistance === 1
          ? "single-bend"
          : "lane";

    return {
      id: relation.edgeId,
      source: String(relation.sourceId),
      target: String(relation.targetId),
      sourceHandle: "source-right",
      targetHandle: "target-left",
      type: "roadmap",
      data: {
        route,
        bendX: (sourceColumnX + NODE_WIDTH + targetColumnX) / 2,
        sourceEscapeX: sourceColumnX + NODE_WIDTH + NODE_SIDE_GAP,
        targetEscapeX: targetColumnX - NODE_SIDE_GAP,
        laneY: groupLanes.get(groupKey)!,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#eb2525",
      },
      zIndex: 0,
    };
  });
}

interface RoadmapProps {
  courseId: number;
}

interface RoadmapState {
  courseId: number | null;
  courseSubjects: CourseSubjectItem[];
  error: string;
}

interface RoadmapSelection {
  courseId: number;
  subjectId: string;
}

export default function Roadmap({ courseId }: RoadmapProps) {
  const [roadmapState, setRoadmapState] = useState<RoadmapState>({
    courseId: null,
    courseSubjects: [],
    error: "",
  });
  const [selection, setSelection] = useState<RoadmapSelection | null>(null);

  useEffect(() => {
    let isActive = true;

    subjectService
      .getByCourseId(courseId)
      .then((subjects) => {
        if (isActive) {
          setRoadmapState({
            courseId,
            courseSubjects: subjects,
            error: "",
          });
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching roadmap subjects:", fetchError);
        if (isActive) {
          setRoadmapState({
            courseId,
            courseSubjects: [],
            error: "ไม่สามารถโหลดข้อมูลแผนผังการเรียนได้",
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, [courseId]);

  const isLoading = roadmapState.courseId !== courseId;
  const selectedSubjectId =
    selection?.courseId === courseId ? selection.subjectId : null;
  const roadmapNodes = useMemo(
    () => buildNodes(roadmapState.courseSubjects),
    [roadmapState.courseSubjects],
  );
  const nodes = useMemo(
    () =>
      roadmapNodes.map((node) =>
        node.type === "course"
          ? { ...node, selected: node.id === selectedSubjectId }
          : node,
      ),
    [roadmapNodes, selectedSubjectId],
  );
  const roadmapEdges = useMemo(
    () => buildEdges(roadmapState.courseSubjects),
    [roadmapState.courseSubjects],
  );
  const edges = useMemo(
    () =>
      selectedSubjectId
        ? roadmapEdges.filter(
            (edge) =>
              edge.source === selectedSubjectId ||
              edge.target === selectedSubjectId,
          )
        : [],
    [roadmapEdges, selectedSubjectId],
  );

  if (isLoading) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center rounded-lg border bg-slate-50">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          กำลังโหลดแผนผังการเรียน...
        </div>
      </div>
    );
  }

  if (
    roadmapState.error ||
    roadmapState.courseSubjects.length === 0
  ) {
    return (
      <div className="flex h-[320px] w-full items-center justify-center rounded-lg border bg-slate-50 px-6 text-center text-sm text-slate-500">
        {roadmapState.error || "ยังไม่มีข้อมูลรายวิชาในแผนการเรียนนี้"}
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-lg border bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        onNodeClick={(_, node) => {
          if (node.type !== "course") {
            return;
          }

          setSelection((currentSelection) =>
            currentSelection?.courseId === courseId &&
            currentSelection.subjectId === node.id
              ? null
              : { courseId, subjectId: node.id },
          );
        }}
        onPaneClick={() => setSelection(null)}
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
