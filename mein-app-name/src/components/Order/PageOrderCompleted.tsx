import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBIcon,
} from 'mdb-react-ui-kit';
import './PageOrderCompleted.css';
import { Link, useParams } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarComponent from '../navbar/NavbarComponent';
import { getContract, setRating } from '../../backend/api';
import { ContractResource, RatingRessource } from '../../Resources';


export function PageOrderCompleted() {

  const params = useParams();
  const orderId = params.orderId!;

  console.log(orderId)
  const [ratting, setRatting] = useState(0);
  const [hover, setHover] = useState(0);

  const [contract, setContract] = useState<ContractResource>();


  const rat :RatingRessource={
    id:contract?.worker?.id!,
    rating:ratting
  }


  useEffect(() => {

    async function getOrder() {
      try {
        console.log("WURDE AUSGEFÜHRT")
        let result=await getContract(parseInt(orderId));
        setContract(result)
      } catch (error) {
        console.log(error)
      }
    }
    getOrder()
  }, [orderId]);
  
  
  async function updateRating() {
   
  console.log("DAS IST MEINE BEWERTUNG   "+ratting);
    await setRating(rat);
  }

  return (
    <>

    <div className="Backg">
      <NavbarComponent />
      <div className="background-image-completed">
        <div className="centered-container">
          <MDBCard className="card-completed">
            <MDBCardHeader>
              <h3>Bestellung abgeschlossen</h3>
            </MDBCardHeader>
            <MDBCardBody>
              <p>Vielen Dank für Ihre Bestellung. Ihre Bestellnummer ist <strong>{orderId}</strong>.</p>
              <p>Sie haben am <strong>{new Date().toLocaleDateString()}</strong> ihren Auftrag beendet.</p>
              <h5>Bewertung abgeben:</h5>
              <div className="rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                    type="button"
                    key={index}
                    style={{ color: index <= (hover || ratting) ? 'gold' : 'grey' }} // Direkte Inline-Style Zuweisung
                    onClick={() => setRatting(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(ratting)}
                  >
                    <MDBIcon fas icon="star" size="2x" />
                  </button>
                  );
                })}
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="comments">Kommentare:</label>
                  <textarea id="comments" className="form-control" rows={3}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={updateRating}>Bewertung absenden</button>              </form>
            </MDBCardBody>
            <MDBCardFooter>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
      </div>
    </>
  );
}