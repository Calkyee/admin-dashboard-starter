import { FailedLogin, FailedLoginSchema, SessionSchema, Session} from '@/zod';
import {z} from "zod";
import {useEffect, useState} from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie, Tooltip,
  Cell
} from 'recharts';

const SessionArraySchema = z.array(SessionSchema);
type SessionArrayType = z.infer<typeof SessionArraySchema>;

const FailedLoginArraySchema = z.array(FailedLoginSchema);
type FailedLoginArrayType = z.infer<typeof FailedLoginArraySchema>;


type dataPoint = {
  name: string;
  value: number;
}

interface Props {
  useMockData: FailedLoginArrayType | undefined;
}

const PieChartForFailedAdminLogins = ({useMockData}: Props) => {
  const [chartData, setChartData] = useState<dataPoint[] | null>(null);
  const [sessions, setSessions] = useState<SessionArrayType | null>(null);
  const [failedLogins, setFailedLogins] = useState<FailedLoginArrayType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentSessions = async()=>{
    const res = await fetch('/api/secure/sessions/getSessions', { credentials: "include" });
    if(!res.ok){
      console.log("[SESSIONS ERROR]: ", await res.text());
      return;
    }
    const data = await res.json();


    const sessions: SessionArrayType = data.currentSessions;
    const isValidated =  SessionArraySchema.safeParse(sessions);

    if(!isValidated.success){
      console.error('[VALIDATION ERROR]: ', isValidated.error.flatten());
      return;
    }

    setSessions(sessions);
  }
  const getFailedLogins = async()=>{
    const res = await fetch('/api/secure/failedLogins/getFailedLogins', {credentials: "include"});
    if(!res.ok){
      console.log('[FAILED LOGINS]: ', await res.text());
      return;
    }
    const data = await res.json();
    const recievedFailedLogins: FailedLoginArrayType = data.failedLogins;
    const isValidated = FailedLoginArraySchema.safeParse(recievedFailedLogins);
    if(!isValidated.success){
      console.error('[VALIDATION ERROR]: ', isValidated.error.flatten());
      return;
    }
    setFailedLogins(recievedFailedLogins);
    return;
  }
  useEffect(()=>{
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const callData = async () => {
      if (useMockData) {
        await getCurrentSessions();
      } else {
        await getCurrentSessions();
        await getFailedLogins();
      }
    };

    callData();

    const interval = setInterval(() => callData(), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (useMockData && sessions) {
      setChartData([
        { name: "Failed Logins", value: useMockData.length },
        { name: "Active Sessions", value: sessions.length }
      ]);
      setIsLoading(false);
    } else if (failedLogins && sessions) {
      setChartData([
        { name: "Failed Logins", value: failedLogins.length },
        { name: "Active Sessions", value: sessions.length }
      ]);
      setIsLoading(false);
    }
  }, [useMockData, sessions, failedLogins]);


  return (
    <>
      { isLoading && ( <div>Loading...</div> ) }
      { chartData && (
        <>
          <div className='w-full h-fit text-center'>
            <h2 className='font-bold'>Failed Logins Vs Active Sessions</h2>
          </div>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={65}
                  innerRadius={35}
                  label
                >
                  { chartData.map((entry)=>(
                    <Cell
                      key={entry.name}
                      fill={entry.name === "Failed Logins" ? "#f87171" : "#60a5fa"}
                    />
                  ))

                  }
                </Pie>
              <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
        </>
      )}
    </>
  )
}

export default PieChartForFailedAdminLogins;