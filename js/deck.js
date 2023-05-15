const SUITS = ['♠', '♣', '♥', '♦']
const VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const CARDS = VALUES.reduce((result, value) => {
    for (let suit of SUITS) {
        result.push({
            value: value,
            suit: suit,
        })
    }
    return result
}, [])

export class Deck {
    constructor() {
        this.cards = CARDS
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            //   const oldValue = this.cards[newIndex]
            //   this.cards[newIndex] = this.cards[i]
            //   this.cards[i] = oldValue
            ;[this.cards[i], this.cards[newIndex]] = [
                this.cards[newIndex],
                this.cards[i],
            ]
        }
        return this
    }

    cut(length = 3) {
        this.cards = this.cards.slice(0, length)
        return this
    }

    double() {
        this.cards = [this.cards, ...this.cards].flat()
        return this
    }
}
