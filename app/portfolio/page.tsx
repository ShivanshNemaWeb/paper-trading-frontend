import Portfolio from "@/app/dashboard/Components/portfolio";
import MoneyState from "../dashboard/Components/MoneyState";
import AsideBar from "../dashboard/Components/AsideBar";
const portfolio = () => {
    return(<>
    <div style={{display:'flex'}}>
    <AsideBar/>
    <div>
    <div style={{marginTop:'4%'}}>
    <MoneyState />
    </div>
     <div style={{marginLeft:'5%'}}>
     <Portfolio />
     </div>
     </div>
     </div>
    </>)
}

export default portfolio;