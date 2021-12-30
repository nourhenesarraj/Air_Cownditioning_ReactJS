import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckboxList from './list';



const useStyles = makeStyles({
    temp:{
        border : 'none',
        backgroundColor : '#035aa6',
        width:90,
        position : 'center',
        size:70,
        fontSize:37,
        color:'white',
        marginLeft:20
    },
    '&:hover': {
        background: "#035aa6",
        outline : 'none',
        border:'none'
     },
    
    
})

const Thermo = (nbr) => {
    const classes = useStyles();

    const [temperatureValue, setTemperatureValue] = useState(10);
    const [temperatureColor, setTemperatureColor] = useState('cold');
    const [showList, setshowList] = useState(false);
    const [showTh, setshowTh] = useState(true)
    const tempadd=()=>{
        Object.keys(nbr).map(val =>{
            Object.keys(nbr[val]).map(val1 =>{
            nbr[val][val1].Temperature = temperatureValue;
            })
        })
    }
    tempadd()


    const inputclick= (e) => {
        
        setTemperatureValue(e.target.value)
        if (e.target.value >= 15) {
            setTemperatureColor('hot');
            document.getElementById("temp").style.backgroundColor = "#ff1100"
        }
        if (e.target.value < 15) {
            setTemperatureColor('cold');
            document.getElementById("temp").style.backgroundColor = "#035aa6"
            
        }
       
    }
    const increaseTemperature = () => {
        const newTemperature = parseInt(temperatureValue) + 1;
        setTemperatureValue(parseInt(temperatureValue) + 1);
        document.getElementById("temp").value = newTemperature;
        
    
        if (newTemperature >= 15) {
            setTemperatureColor('hot');
            document.getElementById("temp").style.backgroundColor = "#ff1100"
        }
    };
    
    const decreaseTemperature = () => {
        const newTemperature = temperatureValue - 1;
        setTemperatureValue(temperatureValue - 1);
        document.getElementById("temp").value = newTemperature;
        if (newTemperature < 15) {
            setTemperatureColor('cold');
            document.getElementById("temp").style.backgroundColor = "#035aa6"
            
        }
    };
    function Press(e){
      
       setshowList(true)
       setshowTh(false)
            }
 

  return (
   <>
   {showTh &&
        <div className='app-container'>
            <div className='temperature-display-container'>
                <div className={`temperature-display ${temperatureColor}`}><input id="temp" defaultValue={temperatureValue} className={classes.temp} onChange={(e) => {inputclick(e)}} />°C</div>
            </div>
            <div className='button-container'>
                <button onClick={increaseTemperature}>+</button>
                <button onClick={decreaseTemperature}>-</button>
            </div>
            <div className="btnConfirm">
                <Button size="small"  onClick={Press}>CONFIRM</Button>
            </div>
        </div>
        }

          {showList &&
          <CheckboxList nbr={nbr} />
          }
   </>
  );
};

export default Thermo;