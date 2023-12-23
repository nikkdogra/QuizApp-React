function Option({ children, onSelectOption, selectedOption, correct }) {
    const color = selectedOption ? (children === correct ? 'success' : (children === selectedOption ? 'danger' : 'light')) : 'light';
    return (
        <button className={`btn btn-${color} d-flex align-items-center justify-content-between w-100 text-start p-2 my-3 fs-5 ${selectedOption && 'disabled'}`} onClick={() => onSelectOption(children)}>
            {children}
            {<i className={`${color === 'light' ? 'invisible' : 'visible'} text-light fa-solid fa-circle-${color === 'danger' ? 'xmark' : 'check'}`}></i>}
        </button>
    )
}
export default Option;