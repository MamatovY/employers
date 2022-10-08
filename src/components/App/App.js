import { Component } from 'react';
import AppFilter from '../AppFilter/AppFilter';
import AppInfo from '../AppInfo/AppInfo';
import EmployersAddForm from '../EmployersAddForm/EmployersAddForm';
import EmployersList from '../EmployersList/EmployersList';
import SearchPanel from '../SearchPanel/SearchPanel';
import './App.css';











class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, name: 'Алмазн', salary: '3000', increase: false, rise: false },
        { id: 2, name: 'Ыйман', salary: '5000', increase: true, rise: true },
        { id: 3, name: 'Кума', salary: '400', increase: true, rise: false },
        { id: 4, name: 'Самат', salary: '4004', increase: false, rise: true }
      ],
      term: '',

      filter: 'all'
    }
  }




  deleteItem = (id) => {

    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })

  }

  addItem = (name, salary) => {

    this.setState(({ data }) => {
      return {
        data: ([...this.state.data, { id: data.length + 1, name, salary, increase: false, rise: false }])
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    }))
  }

  searchEmp = (items, term, filter) => {
    if (term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onFilter = (items, filter) => {
    if (filter === 'rise') {
      return items.filter(item => item.rise)
    }

    if (filter === 'salary') {
      return items.filter(item => item.salary > 1000)
    }

    return items
  }




  onFilterUpdate = (filter) => {
    this.setState({ filter })
  }

  onSearchUpdate = (term) => {
    this.setState({ term })
  }



  onUpdateSalary = (id, salary) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, salary }
        }
        return item
      })
    }))
  }


  render() {
    const { data, term, filter } = this.state
    const visibleData = this.onFilter(this.searchEmp(data, term), filter)
    const numIncrease = visibleData.filter(item => item.increase)


    return (
      <div className="app">
        <AppInfo
          numEmployees={visibleData.length}
          numIncrease={numIncrease.length}
        />
        <div className="searchPanel">
          <SearchPanel onSearchUpdate={this.onSearchUpdate} />
          <AppFilter filter={filter} onFilterUpdate={this.onFilterUpdate} />
        </div>
        <EmployersList
          onUpdateSalary={this.onUpdateSalary}
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployersAddForm addForm={this.addItem} />
      </div>
    );
  }

}

export default App;
