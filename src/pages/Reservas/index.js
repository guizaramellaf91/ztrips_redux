import { MdDelete, MdAddCircle, MdRemoveCircle } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { removeReserve } from '../../store/modules/reserve/actions';
import './style.css';

export default function Reservas() {
    const dispatch = useDispatch();
    const reserves = useSelector(state => state.reserve);

    function handleRemove(id) {
        dispatch(removeReserve(id));
    };

    return (
        <div>
            <h1 className='title'>Você solicitou {reserves.length} reserva(s)</h1>

            {reserves.map(reserve => (
                <div className="reservas" key={reserve.id}>
                    <img
                        src={reserve.image}
                        alt={reserve.title}
                    />
                    <strong>{reserve.title}</strong>
                    <div className="amount">
                        <button type="button" onClick={() => { }}>
                            <MdRemoveCircle size={25} color="#191919" />
                        </button>
                        <input type="text" readOnly value={reserve.amount} />
                        <button type="button" onClick={() => { }}>
                            <MdAddCircle size={25} color="#191919" />
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRemove(reserve.id)}
                    >
                        <MdDelete size={20} color="#191919" />
                    </button>
                </div>
            ))}
            <footer>
                <button type="button">Solicitar Reservas</button>
            </footer>
        </div>
    );
};