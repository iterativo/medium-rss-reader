import { History } from '../store'

describe('History', () => {
    it('retrieves the recent entries', () => {
        const history = new History()
        expect(history.recent).toStrictEqual([])
        history.push('foo')
        expect(history.recent).toStrictEqual(['foo'])
        history.push('bar')
        expect(history.recent).toStrictEqual(['bar', 'foo'])
    })

    it('stores the last 5 entries only sorted by most recent', () => {
        const history = new History();
        [1,2,3,4,5,6].map(i => i.toString()).forEach(i => history.push(i))
        expect(history.recent).toStrictEqual([6,5,4,3,2].map(i => i.toString()))
    })

    it('reorders entries per most recent pushed item', () => {
        const history = new History();
        [1,2,3,4,5].map(i => i.toString()).forEach(i => history.push(i))
        history.push('3')
        expect(history.recent).toStrictEqual([3,5,4,2,1].map(i => i.toString()))
    })
})
