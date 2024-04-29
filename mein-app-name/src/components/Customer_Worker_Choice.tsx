import "bootstrap/dist/css/bootstrap.min.css";
import "./PageIndex.css";
import { Link } from "react-router-dom";
import React from 'react';

export function Customer_Worker_Choice() {
    return (
      <div className="background">
        <div className="container-frame">
          <h1>
            Hey , zum ersten mal hier? Melde dich am besten an und wir können
            loslegen!
          </h1>
          <Link to="/login">
            <button type="button" className="btn btn-outline-light anmelden-button">Anmelden</button>
          </Link>
         
  
        </div>
      </div>
    );
  }