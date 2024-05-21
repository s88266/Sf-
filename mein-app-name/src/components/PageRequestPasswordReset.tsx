import React, { useState } from 'react';
import './PagePasswordReset.css';
import { MDBBtn, MDBContainer, MDBInput, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { getUserFromEmail, requestPassword } from '../backend/api';
import { ContractResource, ContractResourceforWorker, CustomerResource, Position, TokenRessource, WorkerResource } from "../Resources";

export function PageRequestPasswordReset(){
    const [getEmail, setEmail] = useState('');
    const [getType, setType] = useState('');

    const handleNewPasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
       const User = await getUserFromEmail(event.target.value)
        
       if( User as CustomerResource ){
        console.log("ASDASD")
            setType("Customer");
       } else if( User as WorkerResource){
            setType("Worker");
       }
    };

    async function reqPaw(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
       await requestPassword(getEmail,getType);

    }

    return (
        <div className="background-image">
        <div className="login-container">
        <MDBContainer className="p-3 my-5 d-flex flex-column align-items-center justify-content-center w-50">
                <MDBRow className="justify-content-center">

                </MDBRow>

                <MDBCardBody>
                <h2 className="text-uppercase text-center mb-5" style={{color:"white"}}>Passwort zurücksetzen</h2>
               
                    <form onSubmit={reqPaw}>
                        <MDBInput wrapperClass='mb-3 inputField' 
                        labelClass='text-white' 
                        label='Email' 
                        id='email' 
                        type='string'
                        required
                        style={{ width: '280px' }}
                        onChange ={handleNewPasswordChange}
                        />
                        <MDBRow>
                            <MDBCol size="auto">
                                <MDBBtn className='mb-4 w-100 gradient-custom-4 button-text-large'>
                                    <Link to="/login" className="link button-text-large">Zurück zum Login</Link>
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol>
                                <MDBBtn className='mb-4 w-100 gradient-custom-4 button-text-large' size='lg' type="submit">Passwort zurücksetzen</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
        </MDBContainer>
        </div>
        </div>

    );
}
