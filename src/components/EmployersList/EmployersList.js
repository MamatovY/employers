import './EmployersList.css'
import EmployersListItem from '../EmployersListItem/EmployersListItem.js'

const EmployersList = ({ data, onDelete, onToggleProp, onUpdateSalary }) => {
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
            {elem}
        </ul>
    )

}

export default EmployersList