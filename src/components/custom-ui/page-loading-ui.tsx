import { Skeleton } from "@/components/ui/skeleton";

import TopNavBar from "@/components/custom-ui/topBarNav";
import PageLayout from "@/features/layout/PagesLayout";

export default function LoadingSkeleton() {
  return (
    <div className="py-3">
      <TopNavBar pageName=""/>
      <PageLayout>
        <div className="space-y-8 mt-3">
          <div className="w-full flex sm:justify-end items-center justify-end">
            <div className="flex sm:flex-row gap-3 justify-center items-center flex-col">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
          <div className="">
            <div className="p-4 border rounded-lg shadow-sm">
              {/* Table Header Skeleton */}
              <div className="flex justify-between py-2 border-b">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-40" />
              </div>
              {/* Table Rows Skeleton */}
              <div className="space-y-3 mt-4">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/6" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
