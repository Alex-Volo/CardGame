import * as assert from 'assert';
import { Deck } from './deck.ts';
test('Deck', () => {
    
})
{
    // Prepare
    const expected = '♠';
    // Action
    const deck = new Deck();
    const result = deck.SUITS[0];
    // Compare
    assert.equal(result, expected);
}
