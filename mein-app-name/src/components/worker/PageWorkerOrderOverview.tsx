import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContractResource, ContractResourceforWorker, WorkerResource } from "../../Resources";
import { getContractByCustomerId, getContractByWorkerId } from "../../backend/api";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { deDE } from '@mui/x-data-grid/locales';
import NavbarWComponent from "./NavbarWComponent";



export function PageWorkerOrderOverview() {
    const params = useParams();
    const workerId = params.workerId!;
    console.log(workerId)
  
    const [contracts, setContracts] = useState<ContractResourceforWorker[]>([]);
    const [noContracts, setNoContracts] = useState(false);
    const [amount,setAmount]=useState(0)
    console.log(amount)
  
    useEffect(() => {
      async function fetchContracts() {
        try {
          let contracts = await getContractByWorkerId(workerId);
          console.log(contracts)
          if (contracts.length === 0) {
            setNoContracts(true);
          } else {
            setContracts(contracts);
          }
        } catch (error) {
          console.log("Fehler:" + error);
        }
      }
      fetchContracts();
    }, [workerId]);

    useEffect(() => {
        const totalAmount = contracts.reduce((acc, con) => acc + con.maxPayment, 0);
        setAmount(totalAmount);
      }, [contracts]);

  
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'adress', headerName: 'Adresse', width: 290 },
        { field: 'description', headerName: 'Beschreibung', width: 400 },
        { field: 'jobType', headerName: 'Job Typ', width: 290 },
        { field: 'payment', headerName: 'Bezahlung', width: 290 },
        { field: 'maxPayment', headerName: 'Maximale Zahlung', width: 290 },
        { field: 'customer', headerName: 'Customer Name', width: 290, 
         renderCell: (params) => {
          return params.value ? params.value.name : 'N/A';
        }}
      ]
  
    return (
      <>    <div className="Backg"> 
             <NavbarWComponent />
   
            <div style={{ height: 'calc(100vh - 100px)', width: '100%',marginTop:"0.5%" }}>
            <DataGrid
              rows={contracts}
              columns={columns}
              style={{ backgroundColor: 'white', color: 'black' }}
              localeText={deDE.components.MuiDataGrid.defaultProps.localeText}
            />
          </div>
          <div style={{ padding: 10, backgroundColor: '#f0f0f0', textAlign: 'right' }}>
                <strong>Gesamtumsatz:</strong> {amount} €
              </div>
           </div>
      </>
           
    );
}