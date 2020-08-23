import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function RateA() {

    const { register, handleSubmit, errors } = useForm();
    const [getCurrentPay, setCurrentPay] = useState(0);
    const [getTotal, setTotal] = useState(0);
    const onSubmit = data => {

        const {drive_miles,current_pay} = data;
        const total_kwh = 9003.714027
        setCurrentPay((parseFloat(total_kwh)+parseFloat(drive_miles)*0.3)*parseFloat(current_pay));
        setTotal((parseFloat(total_kwh)+parseFloat(drive_miles)*0.3)*0.15);
    }

  return (

    <div className='container'>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Rate A Calculation</h1>
                <label>What is your current $/kWh rate?</label>
                <input type="number" step="any" placeholder="(Between $0.00 - $1.00)" name="current_pay" ref={register({required: true, min:0, max: 1})} />
                    {errors.current_pay && (
                        <p>Please enter a value between $0.00 - $1.00</p>
                    )}
                <label>How many miles do you drive per year?</label>
                <input type="number" step="any" placeholder="On avg. 17,000 miles/year" name="drive_miles" ref={register({required: true})} />
                    {errors.drive_miles && (
                        <p>Miles you drive per year is required</p>
                    )}
                {/*<label>USA NY Buffalo.725280 TMY2</label>*/}
                {/*<input type="number" step="any" placeholder="USA NY Buffalo.725280 TMY2" name="total_kwh" ref={register({required: true})} />*/}
                {/*    {errors.total_kwh && (*/}
                {/*        <p>USA NY Buffalo.725280 TMY2 is required</p>*/}
                {/*    )}*/}
                <input type="submit" />
            </form>
        </div>
        <div className='display-result'>
            <h1>Final Bill</h1>

            <div className="parent-div">
                <div className="current-pay">
                    <h2>Total bill with current pay</h2>
                    <h2> ${getCurrentPay.toFixed(2)}</h2>
                </div>
                <div>
                    <h2>Total bill with Rate A ($0.15/kWh)</h2>
                    <h2>${getTotal.toFixed(2)}</h2>
                </div>
            </div>
            <h2>Result </h2>
            {
                   getCurrentPay && getTotal?getCurrentPay>getTotal?'Rate A is cheaper than what you pay currently ':'Currently you pay cheaper than Rate A':''
            }
        </div>
    </div>
  );
}

export default RateA;