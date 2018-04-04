import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

//import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state = {
    persons: [
      {id: '01', name: 'Mark', age: 51},
      {id: '02', name: 'Matthew', age: 40},
      {id: '03', name: 'Michelle', age: 65}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // get user entered name
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    // update person name
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    // copy persons array
    //const persons = this.state.persons.slice(); - old approach
    const persons = [...this.state.persons]; // new approach
    // remove a single element from array persons
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;

    let btnClass = '';

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
                        click={() => this.deletePersonHandler(index)}
                        name={person.name} 
                        age={person.age} 
                        key={person.id}
                        changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = classes.Red;
      
      /*
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
      */
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return (
      //<StyleRoot>
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      //</StyleRoot>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m A React App!!!'));
  }
}

// export default Radium(App);
export default App;
