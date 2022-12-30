/*global google*/
import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function Updateform(props) {

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [compnay, setCompnany] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("")
  const [dlatitude, setDlatitude] = useState("");
  const [dlongitude, setDlongitude] = useState("");
  const [load,setLoad] = useState(false);
  const [check,setCheck] = useState();

  var ch = document.getElementById("checked");
  function sub(){
    if(ch.checked){
      
      var json = {
        "contactname": name,
        "email": email,
        "password": password,
        "company": compnay,
        "address": address,
        "latitude": dlatitude,
        "longitude": dlongitude,
        "open": open,
        "close": close,
        "chargesperhour": null,
        "logo": null,
        "enabled": true,
        "resetPasswordToken": null
      }
      setLoad(true);
      fetch(`https://tomcat1.shiftescape.com/api/users/edit/${props.id}`,{
        method : "POST",
        headers: {
          "Accept": "application/json",
          'Content-type': 'application/json; charset=UTF-8',
        },
        body : JSON.stringify(json)
      }).then((respons) => {
        setLoad(false);
        respons.json().then((result) => {
          
        })
      }).catch(e => {
        console.log(e);
        setLoad(false);
      });
      console.log(json)
     }else{
     
      alert("Please checked Agree to terms and conditions")
     }
    
  }


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  // Javascript Map Call strat
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      const script = document.createElement('script');

      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfL2oULbnrWbl_G-WdVcxGH8TfEme8dhk&callback=initAutocomplete&libraries=places&v=weekly";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
        effectRan.current = true;
      }
    }
  }, []);
  /**
    * @license
    * Copyright 2019 Google LLC. All Rights Reserved.
    * SPDX-License-Identifier: Apache-2.0
    */
   var lats = parseFloat(props.latitude);
   var lans = parseFloat(props.longitude)
  // alert(lats)
  function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: lats,
        lng: lans
      },
      zoom: 13,
      mapTypeId: "roadmap",
    });

    new google.maps.Marker({
        position: { lat: lats, lng: lans },
        map,
        title: "Hello World!",
      });



    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }
      var addre = places[0].formatted_address
      console.log(places[0].formatted_address)
      setAddress(addre)
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];


      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
            draggable: true,
          })
        );
        console.log(markers[0])

        google.maps.event.addListener(markers[0], 'dragend', function (a) {
          console.log(a);
          setDlatitude(a.latLng.lat())
          setDlongitude(a.latLng.lng())
        });


        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
      let infoWindow = new google.maps.InfoWindow({
      });

      infoWindow.open(map);

    });
  }

  window.initAutocomplete = initAutocomplete;



  // Javascript Map Call strat
  return (<>

    <Container>
      <Row>
        <Col>
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                
                <Form.Label>First name {name}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                 
                  defaultValue={props.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Last name"
                  value={props.email}
                 defaultValue={props.email}
                  onChange={(e) => setMail(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>

                  <Form.Control
                    type="password"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    required
                 //   value={props.password}
                  defaultValue={props.password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a Password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                 type="text"
                 placeholder="Company Name"
                // value={props.company}
                 defaultValue={props.company}
                 required
                 onChange={(e)=>setCompnany(e.target.value)}
                 />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Company Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Opening Hour's</Form.Label>
                <Form.Control
                type="time"
                placeholder="Opening Hour's"
                required onChange={(e)=>setOpen(e.target.value)}
              //  value={props.open} 
                defaultValue={props.open}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Opening Hour's.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>Closes Hour's</Form.Label>
                <Form.Control
                type="time"
                placeholder="Closes Hour's"
                required onChange={(e)=>setClose(e.target.value)}
                //value={props.close}
                defaultValue={props.close}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Closes Hour's.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="12" controlId="validationCustom05">
                <Form.Label>Address </Form.Label>
                <Form.Control
                id="pac-input"
                type="text"
                placeholder="Address "
                required onChange={(e)=>setAddress(e.target.value)}
               // value={props.address}
                defaultValue={props.address}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Address .
                </Form.Control.Feedback>
              </Form.Group>
              <Col>
                <div id="map" style={{ width: "100%", height: "200px", borderRadius: "15px",marginTop:"15px",boxShadow:"0px 0px 5px #ddd"}}></div>
              </Col>
            </Row>
            <Form.Group className="mt-4 mb-3">
              <Form.Check
                id="checked"
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
                value="true"
                onChange={(e)=>setCheck(e.target.value)}
              />
            </Form.Group>
            <Button onClick={sub}>
            {load && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Submit form</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </>)
}

export default Updateform