import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyList from "./clist";
import Search from "./companysearch";
import Header from './header';
import Login from "./login";
import Registration from "./registration";
import SearchMap from "./table.js";
import QuickSearchToolbar from "./table.js"
function MainRouter(){
    return(
        <>
         <Router>
            <Header/>
            <Routes>
                <Route path="/" element={ <Registration/>}/>
                <Route path="/companyList" element={<CompanyList/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/login" element={<Login/>}/>
                
            </Routes>
         </Router>
        </>
    )
}

export default MainRouter