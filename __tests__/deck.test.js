// import * as assert from 'assert';
const assert = require("assert").strict;
import { Deck } from '../src/components/deck.js';
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
