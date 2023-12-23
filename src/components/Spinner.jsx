function Spinner({showError}) {
    return (
        <div className={`text-center py-5 text-${showError ? 'danger' : 'light'}`}>
            <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status"></div>
            <p className='text-center fs-4 mt-1'>{showError ? 'Error in generating Quiz, Try Later!' : 'Generating Quiz...'}</p>
        </div>
    )
}
export default Spinner;