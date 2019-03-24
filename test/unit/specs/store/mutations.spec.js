import 'array-flat-polyfill';
import { shallow } from 'vue-test-utils';
import mutations from '@/store/mutations';
import hobbysList100 from '../../hobbysList100.json';

const mockState = {
    hobbysList: hobbysList100,
    hobbysMatchList: Array.from(Array(2), () => Array(0)),
    hobbysResultList: []
}

const items = {
    value: 'B'
}

describe('mutations getHobbysList', () => {
    mutations.getHobbysList(mockState);

    it('state.hobbysList', () => {
        expect(mockState.hobbysList[0]).toEqual({ id: 1, hobbys: 'ABCDNOPRSV' });
    });

    it('state.hobbysMatchList matched', () => {
        expect(mockState.hobbysMatchList[0].matched).toBe('10-32');
    });

    it('state.hobbysMatchList left, right', () => {
        expect(mockState.hobbysMatchList[0].left).toBe('ABEHIMNQVY');
        expect(mockState.hobbysMatchList[0].right).toBe('ADEIMNOQVY');
    });
});

describe('mutations handleChangeHobbysListFilter', () => {
    mutations.handleChangeHobbysListFilter(mockState, items);
    
    it('state.hobbysResultList matched', () => {
        expect(mockState.hobbysResultList[0].matched).toBe('15-18');
    });

    it('state.hobbysResultList left, right', () => {
        expect(mockState.hobbysResultList[0].left).toBe('ABIJKLSWXZ');
        expect(mockState.hobbysResultList[0].right).toBe('ABKLNQSWXZ');
    });
});