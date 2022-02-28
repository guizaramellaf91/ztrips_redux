import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess } from './actions';
import api from '../../../services/api';

// dentro do saga nao pode requisicoes http (api.get) <=
// * = async
// yield = await do (async/await)
// saga = middleware (quando solicitado busca o restante das informacoes)
function* addToReserve({ id }) {
    const response = yield call(api.get, `trips/${id}`);
    yield put(addReserveSuccess(response.data));
};

// listeners - ficar ouvindo
// takeLatest - qual action?
// takelatest- clicar 2x, ainda nao terminou a primeira, so vai fazer o ultimo click
// takeEvery - tres requisicoes direto!!!
export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve)
]);