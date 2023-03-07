import './EmployersList.css'
import EmployersListItem from '../EmployersListItem/EmployersListItem.js'
import Loader from './../Loader/Loader'


const EmployersList = ({ data, onDelete, onToggleProp, onUpdateSalary, loading }) => {
    const elem = data.map(item => {
        const { id, ...itemProps } = item

        return (
            <EmployersListItem key={id}
                onUpdateSalary={(e) => onUpdateSalary(id, e.target.value)}
                onDelete={() => onDelete(id)} {...itemProps}
                onToggleProp={
                    (e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))
                }
            />
        )
    })
    return (
        <ul className="app-list list-group">
            {loading ? <div><Loader /></div> : elem}
        </ul>
    )

}

export default EmployersList