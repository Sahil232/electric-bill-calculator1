import React, { useState } from 'react';
// import CSVReader from "react-csv-reader";
import { useForm } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function RateB() {

    const { register, handleSubmit, errors } = useForm();
    // const [getExcelData, setExcelData] = useState(0);
    const [getCurrentPay, setCurrentPay] = useState(0);
    const [getTotal, setTotal] = useState(0);
    const [value, setValue] = React.useState('1');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    const onSubmit = data => {
            // const excelData = getExcelData.getExcelData;
            let TotalkWh = 0;
            // if(excelData){
            //     TotalkWh = excelData.reduce((TotalkWh, key) => {
            //         let time = key.date_time.trim();
            //         let hour = time.substr(7, 2);
            //         if(parseInt(value)===1 && (hour>=12 && hour<=18)){
            //             return TotalkWh + key.electricity_facility__kwh__hourly_;
            //         }else if(parseInt(value)===2){
            //             if(hour>=12 && hour<=18){}
            //             else{
            //                 return TotalkWh + key.electricity_facility__kwh__hourly_;
            //             }
            //         }
            //         return TotalkWh
            //     }, 0);
            // }
            const { drive_miles, current_pay } = data;
            const total_kwh = 9003.714027
            setCurrentPay((parseFloat(total_kwh) + parseFloat(drive_miles) * 0.3) * parseFloat(current_pay));

            // setCurrentPay(current_pay);

            if (parseFloat(value) === 1) {  //if user select option to charge the vehicle between 12pm-6pm//
                let TotalkWh1 = 2605.8635994650062; //total units from 12pm to 6pm//
                let TotalkWh2 = 6397.850427506976;  //total units otherwise//
                // setTotal((parseFloat(TotalkWh) + parseFloat(drive_miles) * 0.3) * 0.20);
                setTotal(((parseFloat(TotalkWh1) + parseFloat(drive_miles) * 0.3) * 0.20) + (parseFloat(TotalkWh1) * 0.08));
                // setCurrentPay((parseFloat(TotalkWh) + parseFloat(drive_miles) * 0.3) * parseFloat(current_pay));
            } else {                //if user select option to charge the vehicle otherwise//
                let TotalkWh1 = 6397.850427506976;   //toal units otherwise//
                let TotalkWh2 = 2605.8635994650062;  //total units from 12pm to 6pm//
                // setTotal((parseFloat(TotalkWh) + parseFloat(drive_miles) * 0.3) * 0.08);
                setTotal(((parseFloat(TotalkWh1) + parseFloat(drive_miles) * 0.3) * 0.08) + (parseFloat(TotalkWh2) * 0.20));
                // setCurrentPay((parseFloat(TotalkWh) + parseFloat(drive_miles) * 0.3) * parseFloat(current_pay));
            }
        }
        // const handleForce = (data) => setExcelData({getExcelData: data});

    // const papaparseOptions = {
    //     header: true,
    //     dynamicTyping: true,
    //     skipEmptyLines: true,
    //     transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    //   };


    return (

            <
            div className = 'container' >
            <
            div >
            <
            form onSubmit = { handleSubmit(onSubmit) } >
            <
            h1 > Rate B Calculation < /h1>  <
            label > What is your current $ / kWh rate ? < /label>  <
            input type = "number"
            step = "any"
            placeholder = "(Between $0.00 - $1.00)"
            name = "current_pay"
            ref = { register({ required: true, min: 0, max: 1 }) }
            /> {
            errors.current_pay && ( <
                p > Please enter a value between $0 .00 - $1 .00 < /p>
            )
        } <
        label > How many miles do you drive per year ? < /label> <
    input type = "number"
    step = "any"
    placeholder = "On avg.17,000 miles/year"
    name = "drive_miles"
    ref = { register({ required: true, max: 17000 }) }
    /> {
    errors.drive_miles && ( <
        p > On avg .17, 000 miles / year < /p>
    )
} <label className = 'period'> What hours of day will you charge your car ? </label>   
        <RadioGroup aria-label = "period"
name = "period"
value = { value }
onChange = { handleChange } >
    <
    FormControlLabel value = "1"
control = { < Radio / > }
label = "12:00 pm - 6:00 pm" / >
    <
    FormControlLabel value = "2"
control = { < Radio / > }
label = "6:00 pm - 11:59 am" / >
    <
    /RadioGroup>

{ /*<CSVReader*/ } { /*    cssClass="react-csv-input"*/ } { /* label="Select CSV with USA NY Buffalo.725280 TMY2"*/ } { /*    onFileLoaded={handleForce}*/ } { /*    parserOptions={papaparseOptions}*/ } { /*/>*/ } <
input type = "submit" / >
    <
    /form> < /
div >
    <
    div className = 'display-result' >
    <
    h1 > Final Bill < /h1>

<
div className = "parent-div" >
    <
    div className = "current-pay" >
    <
    h2 > Total bill with current pay < /h2> <
h2 > $ { getCurrentPay.toFixed(2) } < /h2> < /
div > <
    div >
    <
    h2 > Total bill with Rate B < /h2> <
h2 > $ { getTotal.toFixed(2) } < /h2> < /
div > <
    /div> <
h2 > Result < /h2> {
getCurrentPay && getTotal ? getCurrentPay > getTotal ? 'Rate B is cheaper than what you pay currently ' : 'Currently you pay cheaper than Rate B' : ''
} <
/div>

{ /*<div className='display-result'>*/ } { /*    <h1>Bill With Rate 2 TOU</h1>*/ } { /*    <h2>Current rate you pay for Electricity: {getCurrentPay}</h2>*/ } { /*    <h2>Total amount: {getTotal.toFixed(2)}</h2>*/ } { /*</div>*/ } <
/div>
);
}

export default RateB;