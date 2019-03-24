import 'array-flat-polyfill';
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
        const mockData = [
            { id: 1, hobbys: 'ABCDNOPRSV' },
            { id: 2, hobbys: 'ABCEHOQRVY' },
            { id: 3, hobbys: 'ABCIKMOTUY' }
        ];

        for (const i of mockData.keys()) {
            expect(mockState.hobbysList[i]).toEqual(mockData[i]);
        }
    });

    it('state.hobbysMatchList matched, left, right', () => {
        const mockData = [
            { matched: '10-32', left: 'ABEHIMNQVY', right: 'ADEIMNOQVY' },
            { matched: '15-18', left: 'ABIJKLSWXZ', right: 'ABKLNQSWXZ' },
            { matched: '37-39', left: 'AEFJKNPTUW', right: 'AEIJKMNTUW' },
            { matched: '75-76', left: 'CFGIKLOPST', right: 'CFGKLNOSTX' }
        ];

        for (const i of mockData.keys()) {
            expect(mockState.hobbysMatchList[i]).toEqual(mockData[i]);
        }
    });
});

describe('mutations handleChangeHobbysListFilter', () => {
    const mockData = { "matched": "15-18", "left": "ABIJKLSWXZ", "right": "ABKLNQSWXZ" };
    mutations.handleChangeHobbysListFilter(mockState, items);

    it('state.hobbysResultList matched, left, right', () => {
        expect(mockState.hobbysResultList[0]).toEqual(mockData);
    });
});