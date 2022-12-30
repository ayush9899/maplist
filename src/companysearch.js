/*global google*/
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Search() {
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
           console.log("search data  "+result);
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
useEffect(()=>{searchWord()},[])


  var arryLocation = [{}];

  for (var i = 0; i < data.length; i++) {
    arryLocation.push({
      lat: parseFloat(data[i].latitude),
      lng: parseFloat(data[i].longitude)
    })
  }
//console.log("arryLocation", arryLocation)
  function searchMark() {
    // The location of Uluru
   // console.log("arryLocation 222", arryLocation)
    var maks = arryLocation[1];
    const uluru = maks;
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
var marlength = arryLocation.length;
var dataMaps = data.map((row)=>row.id);
var ids = ["ids38","ids47","ids49","ids62","ids63","ids64","ids65","ids66","ids67","ids68","ids69","ids70","ids71"]
for(var i = 0; i < marlength; i++){
 
  console.log('arryLocation[i]',arryLocation[i])
  new google.maps.Marker({
    position: arryLocation[i],
   title: data[i].company,
   map:map
  }).addListener('click', function(i){
    for(var d = 0; d < ids.length; d++){
      //console.log(ids[d]);
      var cardbox = document.getElementsByClassName("cls");
      var cls = cardbox[d].classList.contains("border-success");
      if(cls == true){
        console.log('cls is tru')
        document.getElementById(ids[d]).classList.remove("border-success");
      }else{
        console.log('cls is false')
        document.getElementById(ids[d]).classList.add("border-success");
      }
     // document.getElementById(ids[0]).classList.add("border-success");
    }
alert(ids[i])


  });

 // location.push({title: data[i].company,position: new google.maps.LatLng(arryLocation[i].lat,arryLocation[i].lng),map:map, animation: google.maps.Animation.DROP,})
  
}



  }
  window.searchMark = searchMark;

  var map
  function getLocation(e) {
    var getMap = document.getElementById('map');
    var createMap = {
      center: new google.maps.LatLng(e.lat, e.lng),
      zoom: 10,
    };
    map = new google.maps.Map(getMap, createMap);
    var laLatLng = new google.maps.LatLng(e.lat, e.lng)
    map.panTo(laLatLng);
    map.setZoom(14);


    new google.maps.Marker({
      position: e,
      map,

    });

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
      <Container className="mt-5">
        <Row>

          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Address</Form.Label>
              <Form.Control id="search-input" className="controls" type="text" placeholder="Search Box" onChange={(e) => {searchWord(e.target.value) }} />
            </Form.Group>

            <Row>
              <Col>
                <div className="scroll" style={{height: "70vh", overflowX: "scroll"}}>
                {
                  data.map((item,key) =>
                    <Card className="mt-3 cls" id={`ids${item.id}`}>
                      <Card.Body>
                        <Card.Title>{item.company}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{item.contactname}</Card.Subtitle>
                        <Card.Text>
                          {item.address}
                        </Card.Text>
                        <Card.Link href={"mailto:" + item.email}>Email</Card.Link> <span>&nbsp;</span>
                        <Button onClick={() => getLocation({ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) })}>Location</Button>
                      </Card.Body>
                    </Card>
                  )
                }

                </div>
                {/* {
                  data.map((item) =>
                  search == item.company ?
                    <Car d className="mt-3">
                      <Card.Body>
                        <Card.Title>{item.company}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{item.contactname}</Card.Subtitle>
                        <Card.Text>
                          {item.address}
                        </Card.Text>
                        <Card.Link href={"mailto:" + item.email}>Email</Card.Link> <span>&nbsp;</span>
                        <Button onClick={()=>getLocation({lat:parseFloat(item.latitude),lng:parseFloat(item.longitude)})}>Location</Button>
                      </Card.Body>
                    </Card>
                     : null
                  )
                } */}
              </Col>
            </Row>
          </Col>
          <Col>

            <div id="map" style={{ width: "100%", height: "400px", }}></div>
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

export default Search;

