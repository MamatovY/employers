import { useCallback, useEffect, useState } from "react"
import AppFilter from "../../components/AppFilter/AppFilter"
import AppInfo from "../../components/AppInfo/AppInfo"
import EmployersAddForm from "../../components/EmployersAddForm/EmployersAddForm"
import EmployersList from "../../components/EmployersList/EmployersList"
import SearchPanel from "../../components/SearchPanel/SearchPanel"

import './main.css'




const Main = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')

    const request = useCallback(async (url, method = 'GET', body = null,
        headers = { 'Content-Type': 'application/json' }
    ) => {
        try {
            const response = await fetch(url, { method, body, headers })
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json()
            return data
        } catch (e) {
            throw e
        }

    }, [])


    const update = (result) => {
        setData(result)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        request('http://localhost:3001/people').then(response => update(response))
    }, [])


    const deleteItem = (id) => {
        setLoading(true)
        request(`http://localhost:3001/people/${id}`, 'DELETE')
        setLoading(false)
        const newData = data.filter(item => item.id !== id)
        setData(newData)
    }

    const addItem = (name, salary) => {
        setData([...data, { id: data.length + 1, name, salary, increase: false, rise: false }])

        let body = { id: data.length + 1, name: name, salary: salary, increase: false, rise: false }
        let json = JSON.stringify(body)
        setLoading(true)
        request('http://localhost:3001/people', 'POST', json)
        setLoading(false)
    }

    const onToggleProp = (id, prop) => {
        const newData = data.map(item => {
            if (item.id === id) {
                let body = { [prop]: !item[prop] }
                let json = JSON.stringify(body)
                request(`http://localhost:3001/people/${id}`, 'PATCH', json)
                return { ...item, [prop]: !item[prop] }
            }
            return item
        })

        setData(newData)
    }

    const onUpdateSalary = (id, salary) => {
        let body = { salary: salary }
        let json = JSON.stringify(body)
        request(`http://localhost:3001/people/${id}`, 'PATCH', json)

        const newData = data.map(item => {
            if (item.id === id) {
                return { ...item, salary }
            }
            return item
        })
        setData(newData)
    }

    const searchEmp = (items, term, filter) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    const onFilter = (items, filter) => {
        if (filter === 'rise') {
            return items.filter(item => item.rise)
        }

        if (filter === 'salary') {
            return items.filter(item => item.salary >= 1000)
        }

        return items
    }




    const onFilterUpdate = (filter) => {
        setData(filter)
    }

    const onSearchUpdate = (term) => {
        setTerm(term)
    }








    const visibleData = onFilter(searchEmp(data, term), filter)
    const numIncrease = visibleData.filter(item => item.increase)

    return (
        <div className="main">
            <AppInfo
                numEmployees={visibleData.length}
                numIncrease={numIncrease.length}
            />
            <div className="searchPanel">
                <SearchPanel onSearchUpdate={onSearchUpdate} />
                <AppFilter filter={filter} onFilterUpdate={onFilterUpdate} />
            </div>
            <EmployersList
                onUpdateSalary={onUpdateSalary}
                data={visibleData}
                onDelete={deleteItem}
                onToggleProp={onToggleProp}
                loading={loading}
            />
            <EmployersAddForm addForm={addItem} />
        </div>
    );
}

export default Main