import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyList from "./clist";
import Search from "./companysearch";
import Header from './header';
import Registration from "./registration";
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
                
            </Routes>
         </Router>
        </>
    )
}

export default MainRouter