// import * as assert from 'assert';
// const assert = require("assert").strict;
import { Deck } from '../src/components/deck.ts';

test('Deck', () => {
    // Prepare
    const expected = '♠';
    // Action
    const deck = new Deck();
    const result = deck.SUITS[0];
    // Compare

    expect(result).toEqual(expected);
});

