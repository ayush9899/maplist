import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Updateform from "./updateform";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function CompanyList() {
  const [data, setdata] = useState([]);
  const [load, setLoad] = useState(false)
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const handlesClose = () => setShow(false);
  const handlesShow = () => setShow(true);
  /*---------------------props------------------------*/
  const [contactname, setContactname] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updatCompany, setUpdatCompany] = useState("");
  const [updateOpen, setUpdateOpen] = useState("");
  const [updateClose, setUpdateClose] = useState("")
  const [updateAddress, setUpdateAddress] = useState("")
  const [updateLatitude, setUpdateLatitude] = useState();
  const [updateLongitude, setUpdateLongitude] = useState("")
  const [id, setId] = useState()
  /*---------------------props------------------------*/
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      headerClassName:
      'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'contactname',
      headerName: 'Name',
      width: 150,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'company',
      headerName: 'Company Name',
      width: 200,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 500,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'open',
      headerName: 'Open Time',
      width: 100,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'close',
      headerName: 'Close Time',
      width: 100,headerClassName: 'super-app-theme--header',
      headerAlign: 'center'
    },
    {
      field: 'Action',
      width: 200,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        const onClickDelete = async () => {
          fetch(`https://tomcat1.shiftescape.com/api/users/delete/${params.row.id}`, {
            method: "POST"
          }).then((response) => {
            setdata(data.filter((row) => row.id !== params.row.id));
            console.log(response);
          })
        };

        const onClickEdit = async () => {
          setShow(true);
          setContactname(params.row.contactname)
          setUpdateEmail(params.row.email)
          setUpdatePassword(params.row.password)
          setUpdatCompany(params.row.company)
          setUpdateOpen(params.row.open)
          setUpdateClose(params.row.close)
          setUpdateAddress(params.row.address)
          setUpdateLatitude(params.row.latitude)
          setUpdateLongitude(params.row.longitude)
          setId(params.row.id);
        };

        return (
          <>
            <Button
              onClick={onClickDelete}
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
            >
              Delete
            </Button>
            <Button
              onClick={onClickEdit}
              variant="contained"
              color="error"
              size="small"
              style={{ marginLeft: 16 }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ]

  function handleShow(breakpoint, item) {
    setFullscreen(breakpoint);
    setShow(true);
    setContactname(item.contactname)
    setUpdateEmail(item.email)
    setUpdatePassword(item.password)
    setUpdatCompany(item.company)
    setUpdateOpen(item.open)
    setUpdateClose(item.close)
    setUpdateAddress(item.address)
    setUpdateLatitude(item.latitude)
    setUpdateLongitude(item.longitude)
    setId(item.id)
  }

  function getList() {
    setOpen(!open);
    fetch("https://tomcat1.shiftescape.com/api/users").then((response) => {
      setLoad(false);
      response.json().then(((result) => {
        setdata(result);
        setOpen(false);
      }))
    }).catch(e => {
      
      console.log(e);
      setLoad(false);
    });
  }

  useEffect(() => {
    setLoad(true);
    getList();
  }, [id])

  return (
    <>
      <Box sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={data}
          // disableColumnFilter
          // disableColumnSelector
          // disableDensitySelector
          columns={columns}
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          rowsPerPageOptions={[10, 25, 100]}
          checkboxSelection
          // preProcessEditCellProps
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Updateform
            id={id}
            name={contactname}
            password={updatePassword}
            email={updateEmail}
            address={updateAddress}
            open={updateOpen}
            close={updateClose}
            company={updatCompany}
            latitude={updateLatitude}
            longitude={updateLongitude}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlesClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default CompanyList