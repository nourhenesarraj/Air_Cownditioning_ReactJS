import React ,{useState} from 'react';
import Thermo from './thermometre';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import NumericInput from 'react-numeric-input';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';


  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop:90,
      marginBottom:20
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 25,
      color:"black",
      fontFamily:"Georgia, serif",
      fontWeight: "bold",
      marginBottom: 30
    },
    pos: {
      marginBottom: 12,
      marginTop:10
    },
    btnConfirm:{
        marginLeft:90
    },
    temp:{
        border : 'none',
        backgroundColor : '#035aa6',
        width:120,
        position : 'center',
        size:50,
        fontSize:37,
        color:'white'
    },
    '&:hover': {
        background: "#035aa6",
        outline : 'none',
        border:'none'
     },
  });
  const useStyles2 = makeStyles((theme) => ({
    root: {
      width: '350px',
      '& > * + *': {
        marginTop: theme.spacing(0.1),
      },
      marginBottom: theme.spacing(0.1),
    },
  }));

const Accueil = () => {

    const classes = useStyles();
    const classes2 = useStyles2();
    const [value , setvalue] = useState("");
    const [open, setOpen] = useState(true);
    const [error, setError] = useState("")
    const [showTh, setshowTh] = useState(false)
    const [showcard, setshowcard] = useState(true)
    const initialFieldValues = {
      Id: 0,
      Temperature: '',
  }
  const [Values, setValues] = useState([initialFieldValues])


    const Changevalue = (e) =>{
        setvalue(e)
        
    }
  
    var i =1;

    function Press(){
      
        if(value !== "" ){
            if(value === 0){
                setError("Please Enter a Number greater than 0!")
                setOpen(true)
            }else{

            console.log("val 1:",value)
            
            for(i ; i < value ; i++){
           Values.push({ 'Id' : i , 'Temperature' : ''})
           
          }
            setshowTh(true)
            setshowcard(false)
            }
        }else{
            setError("Please Enter a Number!")
            setOpen(true)
        }
        console.log("values:",Values)
         
    }

    return(
        <React.Fragment>
       
         {error && 
          <div className={classes2.root}>
         <Collapse in={open}>
              <Alert variant="outlined" severity="error" action={
            <IconButton
              aria-label="close"
              color="red"
              size="large"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="small"  />
            </IconButton>
          }>{error}</Alert>
          </Collapse>
          </div>
        }
        {showcard && 
         <Card id="mycard" className={classes.root} variant="outlined">
         <CardContent>
      
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Welcome,
        </Typography>
        <Typography variant="subtitle2" component="h5">
         Please Enter the Number of Stalls:
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        <NumericInput min={0} max={100} name="Id" onChange={(e) => {Changevalue(e)}} required />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  color="secondary" className={classes.btnConfirm} onClick={Press} >CONFIRM</Button>
      </CardActions>
    </Card>
    }
    {showTh &&
          <Thermo nbr={Values} />
    }
      
        </React.Fragment>
        )
}

export default Accueil;
