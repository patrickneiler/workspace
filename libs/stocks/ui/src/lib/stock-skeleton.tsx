import { Skeleton } from "@radix-ui/themes";

export const StockSkeleton = () => {
  return (
    <div className="p-4 rounded-xl bg-zinc-950 text-green-400 border border-zinc-900">
      <div className="p-4 text-green-400 border rounded-xl bg-zinc-950">
        <div className="inline-block float-right px-2 py-1 text-xs rounded-full bg-white/10">
          <Skeleton>
            xxxxxxx
          </Skeleton>
        </div>
        <div className="text-lg text-zinc-300">
          <Skeleton>
            XXXX
          </Skeleton>
        </div>
        <div className="text-3xl font-bold">
          <Skeleton>
            XXXX
          </Skeleton>
        </div>
        <div className="mt-1 text-xs text text-zinc-500">
          <Skeleton>
            xxxxxx xxx xx xxxx xx xxx
          </Skeleton>
        </div>

        <div
          className="relative -mx-4 cursor-col-resize"
        >
          <div style={{ height: 146 }}></div>

        </div>
      </div>
    </div>
  );
};
