'use client'; 
import Card from "@/components/ui/Cards/Card"; 
import DashBoardConfig from "@/app/(mainApp)/DashBoardConfig";


export default function Home() {
  return (
    <>
      { DashBoardConfig.map((config, idx)=>( 
        <Card key={idx} CardCol={config.CardCol} CardRow={config.CardRow}>
          {config.Component}
        </Card>
      ))
      }
    </>
  );
}
