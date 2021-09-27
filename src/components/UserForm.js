import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import StartForm from './StartForm';
import Success from './Success';

/*
 const [data,setData]=useState([]);
  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  const [age, setAge] = useState(19);
  const handleClick = () => setAge(age + 1)
  return <div> 
      Today I am {age} Years of Age 
      <div> 
        <button onClick={handleClick}>Get older! </button>
      </div>
   </div>
*/

export class UserForm extends Component {
  state = {
    step: 0,
    LOCATION: '',
    TARGET_INDOOR_TEMPERATURE: 20,
    EMITTER_TYPE: null,
    HOUSE_CONSTRUCTION_YEAR: null,
    HEATED_AREA_M2: null,
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Go back to first step
  resetStep = () => {
    this.setState({
      step: 0,
      LOCATION: '',
      TARGET_INDOOR_TEMPERATURE: 20,
      EMITTER_TYPE: null,
      HOUSE_CONSTRUCTION_YEAR: null,
      HEATED_AREA_M2: null,
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { LOCATION, TARGET_INDOOR_TEMPERATURE, EMITTER_TYPE, HOUSE_CONSTRUCTION_YEAR, HEATED_AREA_M2 } = this.state;
    const values = { LOCATION, TARGET_INDOOR_TEMPERATURE, EMITTER_TYPE, HOUSE_CONSTRUCTION_YEAR, HEATED_AREA_M2 };

    switch (step) {
      case 0:
        return (
          <StartForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      // case 2:
      //   return (
      //     <Confirm
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       values={values}
      //     />
      //   );
      case 2:
        return <Success 
            resetStep={this.resetStep}
            prevStep={this.prevStep}
            values={values}
          />;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default UserForm;
