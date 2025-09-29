import SideBarGraphCard from "@/components/ui/Cards/SideBarGraphCard";
import HeatMapCard from "@/components/ui/Cards/HeatMapCard"; 
import BarGraphCard from "@/components/ui/Cards/BarGraphCard"; 
import LineGraphCard from "@/components/ui/Cards/LineGraphCard";
import StepGraphCard from "@/components/ui/Cards/StepGraphCard";
import PieChartCard from  '@/components/ui/Cards/PieChartCard'; 
 
import CreateReadUpdateDeleteChart from "@/components/ui/Charts/CreateReadUpdateDeleteChart";

interface DashBoardConfigProps { 
  CardCol: number; 
  CardRow: number; 
  Component: React.JSX.Element;  
  DetailPageUrl?: string; 
  Title?: string;  
}

const DashBoardConfig: DashBoardConfigProps[] = [ 
  {CardCol: 1, CardRow: 1, Title: 'TITLE',  DetailPageUrl: '/',  Component: <BarGraphCard useMockData={true}/>}, 
  {CardCol: 1, CardRow: 1, DetailPageUrl: '/',  Component: <LineGraphCard useMockData={true}/>}, 
  {CardCol: 1, CardRow: 1, DetailPageUrl: '/', Component: <StepGraphCard useMockData={true}/>}, 
  {CardCol: 1, CardRow: 1, DetailPageUrl: '/',  Component: <PieChartCard useMockData={true}/>}, 
  {CardCol: 2, CardRow: 1, DetailPageUrl: '/', Component: <SideBarGraphCard useMockData={true} />}, 
  {CardCol: 2, CardRow: 2, Component: <CreateReadUpdateDeleteChart useMockData={true}/>}, 
  {CardCol: 2, CardRow: 1, DetailPageUrl: '/', Component: <HeatMapCard useMockData={true}/>}, 
  {CardCol: 2, CardRow: 1, Component: <div></div> },
  {CardCol: 2, CardRow: 1, Component: <div></div> }
]


export default DashBoardConfig; 

