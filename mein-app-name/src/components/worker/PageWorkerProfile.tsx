import { useEffect, useState } from "react";
import { JobType, WorkerResource } from "../../Resources";
import { deleteWorker, getWorkerbyID, updateWorker } from "../../backend/api";
import { useParams } from "react-router-dom";
import "./PageWorkerProfile.css"
import { LinkContainer } from "react-router-bootstrap";
import { workerData } from "worker_threads";



export function PageWorkerProfile() {

  // React Hooks
  const [worker, setWorker] = useState<WorkerResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name , setName] = useState("");  
  const [password , setPassword] = useState("");  
  const [location , setLocation] = useState(""); 
  const [email , setEmail] = useState(""); 
  const [status , setStatus] = useState("");
  const [statusOrder , setStatusOrder] = useState(""); 
  const [range , setRange] = useState<Number>(0); 
  const [jobType , setJobType] = useState(""); 
  const [minPayment , setMinPayment] = useState<Number>(0); 
  const [rating , setRating] = useState<Number>(0); 
  const [verification , setVerification] = useState<Boolean>(false);
  const params = useParams();
  const worId = params.workerId;




// Worker Fetch
  const fetchWorker = async () => {
    console.log("1")
    if (!worId) {
        setError("Keine Worker ID in der URL gefunden");
        setLoading(false);
        return;
      }
    try {
      const id = worId;
      const workerData = await getWorkerbyID(id);
      if(workerData){
      setStatus(workerData.status)
      setStatusOrder(workerData.statusOrder)
      setRange(workerData.range)
      setJobType(workerData.jobType);
      setMinPayment(workerData.minPayment)
      setRating(workerData.rating)
      setVerification(workerData.verification)
      setName(workerData.name)
      setLocation(workerData.location)
      setEmail(workerData.email)
      setPassword(workerData.password)
      }
      if (!workerData) {
        setWorker(null);
        throw new Error("Keine Daten für diesen Worker gefunden");
      }
      setLoading(false);
    } catch (error) {
      console.error("Fehler beim Laden der Worker-Daten:", error);
      setError("Fehler beim Laden der Daten");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWorker();
  }, []);
  


  //Update Funkti
   const handleUpdate = async () => {
      const updatedWorkerData :WorkerResource= {
        id: (worId!),
        name: name,
        email: email,
        password: password,
        location: location,
        status: status,
        verification: verification,
        statusOrder: statusOrder,
        range: range,
        jobType: jobType,
        minPayment: minPayment!,
        rating: rating,
      }

      try {
        const updatedWorker = await updateWorker(updatedWorkerData);
        console.log("Updated Worker:", updatedWorker);
        alert("Worker erfolgreich aktualisiert");
      } catch (error) {
        console.error("Fehler beim Aktualisieren des Workers:", error);
        alert("Fehler beim Aktualisieren des Workers");
      }
  };


  const handleDelete = async () => {
    try {
      await deleteWorker(worId!);
      alert('Profil erfolgreich gelöscht.');
    } catch (error) {
      console.error('Fehler beim Löschen des Profils:', error);
      alert('Fehler beim Löschen des Profils');
    }
  };

  

  

if (loading) return <p>Lädt...</p>;
if (error) return <p>Fehler: {error}</p>;

return (
  <div className="background-image centered-container">
    <div className="container rounded bg-white mt-5 mb-5 transparent-background">
      <div className="row">
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
        <img className="rounded-circle mt-5" width="150px" src="/image.jpg" alt="Profile" />
          <span className="font-weight-bold">{name}</span>
          <span className="text-black-50">{email}</span>
          <span> </span>
        </div>
      </div>
      <div className="col-md-5 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label className="labels">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Adresse</label>
              <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label className="labels">E-Mail</label>
              <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label className="labels">Passwort</label>
              <input type="text" className="form-control"onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="mt-5 text-center">
          <div className="button-group">

            <button className="button"type="button" onClick={handleUpdate}>Save Profile</button>
            <LinkContainer to = {"/"}>
            <button className="button" type="button" onClick={() => {handleDelete(); }}>Delete Profile</button>
            </LinkContainer>
            <LinkContainer to = {`/worker/${worId}`}>
            <button type="button">Zurück zur Startseite!</button>
         </LinkContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
);
};

export default PageWorkerProfile;







