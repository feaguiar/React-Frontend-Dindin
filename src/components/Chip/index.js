import './style.css';

function Chip({ title, ckecked }) {
    return (
        <div className={`${ckecked ? 'checked' : 'unchecked'} container-chip`}>
            <span>{title}</span>
            {ckecked ? 'x' : '+'}
        </div>
    )
}

export default Chip;