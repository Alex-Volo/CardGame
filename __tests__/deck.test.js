// import * as assert from 'assert';
// const assert = require("assert").strict;
import { Deck } from '../src/components/deck.ts';

describe('Deck', () => {
    describe('cards', () => {
        it('should have 36 cards', () => {
            // Prepare
            const expected = 36;
            // Action
            const deck = new Deck();
            const result = deck.cards.length;
            // Compare
            expect(result).toBe(expected);
        });

        it('should contain 9 cards of each suit', () => {
            // Prepare
            const cardsOfSuit = 9;
            const suits = ['♠', '♣', '♥', '♦'];
            // Action
            const deck = new Deck();
            for (let suit of suits) {
                const result = deck.cards.filter(
                    (card) => card.suit === suit
                ).length;
                // Compare
                expect(result).toBe(cardsOfSuit);
            }
        });
    });

    describe('shuffle', () => {
        it('should not equal itself', () => {
            // Prepare
            const expected = 36;
            // Action
            const deck = new Deck();
            const result = deck.shuffle();
            // Compare
            expect(result).toBe(expected);
        });
    });
});
