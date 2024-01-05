
function Option({value,isCorrect,onSelect,select}){
    const btnClass = isCorrect ? 'success' : (value === select ? 'danger' : 'outline-primary'); 
    return <button onClick={() => onSelect(value)} className={`btn btn-${btnClass} text-start py-2 px-3 fw-bolder my-2 w-100 ${select && 'disabled'}`}>{value}</button>
}
export default Option;