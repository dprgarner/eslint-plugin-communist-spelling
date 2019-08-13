const { expect } = require("chai");
const {
    findBritishSpellings,
    findAmericanSpellings,
    findAmericanAndOxfordSpellings,
    findAmericanAndNotOxfordSpellings,
    splitWords,
} = require("../../lib/utils");

describe("splitWords", () => {
    it("ignores a single lower-case word", () => {
        expect(splitWords("authorise")).to.deep.equal(["authorise"]);
    });

    it("breaks up a camelCase word in two", () => {
        expect(splitWords("favouriteColour")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });

    it("tokenises a single capital", () => {
        expect(splitWords("authoriseALicence")).to.deep.equal([
            "authorise",
            "a",
            "licence",
        ]);
    });

    it("tokenises UpperCamelCase", () => {
        expect(splitWords("FavouriteColour")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });

    it("strips numbers in camelCase", () => {
        expect(splitWords("favourite123Colour")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });

    it("strips trailing numbers in camelCase", () => {
        expect(splitWords("favouriteColour123")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });

    it("tokenises snake_case", () => {
        expect(splitWords("favourite_colour")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });

    it("tokenises CAPITAL_SNAKE_CASE", () => {
        expect(splitWords("FAVOURITE_COLOUR")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });

    it("strips trailing numbers in snake case", () => {
        expect(splitWords("FAVOURITE_COLOUR_122")).to.deep.equal([
            "favourite",
            "colour",
        ]);
    });
});

describe("findBritishSpellings", () => {
    it("returns no matches for good honest American words", () => {
        expect(findBritishSpellings("ak47Bible")).to.deep.equal([]);
        expect(findBritishSpellings("live_free")).to.deep.equal([]);
        expect(findBritishSpellings("THESE_COLORS_DONT_RUN")).to.deep.equal([]);
    });

    it("returns matches for communist spellings", () => {
        expect(findBritishSpellings("favouriteTea")).to.deep.equal([
            ["favourite", "favorite"],
        ]);
        expect(findBritishSpellings("yoghurt_crumpet")).to.deep.equal([
            ["yoghurt", "yogurt"],
        ]);
        expect(findBritishSpellings("BAD_BEHAVIOUR")).to.deep.equal([
            ["behaviour", "behavior"],
        ]);
    });

    it("returns multiple matches for communist spellings", () => {
        expect(findBritishSpellings("favouriteColour")).to.deep.equal([
            ["favourite", "favorite"],
            ["colour", "color"],
        ]);
    });
});

describe("findAmericanSpellings", () => {
    it("returns no matches for communist spellings", () => {
        expect(findAmericanSpellings("colourfulFlavours")).to.deep.equal([]);
    });

    it("returns matches for capitalist spellings", () => {
        expect(findAmericanSpellings("colorfulFlavors")).to.deep.equal([
            ["colorful", "colourful"],
            ["flavors", "flavours"],
        ]);
    });

    it("returns no matches for -ise and -ize endings", () => {
        expect(findAmericanSpellings("dramatiseColonization")).to.deep.equal(
            []
        );
    });
});

describe("findAmericanAndOxfordSpellings", () => {
    it("returns no matches for communist spellings", () => {
        expect(
            findAmericanAndOxfordSpellings("colourfulFlavours")
        ).to.deep.equal([]);
    });

    it("returns matches for capitalist spellings", () => {
        expect(findAmericanAndOxfordSpellings("colorfulFlavors")).to.deep.equal(
            [["colorful", "colourful"], ["flavors", "flavours"]]
        );
    });

    it("returns matches for -ize endings only", () => {
        expect(
            findAmericanAndOxfordSpellings("dramatiseColonization")
        ).to.deep.equal([["colonization", "colonisation"]]);
    });
});

describe("findAmericanAndNotOxfordSpellings", () => {
    it("returns no matches for communist spellings", () => {
        expect(
            findAmericanAndNotOxfordSpellings("colourfulFlavours")
        ).to.deep.equal([]);
    });

    it("returns matches for capitalist spellings", () => {
        expect(
            findAmericanAndNotOxfordSpellings("colorfulFlavors")
        ).to.deep.equal([["colorful", "colourful"], ["flavors", "flavours"]]);
    });

    it("returns matches for -ize endings only", () => {
        expect(
            findAmericanAndNotOxfordSpellings("dramatiseColonization")
        ).to.deep.equal([["dramatise", "dramatize"]]);
    });
});
