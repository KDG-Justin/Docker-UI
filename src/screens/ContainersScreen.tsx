import { useContainers } from "../hooks/useContainers";
import { Play, Square, Info, Terminal, RefreshCw } from "lucide-react";

export function ContainersScreen() {
  const { containers, isLoading, isError } = useContainers();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#B0E4CC]">Containers</h1>
          <p className="text-sm text-gray-300">
            Available docker container on local machine.
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-16 text-[#B0E4CC]">
          <RefreshCw className="size-8 animate-spin mr-3" />
          <span className="text-lg font-medium">Getting containers...</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="p-4 bg-red-900/40 border border-red-500/50 rounded-lg text-red-200">
          <p className="font-semibold">Error with getting containers:</p>
          <p className="text-sm mt-1">Docker desktop might be offline.</p>
        </div>
      )}

      {/* geenc containrs */}
      {!isLoading && !isError && containers?.length === 0 && (
        <div className="text-center py-12 border border-[#408A71]/30 rounded-xl bg-[#285A48]/20">
          <p className="text-gray-300">No containers found.</p>
        </div>
      )}

      {/* wel containers */}
      {!isLoading && !isError && containers && containers.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-[#408A71]/40 bg-[#285A48]/30 backdrop-blur-sm">
          <table className="w-full text-left text-sm text-gray-200">
            <thead className="bg-[#285A48] text-xs uppercase tracking-wider text-[#B0E4CC] border-b border-[#408A71]/40">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Name & ID</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Ports</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#408A71]/20">
              {containers.map((container) => {
                const isRunning = container.state === "running";

                return (
                  <tr
                    key={container.id}
                    className="hover:bg-[#408A71]/15 transition-colors"
                  >
                    {/* status badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          isRunning
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            isRunning
                              ? "bg-emerald-400 animate-pulse"
                              : "bg-rose-400"
                          }`}
                        />
                        {container.state}
                      </span>
                    </td>

                    {/* container name + id */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white text-base">
                        {container.name}
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        ID: {container.id}
                      </div>
                    </td>

                    {/* image */}
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-[#091413]/60 px-2.5 py-1 rounded border border-[#408A71]/30 text-emerald-200">
                        {container.image}
                      </span>
                    </td>

                    {/* ports */}
                    <td className="px-6 py-4 font-mono text-xs text-gray-300">
                      {container.ports !== "-" ? (
                        <span className="text-[#B0E4CC]">
                          {container.ports}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>

                    {/* action buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isRunning ? (
                          <button
                            title="Stop container"
                            className="p-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            <Square className="size-4" />
                          </button>
                        ) : (
                          <button
                            title="Start container"
                            className="p-2 rounded-lg bg-[#B0E4CC] text-[#091413] hover:bg-emerald-300 font-bold transition-colors"
                          >
                            <Play className="size-4 fill-current" />
                          </button>
                        )}

                        <button
                          title="Logs"
                          className="p-2 rounded-lg bg-[#408A71]/40 text-gray-200 hover:bg-[#408A71] hover:text-white transition-colors"
                        >
                          <Terminal className="size-4" />
                        </button>

                        {/* Info / Inspect Knop */}
                        <button
                          title="Inspect details"
                          className="p-2 rounded-lg bg-[#408A71]/40 text-gray-200 hover:bg-[#408A71] hover:text-white transition-colors"
                        >
                          <Info className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
