import Card from "@/components/ui/Cards/Card"; 
import BarGraph from "@/components/ui/Charts/BarGraph";
import LineGraph from "@/components/ui/Charts/LineGraph";
import StepGraph from "@/components/ui/Charts/StepGraph";
import PieChart from "@/components/ui/Charts/PieGraph"; 

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
    </>
  );
}
