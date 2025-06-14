import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Log } from "@/app/types";
import workspaceStore from "@/store/workspaceStore";
interface QueryResponse {
  message: string;
  data: Log[];
}

const useGetProjectLogs = () => {
  const {activeWorkspace} = workspaceStore.getState() // subscribes to changes
  const {
    data,
    isLoading: projectLogsLoading,
    error: errorLoadingProjectLogs,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["project-logs", activeWorkspace.id],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(
        `/projects/${activeWorkspace.id}/logs`
      );
      return res.data;
    },
    retry: 1,
    enabled: !!activeWorkspace.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const projectLogsData: Array<Log> = Array.isArray(data?.data)
    ? data.data.map((log) => ({
        ...log,
      }))
    : [];

  return { projectLogsData, projectLogsLoading, errorLoadingProjectLogs };
};
export default useGetProjectLogs;
