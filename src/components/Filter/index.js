import { useState } from 'react';
import './style.css';
import FilterIcon from '../../assets/filterIcon.svg'
import Chip from '../Chip';

function Filter() {
    const [open, setOpen] = useState(false);
    return (
        <div className='container-filter'>
            <button className='btn-filter' onClick={() => setOpen(!open)}>
                <img src={FilterIcon} alt='filter' />
                Filtrar</button>

            {open &&
                <div className='filter-body'>
                    <strong>Categoria</strong>
                    <div className='container-categories'>
                        <Chip ckecked={false} title='vendas' />
                        <Chip ckecked title='vendas' />
                    </div>
                    <div className='container-btns-filters'>
                        <button className='btn-white btn-extra-small '>Limpar Filtros</button>
                        <button className='btn-purple btn-extra-small'>Aplicar Filtros</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Filter;