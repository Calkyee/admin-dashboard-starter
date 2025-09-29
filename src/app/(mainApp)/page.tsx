'use client'; 
import Card from "@/components/ui/Cards/Card"; 
import DashBoardConfig from "@/app/(mainApp)/DashBoardConfig";

const GetTitleFromUrl = (title: string)=>{ 
  const Title = title.replace('/', '');
  
  return Title.trim(); 
}

export default function Home() {
  return (
    <>
      { DashBoardConfig.map((config, idx)=>( 
        <Card 
          key={idx} 
          CardCol={config.CardCol} 
          CardRow={config.CardRow} 
          DetailPageUrl={config.DetailPageUrl ? config.DetailPageUrl : undefined} 
          Title={config.Title ? config.Title : 'TITLE'}
          >
            {config.Component}
        </Card>
      ))
      }
    </>
  );
}
