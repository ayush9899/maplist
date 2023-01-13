/*global google*/
import './App.css';
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function SearchMap() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState()
  const [open, setOpen] = useState(false);
  // Google map API Key
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      const script = document.createElement('script');

      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfL2oULbnrWbl_G-WdVcxGH8TfEme8dhk&callback=searchMark&libraries=places&v=weekly";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
        effectRan.current = true;
      }
    }
  }, []);
  // Get API Call
  useEffect(() => {
    fetch(`http://65.20.74.140:8080/ReactJsGoogleMapWeb/api/users/page?address=`).then((response) => {
      response.json().then((result) => {
        console.log("search data  " + result);
        setData(result)
        setOpen(false);
      })
    })
  }, [])

  async function searchWord(key) {
    let result = await fetch(`http://65.20.74.140:8080/ReactJsGoogleMapWeb/api/users/page?address=${key}`);
    result = await result.json();
    setData(result)
    console.log(result);
  }
  useEffect(() => { searchWord() }, [data])


  var arryLocation = [];

  for (var i = 0; i < data.length; i++) {
    arryLocation.push({
      lat: parseFloat(data[i].latitude),
      lng: parseFloat(data[i].longitude)
    })
  }

  var maks = arryLocation[1];
  var marlength = arryLocation.length;

  function searchMark() {

    var getMap = document.getElementById('map');
    var createMap = {
      center: new google.maps.LatLng(maks.lat, maks.lng),
      zoom: 10,
    };

    map = new google.maps.Map(getMap, createMap);

    for (var i = 0; i <= marlength; i++) {

      var marker = new google.maps.Marker({
        title: data[i].company,
        position: new google.maps.LatLng(arryLocation[i].lat, arryLocation[i].lng),
        map: map,
        myID: data[i].id,
      });

      google.maps.event.addListener(marker, 'click', function () {

        var cls = document.getElementsByClassName("border-success");
        var clsLength = cls.length;

        if (clsLength == 0) {
          document.getElementById(`ids${this.myID}`).classList.add("border-success");
        } else if (clsLength > 0) {
          cls[0].classList.remove("border-success");
          document.getElementById(`ids${this.myID}`).classList.add("border-success");
        }

        var scroll = document.getElementById("scroll");
        var divOffset = document.getElementById(`ids${this.myID}`).offsetTop;

        if (divOffset < 462) {
          scroll.scrollTop = 0;
        } else {
          scroll.scrollTop = divOffset - 250;
        }

      });

    }

  }


  var map
  function getLocation(e) {
    var laLatLng = new google.maps.LatLng(e.lat, e.lng)
    map.panTo(laLatLng);
    map.setZoom(14);
    window.setTimeout(function () {
      map.setZoom(10);
    }, 3000);

  }


  // Goofle map
  useEffect(() => {

    setTimeout(function () {
      searchMark();
    }, 1000)

  }, [data])

  /*---------------Google-Map-Function---------------*/


  /*----------------API-Post-Method-------------------*/



  return (
    <>
      {/* <h1>Search Map</h1> */}
      <Container fluid>
        <Row>

          <Col>
            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Address</Form.Label>
              <Form.Control id="search-input" className="controls" type="text" placeholder="Search Box" onChange={(e) => { searchWord(e.target.value) }} />
            </Form.Group>

            <Row>
              <Col>
                <div className="scroll" id="scroll" style={{ height: "75.1vh", overflowX: "scroll" }}>
                  {
                    data.map((item, key) =>
                      <Card className="mt-3 cls" id={`ids${item.id}`}>
                        <Card.Body>
                          <Card.Title>{item.company}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{item.contactname}</Card.Subtitle>
                          <Card.Text>
                            {item.address}<br />
                            <b>Location:- {item.latitude},{item.longitude}</b>
                          </Card.Text>
                          <Card.Link href={"mailto:" + item.email}>Email</Card.Link> <span>&nbsp;</span>
                          <Button onClick={() => getLocation({ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) })}>Location</Button>
                        </Card.Body>
                      </Card>
                    )
                  }

                </div>

              </Col>
            </Row>
          </Col>
          <Col>

            <div id="map" style={{ width: "100%", height: "100%", }}></div>

          </Col>
        </Row>

      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default SearchMap;

