import { Log, Workspace } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
interface QueryResponse {
  message: string;
  data: {
    dashboard: DashboardData;
    workspace: Workspace;
  };
}

const useGetDashboard = () => {
  const {activeWorkspace} = workspaceStore.getState()
  const {
    data,
    isLoading: dashboardLoading,
    error: errorLoadingDashboard,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["dashboard", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/workspace/${activeWorkspace.id}/dashboard`
      );
      return res.data;
    },
    enabled: !!activeWorkspace.id,
    refetchOnWindowFocus: true
  });

  const dashboardData = data?.data.dashboard;

  return { dashboardData, dashboardLoading, errorLoadingDashboard };
};
export default useGetDashboard;



// Individual card types
type ProjectCard = {
  count: number;
};

type TaskCard = {
  completedTaskCount: number;
  totalTaskCount: number;
};

type TeamCard = {
  count: number;
};

type ProjectProgress = {
  totalTasks: number;
  percentage: string;
  taskStatusCount: Record<string, number>;
};

type ProjectProgressCard = {
  id: string;
  name: string;
  progress: ProjectProgress;
};

// Root dashboard type
type DashboardData = {
  projectCard: ProjectCard;
  taskCard: TaskCard;
  teamCard: TeamCard;
  projectProgressCard: ProjectProgressCard[];
  taskDistributionCard: null;
  logsCard: Log[];
};
