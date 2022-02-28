import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess, updateAmountSuccess } from './actions';
import api from '../../../services/api';
import history from '../../../services/history';

// dentro do saga nao pode requisicoes http (api.get) <=
// * = async
// yield = await do (async/await)
// saga = middleware (quando solicitado busca o restante das informacoes)
// side effect e trazer o state *select*
function* addToReserve({ id }) {

    const tripExists = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    const myStock = yield call(api.get, `/stock/${id}`);
    const stockAmount = myStock.data.amount;
    const currentStock = tripExists ? tripExists.amount : 0;
    const amount = currentStock + 1;
    if (amount > stockAmount) {
        alert('quantidade maxima atingida.');
        return;
    }

    if (tripExists) {
        yield put(updateAmountSuccess(id, amount));
    } else {
        const response = yield call(api.get, `trips/${id}`);
        const data = {
            ...response.data,
            amount: 1
        };
        yield put(addReserveSuccess(data));
        history.push('/reservas');
    }
};

function* updateAmount({ id, amount }) {
    if (amount <= 0) return;
    const myStock = yield call(api.get, `/stock/${id}`);
    const stockAmount = myStock.data.amount;
    if(amount > stockAmount){
        alert('quantidade maxima atingida');
        return;
    }
    yield put(updateAmountSuccess(id, amount));
}

// listeners - ficar ouvindo
// takeLatest - qual action?
// takelatest- clicar 2x, ainda nao terminou a primeira, so vai fazer o ultimo click
// takeEvery - tres requisicoes direto!!!
export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount)
]);