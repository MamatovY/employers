import { onValue, ref, remove as removeDB, getDatabase, set, push, child, update as updateDB, remove } from "firebase/database"
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
    const db = getDatabase()



    useEffect(() => {
        setLoading(true)
        const peopleRef = ref(db, 'people/')
        onValue(ref(db, 'people?id=2'), res => console.log(res.val()))
        onValue(peopleRef, (snapshot) => {

            const data = snapshot.val()
            console.log(data);
            setData(data)
            setLoading(false)
        })
    }, [])


    const deleteItem = (id) => {
        const newData = data.filter(item => item.id !== id)
        setData(newData)
        console.log(id);
        remove(ref(db, 'people/' + id))
    }

    const addItem = (name, salary) => {
        setData([...data, { id: data.length + 1, name, salary, increase: false, rise: false }])
        set(ref(db, 'people/' + data.length), { id: data.length, name, salary, increase: false, rise: false })
    }

    const onToggleProp = (id, prop) => {
        const newData = data.map(item => {
            if (item.id === id) {
                const peopleSalary = ref(db, `people/${item.id}/${prop}`)
                set(peopleSalary, !item[prop])
                return { ...item, [prop]: !item[prop] }
            }
            return item
        })
    }
    const onUpdateSalary = (id, salary) => {
        const peopleSalary = ref(db, `people/${id}/salary`)
        set(peopleSalary, salary)
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
                <AppFilter filter={filter} onFilterUpdate={onFilterUpdate} setFilter={setFilter} />
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
    )
}

export default Main