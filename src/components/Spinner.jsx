function Spinner({ error }) {
    return (
        <div className="text-center">
            {
                error
                    ?
                    <p className="fs-3 text-danger">{error}</p>
                    :
                    <div className="spinner spinner-border text-primary" role="status"></div>
            }
        </div>
    )
}
export default Spinner;