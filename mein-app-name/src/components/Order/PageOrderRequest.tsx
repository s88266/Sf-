import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./PageOrderRequest.css";
import { createContract, getCustomerbyID } from "../../backend/api";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ContractResource, Position } from "../../Resources";
import MapComponent from "./MapComponent";
import NavbarComponent from "../navbar/NavbarComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from "axios";
import { HttpError } from "./HTTPError";
import Footer from "../Footer";


export default function PageOrderRequest() {
  const [address, setAddress] = useState("Eingeben...");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(100);
  const [range, setRange] = useState(1);
  const [verified, setVerified] = useState(false);
  const [showMap, setMap] = useState(false);
  const [contract, setContract] = useState<ContractResource>();
  const [isCreatingContract, setIsCreatingContract] = useState(false);
  const [getPosition, setPosition] = useState<Position>();
  const [budgetError, setBudgetError] = useState("");
  const [rangeError, setRangeError] = useState("");
  const [error,setError]=useState(false)

  const params = useParams();
  const cusId = params.customerId;
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (budget <= 0) {
      setBudgetError("Das Budget muss größer als 0 sein.");
      return;
    } else {
      setBudgetError("");
    }

    if (range <= 0) {
      setRangeError("Die Reichweite muss größer als 0 sein.");
      return;
    } else {
      setRangeError("");
    }

    await handleCreateContract();
  };

  const handleClickMap1 = () => {
    setMap(!showMap); // Toggle zwischen Anzeigen und Verbergen der Karte
  };

  const handleSelectChange1 = (event: any) => {
    setService(event.target.value);
  };

  const jobTypes = [
    "Autobesorger",
    "Babysitter",
    "Blumenpfleger",
    "Bodenleger",
    "Bügeler",
    "Caterer",
    "Chauffeur",
    "Einkäufer",
    "Elektriker",
    "Ernährungsberater",
    "Fensterputzer",
    "Fensterreiniger",
    "Gartenarbeiter",
    "Gassigeher",
    "Gärtner",
    "Handwerker",
    "Hausbetreuer",
    "Hausdoktor",
    "Hauslehrer",
    "Hausmeister",
    "Haushälter",
    "Hundepfleger",
    "Hundetrainer",
    "Installateur",
    "Kammerjäger",
    "Kammerzofen",
    "Klempner",
    "Koch",
    "Kindermädchen",
    "Maler",
    "Möbelträger",
    "Musiklehrer",
    "Organisator",
    "Personal Trainer",
    "Putzkraft",
    "Reinigungskraft",
    "Renovierer",
    "Schädlingsbekämpfer",
    "Schneider",
    "Tierpfleger",
    "Tischler",
    "Wäscher"
  ];

  const handleClick = () => {
    if (showMap) {
      setMap(false);
    } else {
      setMap(true);
    }
  };

  const handleSelectChange = (event: any) => {
    const selectedJobType = event.target.value;
    setService(selectedJobType);
  };

  const handleAddressChange = (newAddress: string, Location: Position) => {
    setAddress(newAddress);
    setPosition(Location);
  };

  const handleCreateContract = async () => {
    const cus = await getCustomerbyID(cusId!)

    setIsCreatingContract(true);
    const contractData = {
      adress: address,
      jobType: service.toUpperCase(),
      description: description,
      payment: "CASH",
      range: range,
      statusOrder: "UNDEFINED",
      customerId: cus!.id,
      verified: verified,
      longitude: getPosition!.longitude,
      latitude: getPosition!.latitude,
      maxPayment: budget,
    };
  
  
    try {
      const contract = await createContract(contractData);
      toast.success('Auftrags erfolgreich erstellt.');
      if (contract) {
        localStorage.removeItem('chatReload');
        setContract(contract);
        navigate(`/customer/${cusId}/order/${contract.id}`);
      } else {
        console.error("Fehler: Keine ContractID erhalten, Response:", contract);
      }
    }  catch (error) {
      if (error instanceof HttpError) {
        const status = error.response.status;
        const errorMessage = await error.response.text();
        if (status === 400) {
          toast.error('Ungültige Eingabe. Bitte überprüfen Sie Ihre Daten.');
        } else if (status === 404) {
          if (errorMessage === "NO_WORKER_FOUND") {
            toast.error('Kein Worker mit dem angegebenen Job-Typ gefunden.');
          } else if (errorMessage === "NO_WORKER_NEARBY") {
            toast.error('Kein passender Worker in der Nähe gefunden.');
          } else {
            toast.error('Ressource nicht gefunden.');
          }
        } else if (status === 500) {
          toast.error('Serverfehler. Bitte versuchen Sie es später erneut.');
        } else {
          toast.error('Fehler beim Erstellen des Auftrags.');
        }
      } else {
        toast.error('Fehler beim Erstellen des Auftrags.');
      }
    } finally {
      setIsCreatingContract(false);
    }
  };
  return (
    <>
    
    <ToastContainer 
            position="top-center" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
        />

        <div className="Backg">
    <NavbarComponent />
      <div className="container-frame30">  
        <Form onSubmit={handleSubmit} className="form-content">
          <Button onClick={handleClickMap1} variant="info" >
            {showMap ? "Karte verbergen" : "Karte anzeigen"}
          </Button>
          {showMap && (
            <div className="map-container">
              <MapComponent onAddressChange={handleAddressChange} />
              <Button variant="light" onClick={() => setMap(false)}>
                OK
              </Button>
            </div>
          )}
          {!showMap && <> 
             <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Straße..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dienstleistung</Form.Label>
            <Form.Select value={service} onChange={handleSelectChange} required >
              <option value="">ServiceTyp wählen...</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Maximales Budget (€)</Form.Label>
            <Form.Control
              type="number"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              isInvalid={budget <= 0}
            />
            {budgetError && <div className="text-danger">{budgetError}</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reichweite (km)</Form.Label>
            <Form.Control
              type="number"
              value={range}
              onChange={(e) => setRange(parseInt(e.target.value))}
              isInvalid={range <= 0}
            />
            {rangeError && <div className="text-danger">{rangeError}</div>}
          </Form.Group>
              <Button
              className="myButton"
              type="submit"
              disabled={isCreatingContract}
            >
              {isCreatingContract ? 'Erstellt...' : 'Vertrag erstellen und suchen'}
            </Button>
          </>}
        </Form>

      </div>
      <Footer></Footer>

      </div>
    </>
  );
}
