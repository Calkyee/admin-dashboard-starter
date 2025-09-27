import Card from "@/components/ui/Cards/Card"; 
import BarGraph from "@/components/ui/Charts/BarGraph";
import LineGraph from "@/components/ui/Charts/LineGraph";

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
      
      </Card>
      <Card CardCol={1} CardRow={1}>
      
      </Card>
    </>
  );
}
