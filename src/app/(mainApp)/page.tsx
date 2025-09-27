import Card from "@/components/ui/Cards/Card"; 
import BarGraph from "@/components/ui/Charts/BarGraph";
import LineGraph from "@/components/ui/Charts/LineGraph";
import StepGraph from "@/components/ui/Charts/StepGraph";
import PieChart from "@/components/ui/Charts/PieGraph"; 
import SideBarGraph from "@/components/ui/Charts/SideBarGraph";
import CreateReadUpdateDeleteChart from "@/components/ui/Charts/CreateReadUpdateDeleteChart";

export default function Home() {
  return (
    <>
      <Card CardCol={1} CardRow={1}>
        <BarGraph useMockData={true}/>
      </Card>      
      <Card CardCol={1} CardRow={1}>
        <LineGraph useMockData={true}/>
      </Card>
      <Card CardCol={1} CardRow={1}>
        <StepGraph useMockData={true}/>
      </Card>
      <Card CardCol={1} CardRow={1}>
        <PieChart useMockData={true}/>
      </Card>
      <Card CardCol={2} CardRow={1}>
        <div className="
          w-full h-full flex flex-col 
          justify-end
        ">
          <SideBarGraph useMockData={true}/>
          <SideBarGraph useMockData={true}/>
        </div>
      </Card>
      <Card CardCol={2} CardRow={2}>
        <CreateReadUpdateDeleteChart useMockData={true}/>
      </Card>
    </>
  );
}
