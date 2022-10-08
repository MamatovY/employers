
import './EmployersListItem.css'

const EmployersListItem = ({ name, salary, onDelete, onToggleProp, increase, rise, onUpdateSalary }) => {



    let classIncrease = 'list-group-item d-flex justify-content-between'
    if (rise) {
        classIncrease += ' like'
    }

    if (increase) {
        classIncrease += ' increase'
    }


    return (
        <li className={classIncrease}>
            <span className="list-group-item-label" data-toggle='rise' onClick={onToggleProp}>
                {name}
            </span>
            <input
                type="text"
                className="list-group-item-input"
                onChange={onUpdateSalary}
                defaultValue={salary} />

            <div className="d-flex justify-content-center align-items-center">
                <button type='button'
                    className='btn-cookie btn-sm'
                    data-toggle='increase'
                    onClick={onToggleProp}>
                    <i className='fas fa-cookie' />
                </button>

                <button className='btn-trash btn-sm' onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>

                <i className="fas fa-star"></i>

            </div>

        </li>
    )
}

export default EmployersListItem