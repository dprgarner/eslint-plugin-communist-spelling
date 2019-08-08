const { expect } = require('chai');
const { findBritishSpellings, splitWords } = require('../../../lib/utils');

describe('splitWords', () => {
    it('ignores a single lower-case word', () => {
        expect(splitWords('authorise')).to.deep.equal(['authorise']);

    });

    it('breaks up a camelCase word in two', () => {
        expect(splitWords('favouriteColour')).to.deep.equal(
            ['favourite', 'colour']
        );
    });

    it('tokenises a single capital', () => {
        expect(splitWords('authoriseALicence')).to.deep.equal(
            ['authorise', 'a', 'licence']
        )
    });

    it('tokenises UpperCamelCase', () => {
        expect(splitWords('FavouriteColour')).to.deep.equal(
            ['favourite', 'colour']
        );
    });

    it('strips numbers in camelCase', () => {
        expect(splitWords('favourite123Colour')).to.deep.equal(
            ['favourite', 'colour']
        );
    });

    it('strips trailing numbers in camelCase', () => {
        expect(splitWords('favouriteColour123')).to.deep.equal(
            ['favourite', 'colour']
        );
    });

    it('tokenises snake_case', () => {
        expect(splitWords('favourite_colour')).to.deep.equal(
            ['favourite', 'colour']
        );
    });

    it('tokenises CAPITAL_SNAKE_CASE', () => {
        expect(splitWords('FAVOURITE_COLOUR')).to.deep.equal(
            ['favourite', 'colour']
        );
    });

    it('strips trailing numbers in snake case', () => {
        expect(splitWords('FAVOURITE_COLOUR_122')).to.deep.equal(
            ['favourite', 'colour']
        );
    });
});

describe('findBritishSpellings', () => {
    it('returns no matches for good honest American words', () => {
        expect(findBritishSpellings('ak47Bible')).to.deep.equal([]);
        expect(findBritishSpellings('live_free')).to.deep.equal([]);
        expect(findBritishSpellings('THESE_COLORS_DONT_RUN')).to.deep.equal([]);
    });

    it('returns matches for communist spellings', () => {
        expect(findBritishSpellings('favouriteTea')).to.deep.equal(['favorite']);
        expect(findBritishSpellings('yoghurt_crumpet')).to.deep.equal(['yogurt']);
        expect(findBritishSpellings('BAD_BEHAVIOUR')).to.deep.equal(['behavior']);
    });
});
