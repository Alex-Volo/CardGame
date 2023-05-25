const assert = require('assert').strict;
import { Deck } from './deck.ts';

{
    // Prepare
    const expected = ['♠', '♣', '♥', '♦'];
    // Action
    const deck = new Deck();
    const result = deck.SUITS;
    // Compare
    assert.equal(result, expected);
}
