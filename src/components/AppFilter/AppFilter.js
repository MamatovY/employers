
import './AppFilter.css'

const AppFilter = ({ onFilterUpdate, filter }) => {

    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'rise', label: 'На повышение' },
        { name: 'salary', label: 'З/П больше 1000$' },
    ]
    const buttons = buttonsData.map(({ name, label }) => {

        const active = filter === name
        const clazz = active ? 'btn-light' : 'btn-outline-light '
        return (
            <button
                key={name}
                className={`btn ${clazz}`}
                onClick={() => onFilterUpdate(name)}
                type='button'>
                {label}
            </button>)
    })

    return (
        <div className="btnGroup">

            {buttons}
        </div>
    )

}

export default AppFilter