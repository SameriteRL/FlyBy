import { cn } from "@/lib/utils";
import { useState } from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import VideoPlayer from "@/components/VideoPlayer";

export default function App() {
  const [data, setData] = useState({
    "Total tracked objects": 0,
    "Class counts:": { "N/A" : 0},
    "Frames processed": 0,
  });

  const findMostCommonObject = (data: any) => {
    const classCounts = data["Class counts:"];
    let mostCommonObject = null;
    let maxCount = 0;

    for (const [objectClass, count] of Object.entries(classCounts) as [string, number][]) {
      if (count !== undefined && count > maxCount) {
        maxCount = count;
        mostCommonObject = objectClass;
      }
    }

    return mostCommonObject;
  }

  const dashboardData = [
    {
      value: data["Total tracked objects"],
      description: "pieces of trash found",
      className: "lg:row-start-1 lg:row-end-2 lg:col-start-5 lg:col-end-5 md:row-start-4 md:row-end-5 md:col-start-4 md:col-end-6 row-start-4 row-end-5 col-start-4 col-end-6",
    },
    {
      value: data["Frames processed"],
      description: "total frames processed",
      className: "lg:row-start-2 lg:row-end-3 lg:col-start-5 lg:col-end-5 md:row-start-5 md:row-end-6 md:col-start-4 md:col-end-6 row-start-3 row-end-4 col-start-4 col-end-6",
    },
    {
      value: findMostCommonObject(data),
      description: "is the most common piece of trash found",
      className: "lg:row-start-3 lg:row-end-4 lg:col-start-4 lg:col-end-6 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-6 row-start-5 row-end-6 col-start-1 col-end-6",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-4">
      <h1 className="text-4xl text-[#0f4592] font-bold mb-4">FlyBy</h1>

      <BentoGrid className="p-8 pt-2">
        
        {/* Video Player */}
        <div
          className={cn(
            "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            
            "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-4",
            "md:row-start-1 md:row-end-4 md:col-start-1 md:col-end-6",
            "row-start-1 row-end-3 col-start-1 col-end-6"
          )}
        >
          <div className="w-full h-full pointer-events-none z-10 flex flex-col gap-1 p-6 ">
            <VideoPlayer setData={setData}/>
          </div>
        </div>
        
        {/* Trash Breakdown */}
        <div
          className={cn(
            "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            
            "lg:row-start-1 lg:row-end-3 lg:col-start-4 lg:col-end-4",
            "md:row-start-4 md:row-end-6 md:col-start-1 md:col-end-4",
            "row-start-3 row-end-5 col-start-1 col-end-4 ",
          )}
        >
          <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 ">
            <h3 className="text-[2rem] font-semibold text-[#0f4592] leading-tight mb-4">
              Trash Breakdown
            </h3>
            {data["Class counts:"] && Object.entries(data["Class counts:"]).map(([key, value], index) => (
              <p key={index} className="max-w-lg text-neutral-500 text-[1.25rem]">
                <strong>{key}</strong> {value}
              </p>
            ))}
          </div>
        </div>
      
        {dashboardData.map((item, index) => (
          <BentoCard 
            key={index} 
            value={item.value} 
            description={item.description} 
            className={item.className} 
          />
        ))}
      </BentoGrid>

    </div>
  )
}