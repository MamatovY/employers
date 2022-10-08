import './AppInfo.css'

const AppInfo = ({ numEmployees, numIncrease }) => {
    return (
        <div className="appInfo">
            <h1>
                Учет сотрудников в компании №
            </h1>
            <h2>
                Общее число сотрудников: {numEmployees}
            </h2>
            <h2>
                Премию получат: {numIncrease}
            </h2>
        </div>
    )
}

export default AppInfo