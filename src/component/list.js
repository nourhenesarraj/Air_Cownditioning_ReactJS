import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Icon } from 'semantic-ui-react'
import  { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

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
    const useStyles2 = makeStyles((theme) => ({
    root: {
      width: '350px',
      '& > * + *': {
        marginTop: theme.spacing(0.1),
      },
      marginBottom: theme.spacing(0.1),
    },
  }));

export default function CheckboxList(nbr) {

    const classes = useStyles();
    const classes2 = useStyles2();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = 
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

  const [checked, setChecked] = React.useState([]);
  const [checkedList, setCheckedList] = React.useState([]);
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("")

    const tab= [];
    var xtemp= '';

   //save the Array of nbr stalles and there temperature on a new tab:
        Object.keys(nbr).map(value =>{
            Object.keys(nbr[value]).map(val1 =>{
             Object.keys(nbr[value][val1]).map(val2 =>{
                 tab.push(nbr[value][val1][val2])
                 xtemp = nbr[value][val1][val2].Temperature
             })
            })
        })


  const handleToggle = (value,nbr) => () => {
    
    const currentIndex = checked.indexOf(value);
    const currentIndexList = checkedList.indexOf(value);
    const newChecked = [...checked];
    const list=[...checkedList];

    if (currentIndex === -1 && currentIndexList === -1) {
      newChecked.push(value);
     list.push({
         Id: value,
         Temperature : nbr
        });
    } else {
     //remove one item from currentindex
      newChecked.splice(currentIndex, 1);
      list.splice(currentIndexList, 1);
     
    }
    setChecked(newChecked);
    setCheckedList(list);

  };
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

    const [temperatureValue, setTemperatureValue] = useState(xtemp);
    const [temperatureColor, setTemperatureColor] = useState('cold');
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

    var diff = [];
    var diff1 = [];
    var diff2=[];
    var dist =0;
    var sum =0;

  function Press(e){
 
     tab.map(value =>{
     if (checkedList.some(e => e.Id === value.Id)){
    diff.push(temperatureValue - value.Temperature) 
    value.Temperature = temperatureValue 
     }
    })

    diff1.push(0);
    diff2.push(0);
    diff.map(d => {
        diff1.push(d)
        diff2.unshift(d)
    })
 
    Object.keys(diff1).map(dif => {
      Object.keys(diff2).map(dif2 =>{
            if(dif === dif2){
            sum += Math.abs(diff2[dif2] - diff1[dif])
            dist = ~~(sum/2)
            }
        })
    })

    setMsg(`The min Number of commands : ${dist}`)
    setOpen(true)
    setChecked([])
    setCheckedList([])
         }

  return (
  <>

    <List sx={{ width: '300px', maxWidth: 500, bgcolor: 'background.paper' , marginLeft : '100px' , marginTop : '150px' }}>
     
      { tab.map(value =>{
      
        const labelId = `checkbox-list-label-${value.Id}`
      
        return (
            <>
          <ListItem
            key={value}
            secondaryAction={
           <Icon name='thermometer half' size='large' />
            }
           
          >
            <ListItemButton role={undefined} onClick={handleToggle(value.Id , value.Temperature)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.Id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Stall${value.Id + 1}`} />
            </ListItemButton>
            <span style={{marginLeft : '120px'}}>{ value.Temperature}°C</span>
          </ListItem>
          
            </>
        );
  
      })}  
    </List>
    <div style={{marginLeft : '600px' , marginTop:'-320px'}}>
    <div className='app-container'>
            <div className='temperature-display-container'>
                <div className={`temperature-display ${temperatureColor}`}><input id="temp" defaultValue={temperatureValue} className={classes.temp} onChange={(e) => {inputclick(e)}} />°C</div>
            </div>
            <div className='button-container'>
                <button onClick={increaseTemperature}>+</button>
                <button onClick={decreaseTemperature}>-</button>
            </div>
            <div className="btnConfirm">
                <Button size="medium" onClick={Press}>Confirm</Button>
            </div>
        </div>
      </div>
      {msg && 
          <div className={classes2.root}>
         <Collapse in={open}>
              <Alert variant="outlined" severity="info" action={
            <IconButton
              aria-label="close"
              color="red"
              size="medium"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="small"  />
            </IconButton>
          }>{msg}</Alert>
          </Collapse>
          </div>
        }
    </>

  );
}
