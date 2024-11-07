import { rootReducer } from './rootReduser';
import store from './store';
import { it, expect } from '@jest/globals';

it('тест rootReducer', () => {
    const stateCheck = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(stateCheck);
});
