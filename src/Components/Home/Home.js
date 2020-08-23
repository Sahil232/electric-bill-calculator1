import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import '../style.css';
import RateA from "../RateA/RateA";
import RateB from "../RateB/RateB";
import './Home.css';
function Home() {
    const [getClickButton, setClickButton] = useState(0);

    function handleClick(button) {
        setClickButton(button);
    }

  return (
      <div>
          <div className='common-area'>
          <Button onClick={(e) => handleClick('a')} className='rate active' variant="contained" color="primary">Rate A</Button>
          <label >Rate A is a flat $0.15/kWh </label>
          <Button onClick={(e) => handleClick('b')} className='rate' variant="contained" color="secondary">Rate B</Button>
          <label >Rate B is a TOU rate of $0.20/kWh between noon and 6pm, and $0.08/kWh otherwise  </label>
          </div>
          
          {
              getClickButton==='a'?<RateA/>:''
          }
          {
              getClickButton==='b'?<RateB/>:''
          }
      </div>
  );
}

export default Home;