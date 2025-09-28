import BarGraph from "@/components/ui/Charts/BarGraph";
import LineGraph from "@/components/ui/Charts/LineGraph";
import StepGraph from "@/components/ui/Charts/StepGraph";
import PieChart from "@/components/ui/Charts/PieGraph"; 
import SideBarGraph from "@/components/ui/Charts/SideBarGraph";
import CreateReadUpdateDeleteChart from "@/components/ui/Charts/CreateReadUpdateDeleteChart";

interface DashBoardConfigProps { 
  CardCol: number; 
  CardRow: number; 
  Component: React.JSX.Element;  
}

const DashBoardConfig: DashBoardConfigProps[] = [ 
  {CardCol: 1, CardRow: 1, Component: <BarGraph useMockData={true}/>}, 
  {CardCol: 1, CardRow: 1, Component: <LineGraph useMockData={true}/>}, 
  {CardCol: 1, CardRow: 1, Component: <StepGraph useMockData={true}/>}, 
  {CardCol: 1, CardRow: 1, Component: <PieChart useMockData={true}/>}, 
  {CardCol: 2, CardRow: 1, Component: ( <><SideBarGraph useMockData={true}/> <SideBarGraph useMockData={true}/></>)}, 
  {CardCol: 2, CardRow: 2, Component: <CreateReadUpdateDeleteChart useMockData={true}/>}
]


export default DashBoardConfig; 

